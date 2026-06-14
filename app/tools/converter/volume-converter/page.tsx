'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function VolumeConverterPage() {
  const [liters, setLiters] = useState('1');

  const convert = () => {
    const l = parseFloat(liters);
    if (isNaN(l)) return {};
    return {
      milliliters: l * 1000,
      cubicMeters: l / 1000,
      gallons: l * 0.264172,
      quarts: l * 1.05669,
      pints: l * 2.11338,
      cups: l * 4.22675,
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Volume Converter"
      description="Convert between volume units"
      category="converter"
      categoryName="Converter"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Liters"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            type="number"
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">L</InputAdornment> } }}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            {Object.entries(result).map(([unit, value]) => (
              <div key={unit}>
                <Typography variant="body2" color="text.secondary">{unit}</Typography>
                <Typography variant="h6">{typeof value === 'number' ? value.toFixed(6) : '-'}</Typography>
              </div>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
