'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function LengthConverterPage() {
  const [meters, setMeters] = useState('1');

  const convert = () => {
    const m = parseFloat(meters);
    if (isNaN(m)) return {};
    return {
      km: m / 1000,
      cm: m * 100,
      mm: m * 1000,
      miles: m * 0.000621371,
      yards: m * 1.09361,
      feet: m * 3.28084,
      inches: m * 39.3701,
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Length Converter"
      description="Convert between length units"
      category="converter"
      categoryName="Converter"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Meters"
            value={meters}
            onChange={(e) => setMeters(e.target.value)}
            type="number"
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">m</InputAdornment> } }}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            {Object.entries(result).map(([unit, value]) => (
              <div key={unit}>
                <Typography variant="body2" color="text.secondary">{unit.toUpperCase()}</Typography>
                <Typography variant="h6">{typeof value === 'number' ? value.toFixed(6) : '-'}</Typography>
              </div>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
