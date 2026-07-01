import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CarCard from "../../components/cards/CarCard";
import CarCardSkeleton from "../../components/ui/CarCardSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import { useAppData } from "../../context/AppDataContext";
import { tokens } from "../../theme/theme";
import type { RecommendationResult, SortOption } from "../../types/car";

const SORT_LABELS: Record<SortOption, string> = {
  best_match: "Best match",
  lowest_price: "Lowest price",
  highest_safety: "Highest safety",
  best_mileage: "Best mileage",
};

function getPrimaryCar(result: RecommendationResult) {
  return result.cars[0];
}

function sortResults(results: RecommendationResult[], sortBy: SortOption): RecommendationResult[] {
  const copy = [...results];
  switch (sortBy) {
    case "lowest_price":
      return copy.sort((a, b) => (getPrimaryCar(a)?.min_price ?? 0) - (getPrimaryCar(b)?.min_price ?? 0));
    case "highest_safety":
      return copy.sort((a, b) => (getPrimaryCar(b)?.safety_rating ?? 0) - (getPrimaryCar(a)?.safety_rating ?? 0));
    case "best_mileage":
      return copy.sort((a, b) => (getPrimaryCar(b)?.mileage ?? 0) - (getPrimaryCar(a)?.mileage ?? 0));
    default:
      return copy.sort((a, b) => b.score - a.score);
  }
}

export default function RecommendationResultsPage() {
  const navigate = useNavigate();
  const { results, isLoading, error, compareIds, toggleCompare } = useAppData();
  const [sortBy, setSortBy] = useState<SortOption>("best_match");

  const sortedResults = useMemo(() => sortResults(results, sortBy), [results, sortBy]);
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, pb: compareIds.length ? 14 : 6 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { sm: "flex-end" }, mb: 4 }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: tokens.amberDark }}>
            Step 2 of 2
          </Typography>
          <Typography variant="h3" sx={{ mt: 0.5 }}>
            Your shortlist
          </Typography>
          {!isLoading && !error && (
            <Typography variant="body2" sx={{ color: tokens.steel, mt: 0.5 }}>
              {sortedResults.length} car{sortedResults.length === 1 ? "" : "s"} matched your criteria
            </Typography>
          )}
        </Box>

        {!isLoading && sortedResults.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 190 }}>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  Sort: {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {isLoading && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </Box>
      )}

      {!isLoading && error && (
        <EmptyState
          title="Something went wrong"
          description={error}
          actionLabel="Adjust your search"
          onAction={() => navigate("/")}
        />
      )}

      {!isLoading && !error && sortedResults.length === 0 && (
        <EmptyState
          title="No cars matched those criteria"
          description="Try widening your budget, lowering the mileage requirement, or removing a feature to see more options."
          actionLabel="Adjust your search"
          onAction={() => navigate("/")}
        />
      )}

      {!isLoading && !error && sortedResults.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {sortedResults.map((result) => {
            const car = getPrimaryCar(result);
            if (!car) return null;
            return (
            <CarCard
              key={car.id}
              result={result}
              isSelectedForCompare={compareIds.includes(car.id)}
              onToggleCompare={toggleCompare}
            />
            );
          })}
        </Box>
      )}

      {compareIds.length > 0 && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            px: 3,
            py: 1.5,
            borderRadius: 3,
            bgcolor: tokens.ink,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 2,
            zIndex: 20,
          }}
        >
          <Typography variant="body2">
            {compareIds.length} of 2 selected for comparison
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<CompareArrowsIcon />}
            disabled={compareIds.length < 2}
            onClick={() => navigate(`/compare?a=${compareIds[0]}&b=${compareIds[1]}`)}
          >
            Compare now
          </Button>
        </Paper>
      )}
    </Container>
  );
}
