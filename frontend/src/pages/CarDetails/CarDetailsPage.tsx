import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useCarDetails } from "../../hooks/useCarDetails";
import { useAppData } from "../../context/AppDataContext";
import EmptyState from "../../components/ui/EmptyState";
import { tokens } from "../../theme/theme";
import { formatMileage, formatPriceRange } from "../../utils/format";

const SPEC_ROWS: { label: string; key: keyof NonNullable<ReturnType<typeof useCarDetails>["car"]> }[] = [
  { label: "Engine", key: "engine" },
  { label: "Transmission", key: "transmission" },
  { label: "Body type", key: "body_type" },
  { label: "Boot space", key: "boot_space_litres" },
  { label: "Ground clearance", key: "ground_clearance_mm" },
  { label: "Airbags", key: "airbags" },
  { label: "Warranty", key: "warranty" },
];

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { car, isLoading, error } = useCarDetails(id);
  const { toggleCompare, compareIds } = useAppData();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: tokens.steel }}
      >
        Back
      </Button>

      {isLoading && (
        <Card variant="outlined">
          <CardContent sx={{ p: 4 }}>
            <Skeleton width="30%" height={18} />
            <Skeleton width="60%" height={40} sx={{ mt: 1 }} />
            <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
            <Skeleton height={200} sx={{ mt: 3, borderRadius: 2 }} />
          </CardContent>
        </Card>
      )}

      {!isLoading && (error || !car) && (
        <EmptyState
          title="Couldn't load this car"
          description={error ?? "This car may no longer be available."}
          actionLabel="Back to results"
          onAction={() => navigate("/results")}
        />
      )}

      {!isLoading && car && (
        <Card variant="outlined" sx={{ borderColor: tokens.hairlineLight }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: { sm: "flex-start" } }}
            >
              <Box>
                <Typography variant="overline" sx={{ color: tokens.steel }}>
                  {car.make}
                </Typography>
                <Typography variant="h3" sx={{ mt: 0.25 }}>
                  {car.model}
                </Typography>
                <Typography variant="body1" sx={{ color: tokens.steel, mt: 0.5 }}>
                  {car.variant}
                </Typography>
                <Typography
                  sx={{
                    mt: 1.5,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: tokens.primary,
                  }}
                >
                  {formatPriceRange(car.min_price, car.max_price)}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" }, gap: 2 }}>
              {[
                { label: "Fuel", value: car.fuel },
                { label: "Seats", value: `${car.seats}` },
                { label: "Mileage", value: formatMileage(car.mileage) },
                { label: "Safety rating", value: `${car.safety_rating}★` },
              ].map((spec) => (
                <Box key={spec.label}>
                  <Typography variant="caption" sx={{ color: tokens.steel }}>
                    {spec.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>
                    {spec.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {(car.engine || car.transmission || car.body_type || car.boot_space_litres || car.airbags) && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                  Specifications
                </Typography>
                <Stack spacing={1}>
                  {SPEC_ROWS.filter((row) => car[row.key] !== undefined && car[row.key] !== null).map(
                    (row) => (
                      <Stack
                        key={row.label}
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          py: 1,
                          borderBottom: `1px solid ${tokens.hairlineLight}`,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: tokens.steel }}>
                          {row.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {String(car[row.key])}
                          {row.key === "boot_space_litres" ? " L" : ""}
                          {row.key === "ground_clearance_mm" ? " mm" : ""}
                        </Typography>
                      </Stack>
                    )
                  )}
                </Stack>
              </>
            )}

            {car.description && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" sx={{ color: tokens.ink }}>
                  {car.description}
                </Typography>
              </>
            )}

            {car.features?.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                  Features
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                  {car.features.map((feature) => (
                    <Chip key={feature} label={feature} />
                  ))}
                </Stack>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant={compareIds.includes(car.id) ? "contained" : "outlined"}
                color={compareIds.includes(car.id) ? "secondary" : "primary"}
                startIcon={<CompareArrowsIcon />}
                onClick={() => toggleCompare(car.id)}
              >
                {compareIds.includes(car.id) ? "Added to compare" : "Add to compare"}
              </Button>
              {compareIds.length === 2 && (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/compare?a=${compareIds[0]}&b=${compareIds[1]}`)}
                >
                  Go to comparison
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
