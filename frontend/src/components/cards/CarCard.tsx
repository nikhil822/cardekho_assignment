import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNavigate } from "react-router-dom";
import ScoreGauge from "./ScoreGauge";
import ScoreBar from "./ScoreBar";
import { tokens } from "../../theme/theme";
import { formatMileage, formatPriceRange } from "../../utils/format";
import type { CarSummary } from "../../types/car";

interface CarCardProps {
  car: CarSummary;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
}

export default function CarCard({ car, isSelectedForCompare, onToggleCompare }: CarCardProps) {
  const navigate = useNavigate();
  const breakdown = car.score_breakdown ?? {};
{console.log("car>>>>", car)}
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: tokens.hairlineLight,
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(18,21,27,0.10)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            
            <Typography variant="overline" sx={{ color: tokens.steel }}>
              {car?.cars[0].make}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.25, lineHeight: 1.15 }}>
              {car?.cars[0].model}
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.steel, mt: 0.25 }}>
              {car?.cars[0].variant}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                color: tokens.primary,
              }}
            >
              {formatPriceRange(car?.cars[0].min_price, car?.cars[0].max_price)}
            </Typography>
          </Box>
          <ScoreGauge score={car?.score} />
        </Stack>

        {car?.cars[0].highlights && car?.cars[0].highlights.length > 0 && (
          <Stack spacing={0.75} sx={{ mt: 2 }}>
            {car?.cars[0].highlights.slice(0, 3).map((highlight) => (
              <Stack key={highlight} direction="row" spacing={0.75} sx={{ alignItems: "flex-start" }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: tokens.signal, mt: "2px" }} />
                <Typography variant="body2" sx={{ color: tokens.ink }}>
                  {highlight}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}

        <Box
          sx={{
            mt: 2.5,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
          }}
        >
          {breakdown.budget !== undefined && <ScoreBar label="Budget match" value={breakdown.budget} />}
          {breakdown.safety !== undefined && <ScoreBar label="Safety" value={breakdown.safety} />}
          {breakdown.mileage !== undefined && <ScoreBar label="Mileage" value={breakdown.mileage} />}
          {breakdown.features !== undefined && <ScoreBar label="Features" value={breakdown.features} />}
        </Box>

        <Stack direction="row" spacing={0.75} sx={{ mt: 2, flexWrap: "wrap", rowGap: 0.75 }}>
          <Chip size="small" label={car?.cars[0].fuel} />
          <Chip size="small" label={`${car?.cars[0].seats} seats`} />
          <Chip size="small" label={formatMileage(car?.cars[0].mileage)} />
          <Chip size="small" label={`${car?.cars[0].safety_rating}★ safety`} />
        </Stack>

        <Stack direction="row" spacing={1.25} sx={{ mt: 2.5 }}>
          <Button variant="contained" fullWidth onClick={() => navigate(`/cars/${car?.cars[0].id}`)}>
            View details
          </Button>
          <Button
            variant={isSelectedForCompare ? "contained" : "outlined"}
            color={isSelectedForCompare ? "secondary" : "primary"}
            startIcon={<CompareArrowsIcon />}
            onClick={() => onToggleCompare(car?.cars[0].id)}
            sx={{ whiteSpace: "nowrap" }}
          >
            {isSelectedForCompare ? "Added" : "Compare"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
