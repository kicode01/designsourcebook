import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import 'allo-font';
import App from './App';
import './styles/tokens.css';
import './styles/studio.css';
import './styles/pages.css';
import './styles/ds-studio.css';

const root = createRoot(document.getElementById('root')!);
flushSync(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
