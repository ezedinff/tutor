import { orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const customTeme = createMuiTheme({
  palette: {
    primary: {
      light: orange[400],
      main: orange[600],
      dark: orange[800],
      contrastText: '#ffffff',
    },

    background: {
      // default: grey[300],
    },
  },
  typography: {
    fontFamily: 'Kumbh Sans',
    h1: {
      fontFamily: 'Comfortaa',
    },

    h2: {
      fontFamily: 'Comfortaa',
    },

    h3: {
      fontFamily: 'Comfortaa',
    },
    button: {
      fontWeight: 'bold',
    },
  },
});

export default customTeme;
