import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@totejs/uikit';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ColorModeScript {...theme.config} />
    <App />
  </HashRouter>,
);
