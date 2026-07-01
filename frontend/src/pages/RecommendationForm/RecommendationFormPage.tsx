import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import BudgetRangeSlider from "../../components/forms/BudgetRangeSlider";
import FeatureChips from "../../components/forms/FeatureChips";
import PrioritySelector from "../../components/forms/PrioritySelector";
import { useAppData } from "../../context/AppDataContext";
import { tokens } from "../../theme/theme";
import type { FuelType, PriorityKey, RecommendationFilters } from "../../types/car";

const BUDGET_MIN = 300000;
const BUDGET_MAX = 3000000;
const BUDGET_STEP = 50000;

export default function RecommendationFormPage() {
  const navigate = useNavigate();
  const { runRecommendation, isLoading } = useAppData();

  const [budget, setBudget] = useState<[number, number]>([600000, 1200000]);
  const [seats, setSeats] = useState<string>("any");
  const [fuel, setFuel] = useState<FuelType>("Any");
  const [safety, setSafety] = useState<string>("any");
  const [mileage, setMileage] = useState<string>("15");
  const [features, setFeatures] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<PriorityKey[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const mileageValue = useMemo(() => Number(mileage) || 0, [mileage]);

  const handleSubmit = async () => {
    setFormError(null);

    if (budget[1] <= budget[0]) {
      setFormError("Budget max must be greater than budget min.");
      return;
    }
    if (mileageValue < 0) {
      setFormError("Minimum mileage can't be negative.");
      return;
    }

    const filters: RecommendationFilters = {
      budget_min: budget[0],
      budget_max: budget[1],
      seats: seats === "any" ? null : Number(seats),
      fuel,
      min_safety_rating: safety === "any" ? null : Number(safety),
      min_mileage: mileageValue,
      features,
      priorities,
    };

    const success = await runRecommendation(filters);
    if (success) navigate("/results");
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: tokens.amberDark }}>
          Step 1 of 2
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.5 }}>
          Tell us what matters
        </Typography>
        <Typography variant="body1" sx={{ color: tokens.steel, mt: 1 }}>
          Set your budget and must-haves — we'll rank cars against exactly these criteria.
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderColor: tokens.hairlineLight }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={4}>
            <BudgetRangeSlider
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={budget}
              onChange={setBudget}
            />

            <Divider />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="seats-label">Seats required</InputLabel>
                <Select
                  labelId="seats-label"
                  label="Seats required"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                >
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="safety-label">Minimum safety rating</InputLabel>
                <Select
                  labelId="safety-label"
                  label="Minimum safety rating"
                  value={safety}
                  onChange={(e) => setSafety(e.target.value)}
                >
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="3">3+</MenuItem>
                  <MenuItem value="4">4+</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Minimum mileage (kmpl)"
                size="small"
                fullWidth
                value={mileage}
                onChange={(e) => setMileage(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="18"
                slotProps={{ htmlInput: { inputMode: "decimal" } }}
              />
            </Stack>

            <Divider />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                Fuel preference
              </Typography>
              <RadioGroup
                row
                value={fuel}
                onChange={(e) => setFuel(e.target.value as FuelType)}
                sx={{ flexWrap: "wrap" }}
              >
                {(["Any", "Petrol", "Diesel", "Hybrid", "Electric"] as FuelType[]).map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                Features
              </Typography>
              <FeatureChips selected={features} onChange={setFeatures} />
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Priorities
              </Typography>
              <PrioritySelector selected={priorities} onChange={setPriorities} />
            </Box>

            {formError && <Alert severity="warning">{formError}</Alert>}

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{ bgcolor: tokens.primary }}
            >
              {isLoading ? "Finding your shortlist…" : "Find my shortlist"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
