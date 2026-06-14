'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function SpeedConverterPage() {
  const [mps, setMps] = useState('10');

  const convert = () => {
    const m = parseFloat(mps);
    if (isNaN(m)) return {};
    return {
      kmh: m * 3.6,
      mph: m * 2.23694,
      knots: m * 1.94384,
      fps: m * 3.28084,
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Speed Converter"
      description="Convert between speed units"
      category="converter"
      categoryName="Converter"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Meters per Second"
            value={mps}
            onChange={(e) => setMps(e.target.value)}
            type="number"
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">m/s</InputAdornment> } }}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <div>
              <Typography variant="body2" color="text.secondary">Kilometers per Hour</Typography>
              <Typography variant="h6">{result.kmh?.toFixed(4) || '-'} km/h</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Miles per Hour</Typography>
              <Typography variant="h6">{result.mph?.toFixed(4) || '-'} mph</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Knots</Typography>
              <Typography variant="h6">{result.knots?.toFixed(4) || '-'} kn</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Feet per Second</Typography>
              <Typography variant="h6">{result.fps?.toFixed(4) || '-'} ft/s</Typography>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
