import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme/theme";

interface ScoreBarProps {
  label: string;
  value: number; // 0-100
}

export default function ScoreBar({ label, value }: ScoreBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const color = clamped >= 80 ? tokens.signal : clamped >= 50 ? tokens.amber : tokens.coral;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" sx={{ color: tokens.steel, fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: '"JetBrains Mono", monospace', color: tokens.ink, fontWeight: 600 }}
        >
          {Math.round(clamped)}
        </Typography>
      </Box>
      <Box sx={{ height: 6, borderRadius: 3, bgcolor: tokens.hairlineLight, overflow: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            width: `${clamped}%`,
            bgcolor: color,
            borderRadius: 3,
            transition: "width 0.4s ease",
          }}
        />
      </Box>
    </Box>
  );
}
