import { grey } from '@material-ui/core/colors';
import { createGlobalStyle } from 'styled-components';
const SifonnFont = require('../app/fonts/SIFONN_PRO.otf');

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: Sifonn;
    src: url(${SifonnFont});
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: ${grey[30]}
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
