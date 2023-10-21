import { ptBR as MaterialLocale } from "@mui/material/locale"
import { createTheme } from "@mui/material/styles"
import { ptBR as DataGridLocale } from "@mui/x-data-grid"

// Defina suas cores personalizadas
const myRed = "#A12E2F";
const myWhite = "#FFFFFF";
const myBlack = "#000000";
const myGreen = "#0A6066";
const myFormRed = "#A12E2F";
const myLightGreen = "#007F82";
const myInputGreen = "#0A6066";
const myButtonGreen = "#007F82";
const myAquaGreen = "rgba(15, 142, 147, 1.0)";
const myLightGray = "rgba(210, 210, 210, 1.0)";
const myShinyGray = "rgba(255, 255, 255, 0.62)";

export const theme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: myFormRed, // Cor principal
      },
      secondary: {
        main: myGreen, // Cor secundária
      },
      error: {
        main: myFormRed, // Cor de erro
      },
      background: {
        default: myLightGreen, // Cor de fundo padrão
        paper: myGreen, // Cor de fundo do papel
      },
      text: {
        primary: myWhite, // Cor do texto principal
        secondary: myShinyGray, // Cor do texto secundário
      },
      
      // Adicione mais cores conforme necessário
    },
  },
  DataGridLocale,
  MaterialLocale
)
