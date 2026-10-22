// ==============================|| DEFAULT THEME COLORS ||============================== //

const defaultColor = {
  // paper & background
  paper: '#ffffff',

  // primary
  primaryLight: '#e3f2fd',
  primary200: '#90caf9',
  primaryMain: '#2196f3',
  primaryDark: '#1e88e5',
  primary800: '#1565c0',

  // secondary
  secondaryLight: '#ede7f6',
  secondary200: '#b39ddb',
  secondaryMain: '#673ab7',
  secondaryDark: '#5e35b1',
  secondary800: '#4527a0',

  // success
  successLight: '#b9f6ca',
  success200: '#69f0ae',
  successMain: '#00e676',
  successDark: '#00c853',

  // error
  errorLight: '#ef9a9a',
  errorMain: '#f44336',
  errorDark: '#c62828',

  // orange
  orangeLight: '#fbe9e7',
  orangeMain: '#ffab91',
  orangeDark: '#d84315',

  // warning
  warningLight: '#fff8e1',
  warningMain: '#ffe57f',
  warningDark: '#ffc107',

  // lilac (contrato suspendido)
  lilacLight: '#ede7f6',
  lilacMain: '#ede7f6',
  lilacDark: '#d1c4e9',
  lilacText: '#4527a0',
  lilacBorder: '#b39ddb',

  // cian (gráficos): tercer color de las series junto a primary800 y orangeDark.
  // El morado (secondaryDark) no se distingue del azul (ΔE 12,7; 5,1 con deuteranopía).
  cyanMain: '#0097a7',

  // grey
  grey50: '#f8fafc',
  grey100: '#eef2f6',
  grey200: '#e3e8ef',
  grey300: '#cdd5df',
  grey500: '#697586',
  grey600: '#4b5565',
  grey700: '#364152',
  grey900: '#121926',

  // ==============================|| DARK THEME VARIANTS ||============================== //

  // paper & background
  darkPaper: '#111936',
  darkBackground: '#1a223f',

  // dark 800 & 900
  darkLevel1: '#29314f',
  darkLevel2: '#212946',

  // text variants
  darkTextTitle: '#d7dcec',
  darkTextPrimary: '#bdc8f0',
  darkTextSecondary: '#8492c4',

  // primary dark
  darkPrimaryLight: '#e3f2fd',
  darkPrimaryMain: '#2196f3',
  darkPrimaryDark: '#1e88e5',
  darkPrimary200: '#90caf9',
  darkPrimary800: '#1565c0',

  // secondary dark
  darkSecondaryLight: '#d1c4e9',
  darkSecondaryMain: '#7c4dff',
  darkSecondaryDark: '#651fff',
  darkSecondary200: '#b39ddb',
  darkSecondary800: '#6200ea',

  // ==============================|| MODO OSCURO DEL PROYECTO (DEC-073) ||============================== //
  // Mismas claves que el claro, invertidas: `.light` es el fondo teñido, `.dark` el
  // acento claro que va encima, y la escala de grises va de superficie a texto.

  darkGrey50: '#1d2645',
  darkGrey100: '#1a223f',
  darkGrey200: '#323b5e',
  darkGrey300: '#454f75',
  darkGrey400: '#5f698f',
  darkGrey500: '#8492c4',
  darkGrey600: '#a3aed6',
  darkGrey700: '#bdc8f0',
  darkGrey800: '#cdd5f3',
  darkGrey900: '#e3e8f8',

  darkPrimaryTint: '#1b2b50',
  darkPrimaryTint200: '#26406b',
  darkPrimaryAccent: '#64b5f6',
  darkPrimaryChart: '#90caf9',

  darkSecondaryTint: '#2a2452',
  darkSecondaryTint200: '#3d3470',
  darkSecondaryAccent: '#b39ddb',

  darkSuccessTint: '#173a2b',
  darkSuccess200: '#2e6b4b',
  darkSuccessAccent: '#69f0ae',

  darkErrorTint: '#45202b',
  darkErrorMain: '#f44336',
  darkErrorAccent: '#ef9a9a',

  darkOrangeTint: '#3f2a26',
  darkOrangeAccent: '#ff8a65',

  darkWarningTint: '#3b3320',
  darkWarningAccent: '#ffc107',
  darkWarningText: '#121926',

  darkLilacTint: '#2a2452',
  darkLilacHover: '#3d3470',
  darkLilacBorder: '#5e4f9a',
  darkLilacText: '#d1c4e9',

  darkCyanMain: '#4dd0e1'
};

export default defaultColor;
