// project imports
import { extendPaletteWithChannels } from 'utils/colorUtils';

// assets
import defaultColor from './theme/default';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export function buildPalette(presetColor) {
  let colors;
  switch (presetColor) {
    case 'default':
    default:
      colors = defaultColor;
  }

  const lightColors = {
    primary: {
      light: colors.primaryLight,
      main: colors.primaryMain,
      dark: colors.primaryDark,
      200: colors.primary200,
      800: colors.primary800
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondaryMain,
      dark: colors.secondaryDark,
      200: colors.secondary200,
      800: colors.secondary800
    },
    error: {
      light: colors.errorLight,
      main: colors.errorMain,
      dark: colors.errorDark
    },
    orange: {
      light: colors.orangeLight,
      main: colors.orangeMain,
      dark: colors.orangeDark
    },
    warning: {
      light: colors.warningLight,
      main: colors.warningMain,
      dark: colors.warningDark,
      contrastText: colors.grey700
    },
    // Lila pastel (contrato suspendido): fondo claro y texto morado oscuro.
    lilac: {
      light: colors.lilacLight,
      main: colors.lilacMain,
      dark: colors.lilacDark,
      200: colors.lilacBorder,
      contrastText: colors.lilacText
    },
    // Cian: solo para series de gráficos (DESIGN_SYSTEM, "Gráficos").
    cyan: {
      main: colors.cyanMain
    },
    success: {
      light: colors.successLight,
      200: colors.success200,
      main: colors.successMain,
      dark: colors.successDark
    },
    grey: {
      50: colors.grey50,
      100: colors.grey100,
      500: colors.grey500,
      600: colors.grey600,
      700: colors.grey700,
      900: colors.grey900
    },
    dark: {
      light: colors.darkTextPrimary,
      main: colors.darkLevel1,
      dark: colors.darkLevel2,
      800: colors.darkBackground,
      900: colors.darkPaper
    },
    text: {
      primary: colors.grey700,
      secondary: colors.grey500,
      dark: colors.grey900,
      hint: colors.grey100,
      heading: colors.grey900
    },
    divider: colors.grey200,
    background: {
      paper: colors.paper,
      default: colors.paper
    }
  };

  // Modo oscuro (DEC-073): las mismas claves con el sentido invertido, para que
  // los componentes que usan la paleta cambien sin tocarlos. `.light` es un
  // fondo teñido y `.dark`, el acento claro que va sobre él.
  const darkColors = {
    primary: {
      light: colors.darkPrimaryTint,
      main: colors.darkPrimaryMain,
      dark: colors.darkPrimaryAccent,
      200: colors.darkPrimaryTint200,
      800: colors.darkPrimaryChart
    },
    secondary: {
      light: colors.darkSecondaryTint,
      main: colors.darkSecondaryMain,
      dark: colors.darkSecondaryAccent,
      200: colors.darkSecondaryTint200,
      800: colors.darkSecondaryLight
    },
    error: {
      light: colors.darkErrorTint,
      main: colors.darkErrorMain,
      dark: colors.darkErrorAccent
    },
    orange: {
      light: colors.darkOrangeTint,
      main: colors.orangeMain,
      dark: colors.darkOrangeAccent
    },
    warning: {
      light: colors.darkWarningTint,
      main: colors.warningMain,
      dark: colors.darkWarningAccent,
      contrastText: colors.darkWarningText
    },
    lilac: {
      light: colors.darkLilacTint,
      main: colors.darkLilacTint,
      dark: colors.darkLilacHover,
      200: colors.darkLilacBorder,
      contrastText: colors.darkLilacText
    },
    cyan: {
      main: colors.darkCyanMain
    },
    success: {
      light: colors.darkSuccessTint,
      200: colors.darkSuccess200,
      main: colors.successMain,
      dark: colors.darkSuccessAccent
    },
    grey: {
      50: colors.darkGrey50,
      100: colors.darkGrey100,
      200: colors.darkGrey200,
      300: colors.darkGrey300,
      400: colors.darkGrey400,
      500: colors.darkGrey500,
      600: colors.darkGrey600,
      700: colors.darkGrey700,
      800: colors.darkGrey800,
      900: colors.darkGrey900
    },
    dark: {
      light: colors.darkTextPrimary,
      main: colors.darkLevel1,
      dark: colors.darkLevel2,
      800: colors.darkBackground,
      900: colors.darkPaper
    },
    text: {
      primary: colors.darkTextPrimary,
      secondary: colors.darkTextSecondary,
      dark: colors.darkTextTitle,
      hint: colors.darkLevel1,
      heading: colors.darkTextTitle
    },
    divider: colors.darkGrey200,
    background: {
      paper: colors.darkLevel2,
      default: colors.darkLevel2
    }
  };

  const commonColor = { common: { black: colors.darkPaper, white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(lightColors);
  const extendedDark = extendPaletteWithChannels(darkColors);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight
    },
    dark: {
      mode: 'dark',
      ...extendedCommon,
      ...extendedDark
    }
  };
}
