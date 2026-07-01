import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { tokens } from "../../theme/theme";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 3,
        border: `1px dashed ${tokens.hairlineLight}`,
        borderRadius: 3,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 40, color: tokens.steel }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: tokens.steel, mt: 1, maxWidth: 420, mx: "auto" }}>
        {description}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
