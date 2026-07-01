import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { tokens } from "../../theme/theme";

export const AVAILABLE_FEATURES = [
  "ADAS",
  "Sunroof",
  "Panoramic Sunroof",
  "360 Camera",
  "Ventilated Seats",
  "Wireless Charger",
  "Android Auto",
  "Apple CarPlay",
  "Cruise Control",
  "Connected Car Tech",
  "Leather Seats",
  "Air Purifier",
];

interface FeatureChipsProps {
  selected: string[];
  onChange: (features: string[]) => void;
}

export default function FeatureChips({ selected, onChange }: FeatureChipsProps) {
  const toggle = (feature: string) => {
    if (selected.includes(feature)) {
      onChange(selected.filter((f) => f !== feature));
    } else {
      onChange([...selected, feature]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {AVAILABLE_FEATURES.map((feature) => {
        const isSelected = selected.includes(feature);
        return (
          <Chip
            key={feature}
            label={feature}
            onClick={() => toggle(feature)}
            variant={isSelected ? "filled" : "outlined"}
            sx={{
              borderColor: tokens.hairlineLight,
              bgcolor: isSelected ? tokens.primary : "transparent",
              color: isSelected ? "#fff" : tokens.ink,
              "&:hover": {
                bgcolor: isSelected ? tokens.primaryLight : "rgba(34,51,95,0.06)",
              },
            }}
          />
        );
      })}
    </Box>
  );
}
