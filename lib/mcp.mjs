// MCP server over stdio (newline-delimited JSON-RPC 2.0).
//
// One connection gives any MCP host the whole catalog: intent search, full
// DESIGN.md retrieval, framework-ready output, and validation. Nothing to
// copy into the repo, so nothing drifts.

import { listSystems, loadSystem, readDesign, search } from "./registry.mjs";
import { lint } from "./lint.mjs";
import { EMITTERS } from "./emit.mjs";

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_INFO = { name: "design-sourcebook", version: "0.1.0" };

const TOOLS = [
  {
    name: "list_design_systems",
    description:
      "List every design system in the registry with its style, tags, and verification status. Use this to show the user what is available before they pick.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "search_design_systems",
    description:
      "Find design systems by intent rather than brand name. Query with adjectives like 'dark data-dense dashboard', 'warm editorial serif', 'playful fintech'. Returns ranked matches with install commands.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language description of the look you want." },
        limit: { type: "number", description: "Max results, default 8." },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "get_design_system",
    description:
      "Get the full DESIGN.md for a system: YAML design tokens plus prose covering color roles, type scale, layout, elevation, components, and do/don't rules. Read this before generating UI in that style.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "System slug, e.g. 'linear-app'." } },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "apply_design_system",
    description:
      "Return ready-to-write files for a system: DESIGN.md, DTCG tokens, and a framework theme. Write DESIGN.md to the project root so the styling persists across sessions.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "System slug." },
        framework: {
          type: "string",
          enum: ["tailwind-v4", "css-vars", "dtcg"],
          description: "Output format, default tailwind-v4.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "lint_design_system",
    description:
      "Validate a DESIGN.md — either a registry entry by name, or raw markdown you are about to write. Checks structure, token references, WCAG contrast on component pairs, and orphaned tokens.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Registry entry to validate." },
        markdown: { type: "string", description: "Raw DESIGN.md content to validate instead." },
      },
      additionalProperties: false,
    },
  },
];

function text(value) {
  return { content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] };
}

function toolError(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}

function resolveSystem(name) {
  if (!name) return null;
  const n = String(name).toLowerCase();
  const systems = listSystems();
  return (
    systems.find((s) => s.slug === n) ||
    systems.find((s) => (s.displayName || "").toLowerCase() === n) ||
    systems.find((s) => s.slug.includes(n)) ||
    null
  );
}

function handleToolCall(name, args = {}) {
  switch (name) {
    case "list_design_systems": {
      const rows = listSystems().map((s) => ({
        slug: s.slug,
        name: s.displayName,
        style: s.style,
        tags: s.tags,
        verified: Boolean(s.checks?.verified),
        warnings: s.checks?.warnings ?? 0,
      }));
      return text({ count: rows.length, systems: rows });
    }

    case "search_design_systems": {
      if (!args.query) return toolError("`query` is required.");
      const results = search(args.query, { limit: args.limit || 8 });
      return text(
        results.map((r) => ({
          slug: r.slug,
          name: r.displayName,
          style: r.style,
          tags: r.tags,
          install: `npx sourcebook add ${r.slug}`,
          verified: Boolean(r.checks?.verified),
          warnings: r.checks?.warnings ?? 0,
        }))
      );
    }

    case "get_design_system": {
      const s = resolveSystem(args.name);
      if (!s) return toolError(`No system named "${args.name}". Use search_design_systems first.`);
      return text(readDesign(s.slug));
    }

    case "apply_design_system": {
      const s = resolveSystem(args.name);
      if (!s) return toolError(`No system named "${args.name}". Use search_design_systems first.`);
      const framework = args.framework || "tailwind-v4";
      const emitter = EMITTERS[framework];
      if (!emitter) return toolError(`Unknown framework "${framework}". Options: ${Object.keys(EMITTERS).join(", ")}`);

      const md = readDesign(s.slug);
      return text(
        [
          `# ${s.displayName} — files to write`,
          "",
          "Write DESIGN.md to the project root, then the theme file next to your stylesheet.",
          "",
          "## DESIGN.md",
          "```markdown",
          md.trim(),
          "```",
          "",
          `## design-theme.${emitter.ext}`,
          "```" + (emitter.ext === "json" ? "json" : "css"),
          emitter.run(md).trim(),
          "```",
        ].join("\n")
      );
    }

    case "lint_design_system": {
      let markdown = args.markdown;
      let label = "inline";
      if (!markdown) {
        const s = resolveSystem(args.name);
        if (!s) return toolError(`No system named "${args.name}", and no markdown supplied.`);
        markdown = readDesign(s.slug);
        label = s.slug;
      }
      const report = lint(markdown, { name: label });
      return text({
        name: label,
        ok: report.ok,
        verified: report.verified,
        counts: report.counts,
        findings: report.findings,
      });
    }

    default:
      return toolError(`Unknown tool "${name}".`);
  }
}

export function startMcpServer({ stdin = process.stdin, stdout = process.stdout } = {}) {
  let buffer = "";

  const send = (msg) => stdout.write(JSON.stringify(msg) + "\n");

  const reply = (id, result) => send({ jsonrpc: "2.0", id, result });
  const replyError = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

  const handle = (msg) => {
    const { id, method, params } = msg;
    const isNotification = id === undefined || id === null;

    switch (method) {
      case "initialize":
        return reply(id, {
          protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
          capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
          serverInfo: SERVER_INFO,
        });

      case "notifications/initialized":
      case "notifications/cancelled":
        return;

      case "ping":
        return reply(id, {});

      case "tools/list":
        return reply(id, { tools: TOOLS });

      case "tools/call": {
        const name = params?.name;
        const args = params?.arguments || {};
        try {
          return reply(id, handleToolCall(name, args));
        } catch (err) {
          process.stderr.write(`sourcebook mcp: tool error ${err?.stack || err}\n`);
          return reply(id, toolError(`Tool "${name}" failed: ${err?.message || err}`));
        }
      }

      case "resources/list": {
        const resources = listSystems().map((s) => ({
          uri: `sourcebook://systems/${s.slug}`,
          name: s.displayName,
          description: s.style,
          mimeType: "text/markdown",
        }));
        return reply(id, { resources });
      }

      case "resources/read": {
        const uri = params?.uri || "";
        const slug = uri.replace(/^sourcebook:\/\/systems\//, "");
        const md = readDesign(slug);
        if (!md) return replyError(id, -32002, `Resource not found: ${uri}`);
        return reply(id, { contents: [{ uri, mimeType: "text/markdown", text: md }] });
      }

      case "prompts/list":
        return reply(id, { prompts: [] });

      default:
        if (!isNotification) replyError(id, -32601, `Method not found: ${method}`);
    }
  };

  stdin.setEncoding("utf8");
  stdin.on("data", (chunk) => {
    buffer += chunk;
    let idx;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
        continue;
      }
      try {
        handle(msg);
      } catch (err) {
        process.stderr.write(`sourcebook mcp: handler error ${err?.stack || err}\n`);
        if (msg?.id !== undefined && msg?.id !== null) replyError(msg.id, -32603, "Internal error");
      }
    }
  });

  stdin.on("end", () => process.exit(0));
  process.stderr.write(`sourcebook mcp: ready (${listSystems().length} systems)\n`);
}
