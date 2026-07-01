import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme/theme";

interface ScoreGaugeProps {
  score: number; // 0-100
  size?: number;
}

// Signature element: an instrument-panel arc gauge with a needle, echoing
// the fuel/speed dials of the cars being recommended. Used on every result
// card in place of a generic percentage badge.
export default function ScoreGauge({ score, size = 88 }: ScoreGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const angle = -120 + (clamped / 100) * 240; // sweep from -120deg to +120deg

  const color =
    clamped >= 80 ? tokens.signal : clamped >= 60 ? tokens.amber : tokens.coral;

  const radius = size / 2 - 8;
  const center = size / 2;

  const arcPath = (startDeg: number, endDeg: number) => {
    const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
    const start = {
      x: center + radius * Math.cos(toRad(startDeg)),
      y: center + radius * Math.sin(toRad(startDeg)),
    };
    const end = {
      x: center + radius * Math.cos(toRad(endDeg)),
      y: center + radius * Math.sin(toRad(endDeg)),
    };
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* track */}
        <path
          d={arcPath(-120, 120)}
          fill="none"
          stroke={tokens.hairlineLight}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* progress */}
        <path
          d={arcPath(-120, angle)}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* needle */}
        <g transform={`rotate(${angle} ${center} ${center})`}>
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius + 10}
            stroke={tokens.ink}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
        <circle cx={center} cy={center} r={3} fill={tokens.ink} />
      </svg>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600,
            fontSize: size * 0.24,
            lineHeight: 1,
            color: tokens.ink,
          }}
        >
          {Math.round(clamped)}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: tokens.steel, fontSize: size * 0.1, letterSpacing: "0.05em" }}
        >
          MATCH
        </Typography>
      </Box>
    </Box>
  );
}
