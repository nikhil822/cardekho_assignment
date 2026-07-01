import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { tokens } from "../../theme/theme";
import { formatLakhs } from "../../utils/format";

interface BudgetRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function BudgetRangeSlider({ min, max, step, value, onChange }: BudgetRangeSliderProps) {
  const [budgetMin, budgetMax] = value;

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) onChange([newValue[0], newValue[1]]);
  };

  const handleMinInput = (raw: string) => {
    const parsed = Number(raw.replace(/[^0-9]/g, ""));
    if (Number.isNaN(parsed)) return;
    onChange([Math.min(parsed, budgetMax), budgetMax]);
  };

  const handleMaxInput = (raw: string) => {
    const parsed = Number(raw.replace(/[^0-9]/g, ""));
    if (Number.isNaN(parsed)) return;
    onChange([budgetMin, Math.max(parsed, budgetMin)]);
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: tokens.steel }}>
          Budget range
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, color: tokens.primary }}
        >
          {formatLakhs(budgetMin)} – {formatLakhs(budgetMax)}
        </Typography>
      </Stack>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        disableSwap
        color="secondary"
        valueLabelDisplay="off"
      />
      <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
        <TextField
          label="Budget min (₹)"
          size="small"
          fullWidth
          value={budgetMin}
          onChange={(e) => handleMinInput(e.target.value)}
          slotProps={{ htmlInput: { inputMode: "numeric" } }}
        />
        <TextField
          label="Budget max (₹)"
          size="small"
          fullWidth
          value={budgetMax}
          onChange={(e) => handleMaxInput(e.target.value)}
          slotProps={{ htmlInput: { inputMode: "numeric" } }}
        />
      </Stack>
    </Box>
  );
}
