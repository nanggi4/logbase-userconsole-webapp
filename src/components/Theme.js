/* global  */
import { createTheme } from '@material-ui/core/styles';
const defaultTheme = createTheme();
export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1600,
      xl: 1920,
    }
  },
  palette: {
    primary: {
      light: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_LIGHT,
      main: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_MAIN,
      dark: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_DARK,
      contrastText: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_CONTRASTTEXT,
    },
    secondary: {
      light: process.env.CONST_MATERIALUI_THEME_PALETTE_SECONDARY_LIGHT,
      main: process.env.CONST_MATERIALUI_THEME_PALETTE_SECONDARY_MAIN,
      dark: process.env.CONST_MATERIALUI_THEME_PALETTE_SECONDARY_DARK,
      contrastText: process.env.CONST_MATERIALUI_THEME_PALETTE_SECONDARY_CONTRASTTEXT,
    },
    background: {
      default: process.env.CONST_MATERIALUI_THEME_PALETTE_BACKGROUND_DEFAULT,
    }
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple SD Gothic Neo"',
      '"Helvetica"',
      'Arial',
      '"Noto Sans KR"',
      'sans-serif',
    ].join(','),
  },
  shadows: ['none'],
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      }
    },
    MuiInput: {
      formControl: {
        'label + &': {
          marginTop: defaultTheme.spacing(1)
        }
      }
    },
    MuiInputBase: {
      root: {
        marginRight: defaultTheme.spacing(1)
      }
    },
    MuiTableCell: {
      root: {
        fontSize: '1rem',
      } 
    },
    MuiChip: {
      root: {
        [defaultTheme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
        },
      },
      label: {
        [defaultTheme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
        },
      }
    },
  },
});
