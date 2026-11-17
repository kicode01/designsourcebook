import type { SVGProps } from 'react';

const paths: Record<string, string[]> = {
  share: ['M18 5a3 3 0 1 0 0 .01', 'M6 12a3 3 0 1 0 0 .01', 'M18 19a3 3 0 1 0 0 .01', 'M8.6 13.5l6.8 4', 'M15.4 6.5l-6.8 4'],
  mail: ['M2 6h20v12H2z', 'm2 7 10 6 10-6'],
  crown: ['M3 6l4 4 5-7 5 7 4-4-2 12H5L3 6Z', 'M5 21h14'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  sun: ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
  moon: ['M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z'],
  upload: ['M12 16V4', 'm7 9 5-5 5 5', 'M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3'],
  undo: ['M4 10h9a5 5 0 0 1 0 10H8', 'm8 6-4 4 4 4'],
  redo: ['M20 10h-9a5 5 0 0 0 0 10h5', 'm16 6 4 4-4 4'],
  flip: ['M12 3v18', 'M8 7 4 12l4 5', 'M16 7l4 5-4 5'],
  panel: ['M4 4h16v16H4z', 'M14 4v16'],
  zoomIn: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm21 21-4.3-4.3', 'M11 8v6', 'M8 11h6'],
  zoomOut: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm21 21-4.3-4.3', 'M8 11h6'],
  chevronDown: ['m6 9 6 6 6-6'],
  chevronRight: ['m9 18 6-6-6-6'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm21 21-4.3-4.3'],
  star: ['m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z'],
  image: ['M4 4h16v16H4z', 'm4 16 4-4 4 4 3-3 5 5', 'M9 9a1.2 1.2 0 1 0 0-.01'],
  sparkle: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z'],
  download: ['M12 4v12', 'm7 11 5 5 5-5', 'M4 20h16'],
  video: ['M3 6h12v12H3z', 'm15 10 6-3v10l-6-3'],
  reset: ['M4 4v6h6', 'M20 12a8 8 0 1 1-2.3-5.7L20 8'],
  check: ['m4 12 5 5L20 6'],
  globe: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M3 12h18', 'M12 3a15 15 0 0 1 0 18', 'M12 3a15 15 0 0 0 0 18'],
  layers: ['m12 3 9 5-9 5-9-5 9-5Z', 'm3 13 9 5 9-5', 'm3 17 9 5 9-5'],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'],
  sliders: ['M4 6h16', 'M4 12h16', 'M4 18h16', 'M9 4v4', 'M15 10v4', 'M7 16v4'],
  cursor: ['m4 3 7 17 2.4-6.6L20 11 4 3Z'],
  brush: ['M14 4l6 6-9 9H5v-6l9-9Z'],
  eraser: ['M20 20h-8L3 11l7-7 9 9-6 6', 'M9 6l7 7'],
  duplicate: ['M9 9h11v11H9z', 'M15 5H4v11'],
  eye: ['M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  play: ['M8 5v14l11-7L8 5Z'],
  pause: ['M8 5h3v14H8z', 'M13 5h3v14h-3z'],
  grip: ['M9 6h.01', 'M9 12h.01', 'M9 18h.01', 'M15 6h.01', 'M15 12h.01', 'M15 18h.01'],
  palette: ['M12 21a9 9 0 1 1 0-18c5 0 9 3.5 9 8a4 4 0 0 1-4 4h-2a2 2 0 0 0-1 3.7A2 2 0 0 1 12 21Z', 'M7.5 10.5h.01', 'M10 7h.01', 'M14 7h.01'],
  type: ['M4 6h16', 'M12 6v13', 'M9 19h6'],
  grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
  trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13', 'M10 11v6', 'M14 11v6'],
  copy: ['M8 8h12v12H8z', 'M16 8V4H4v12h4'],
  code: ['m8 8-5 4 5 4', 'm16 8 5 4-5 4', 'm14 4-4 16'],
  arrowUpRight: ['M7 17 17 7', 'M8 7h9v9'],
  symmetry: ['M12 3v18', 'M4 8l5 4-5 4V8Z', 'M20 8l-5 4 5 4V8Z'],
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
