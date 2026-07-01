import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import Header from "./Header";
import { tokens } from "../../theme/theme";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: tokens.paper, display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
