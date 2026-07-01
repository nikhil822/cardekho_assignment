import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme/theme";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: tokens.ink,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <Toolbar sx={{ minHeight: 64, gap: 1.5 }}>
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1.25, cursor: "pointer" }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: `2px solid ${tokens.amber}`,
              display: "grid",
              placeItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 2,
                height: 12,
                bgcolor: tokens.amber,
                borderRadius: 1,
                transform: "rotate(35deg) translateY(-3px)",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1 }}
          >
            ShortlistIQ
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="overline"
          sx={{ color: tokens.steel, display: { xs: "none", sm: "block" } }}
        >
          Car matching, tuned to you
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
