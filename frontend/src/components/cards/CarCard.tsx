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
import type { RecommendationResult } from "../../types/car";

interface CarCardProps {
  result: RecommendationResult;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
}

export default function CarCard({ result, isSelectedForCompare, onToggleCompare }: CarCardProps) {
  const navigate = useNavigate();
  const car = result.cars[0];
  const breakdown = result.score_breakdown ?? {};

  if (!car) return null;

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
              {car.make}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.25, lineHeight: 1.15 }}>
              {car.model}
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.steel, mt: 0.25 }}>
              {car.variant}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                color: tokens.primary,
              }}
            >
              {formatPriceRange(car.min_price, car.max_price)}
            </Typography>
          </Box>
          <ScoreGauge score={result.score} />
        </Stack>

        {car.highlights && car.highlights.length > 0 && (
          <Stack spacing={0.75} sx={{ mt: 2 }}>
            {car.highlights.slice(0, 3).map((highlight) => (
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
          <Chip size="small" label={car.fuel} />
          <Chip size="small" label={`${car.seats} seats`} />
          <Chip size="small" label={formatMileage(car.mileage)} />
          <Chip size="small" label={`${car.safety_rating}★ safety`} />
        </Stack>

        <Stack direction="row" spacing={1.25} sx={{ mt: 2.5 }}>
          <Button variant="contained" fullWidth onClick={() => navigate(`/cars/${car.id}`)}>
            View details
          </Button>
          <Button
            variant={isSelectedForCompare ? "contained" : "outlined"}
            color={isSelectedForCompare ? "secondary" : "primary"}
            startIcon={<CompareArrowsIcon />}
            onClick={() => onToggleCompare(car.id)}
            sx={{ whiteSpace: "nowrap" }}
          >
            {isSelectedForCompare ? "Added" : "Compare"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
