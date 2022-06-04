import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import SnackbarContextProvider from "./shared/contexts/SnackbarContext";
import { indigo, red } from "@mui/material/colors";
import Layout from "./layouts/Layout";
import LoadingContextProvider from "./shared/contexts/LoadingContext";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: red,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <LoadingContextProvider>
          <Layout />
        </LoadingContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
