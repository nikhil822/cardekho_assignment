import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import AppLayout from "./components/layout/AppLayout";
import { ToastProvider } from "./context/ToastContext";
import { AppDataProvider } from "./context/AppDataContext";
import RecommendationFormPage from "./pages/RecommendationForm/RecommendationFormPage";
import RecommendationResultsPage from "./pages/RecommendationResults/RecommendationResultsPage";
import CarDetailsPage from "./pages/CarDetails/CarDetailsPage";
import CompareCarsPage from "./pages/CompareCars/CompareCarsPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <AppDataProvider>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<RecommendationFormPage />} />
                <Route path="/results" element={<RecommendationResultsPage />} />
                <Route path="/cars/:id" element={<CarDetailsPage />} />
                <Route path="/compare" element={<CompareCarsPage />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </AppDataProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
