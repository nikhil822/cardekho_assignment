import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function CarCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={16} />
            <Skeleton width="70%" height={32} sx={{ mt: 0.5 }} />
            <Skeleton width="50%" height={18} />
            <Skeleton width="45%" height={24} sx={{ mt: 1 }} />
          </Box>
          <Skeleton variant="circular" width={88} height={88} />
        </Stack>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Skeleton height={14} />
          <Skeleton height={14} width="80%" />
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mt: 2.5 }}>
          <Skeleton height={28} />
          <Skeleton height={28} />
          <Skeleton height={28} />
          <Skeleton height={28} />
        </Box>
        <Stack direction="row" spacing={1.25} sx={{ mt: 2.5 }}>
          <Skeleton variant="rounded" height={40} width="100%" />
          <Skeleton variant="rounded" height={40} width={110} />
        </Stack>
      </CardContent>
    </Card>
  );
}
