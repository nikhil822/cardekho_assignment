import { useSearchParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCarDetails } from "../../hooks/useCarDetails";
import EmptyState from "../../components/ui/EmptyState";
import { tokens } from "../../theme/theme";
import { formatMileage, formatPriceRange } from "../../utils/format";
import type { CarDetails } from "../../types/car";

interface SpecRow {
  label: string;
  getValue: (car: CarDetails) => string;
}

const SPEC_ROWS: SpecRow[] = [
  { label: "Price", getValue: (c) => formatPriceRange(c.min_price, c.max_price) },
  { label: "Fuel", getValue: (c) => c.fuel },
  { label: "Seats", getValue: (c) => `${c.seats}` },
  { label: "Mileage", getValue: (c) => formatMileage(c.mileage) },
  { label: "Safety rating", getValue: (c) => `${c.safety_rating}★` },
];

export default function CompareCarsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idA = searchParams.get("a") ?? undefined;
  const idB = searchParams.get("b") ?? undefined;

  const { car: carA, isLoading: loadingA, error: errorA } = useCarDetails(idA);
  const { car: carB, isLoading: loadingB, error: errorB } = useCarDetails(idB);

  const isLoading = loadingA || loadingB;
  const error = errorA || errorB;

  if (!idA || !idB) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <EmptyState
          title="Pick two cars to compare"
          description="Select two cars from your shortlist using the Compare button, then come back here."
          actionLabel="Back to results"
          onAction={() => navigate("/results")}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: tokens.steel }}>
        Back
      </Button>

      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Compare cars
      </Typography>
      <Typography variant="body1" sx={{ color: tokens.steel, mb: 4 }}>
        Differences between the two are highlighted.
      </Typography>

      {isLoading && (
        <Skeleton variant="rounded" height={420} sx={{ borderRadius: 3 }} />
      )}

      {!isLoading && (error || !carA || !carB) && (
        <EmptyState
          title="Couldn't load these cars"
          description={error ?? "One or both cars are no longer available."}
          actionLabel="Back to results"
          onAction={() => navigate("/results")}
        />
      )}

      {!isLoading && carA && carB && (
        <TableContainer component={Paper} variant="outlined" sx={{ borderColor: tokens.hairlineLight }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: tokens.steel, width: "28%" }}>
                  Specification
                </TableCell>
                {[carA, carB].map((car) => (
                  <TableCell key={car.id} sx={{ width: "36%" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {car.make} {car.model}
                    </Typography>
                    <Typography variant="caption" sx={{ color: tokens.steel }}>
                      {car.variant}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {SPEC_ROWS.map((row) => {
                const valueA = row.getValue(carA);
                const valueB = row.getValue(carB);
                const differs = valueA !== valueB;
                return (
                  <TableRow key={row.label} hover>
                    <TableCell sx={{ color: tokens.steel, fontWeight: 500 }}>{row.label}</TableCell>
                    <TableCell
                      sx={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: differs ? 700 : 400,
                        bgcolor: differs ? "rgba(242,169,59,0.14)" : "transparent",
                      }}
                    >
                      {valueA}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: differs ? 700 : 400,
                        bgcolor: differs ? "rgba(242,169,59,0.14)" : "transparent",
                      }}
                    >
                      {valueB}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell sx={{ color: tokens.steel, fontWeight: 500, verticalAlign: "top" }}>
                  Features
                </TableCell>
                {[carA, carB].map((car) => (
                  <TableCell key={car.id} sx={{ verticalAlign: "top" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {car.features.map((feature) => {
                        const otherCar = car.id === carA.id ? carB : carA;
                        const isUnique = !otherCar.features.includes(feature);
                        return (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: isUnique ? "rgba(242,169,59,0.18)" : undefined,
                              fontWeight: isUnique ? 600 : 400,
                            }}
                          />
                        );
                      })}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
