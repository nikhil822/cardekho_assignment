import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme/theme";
import type { PriorityKey } from "../../types/car";

const PRIORITY_OPTIONS: { key: PriorityKey; label: string }[] = [
  { key: "price", label: "Lowest price" },
  { key: "safety", label: "Safety" },
  { key: "mileage", label: "Mileage" },
  { key: "features", label: "Features" },
  { key: "space", label: "Spacious cabin" },
];

const MAX_PRIORITIES = 2;

interface PrioritySelectorProps {
  selected: PriorityKey[];
  onChange: (priorities: PriorityKey[]) => void;
}

export default function PrioritySelector({ selected, onChange }: PrioritySelectorProps) {
  const limitReached = selected.length >= MAX_PRIORITIES;

  const toggle = (key: PriorityKey) => {
    if (selected.includes(key)) {
      onChange(selected.filter((p) => p !== key));
    } else if (!limitReached) {
      onChange([...selected, key]);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: 0.5 }}>
        {PRIORITY_OPTIONS.map((option) => {
          const checked = selected.includes(option.key);
          const disabled = !checked && limitReached;
          return (
            <FormControlLabel
              key={option.key}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => toggle(option.key)}
                  disabled={disabled}
                  sx={{
                    color: tokens.steel,
                    "&.Mui-checked": { color: tokens.primary },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: disabled ? tokens.steel : tokens.ink }}>
                  {option.label}
                </Typography>
              }
            />
          );
        })}
      </Box>
      <Typography variant="caption" sx={{ color: tokens.steel }}>
        Choose up to {MAX_PRIORITIES} — {selected.length}/{MAX_PRIORITIES} selected
      </Typography>
    </Box>
  );
}
