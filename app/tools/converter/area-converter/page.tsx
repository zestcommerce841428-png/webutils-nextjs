'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function AreaConverterPage() {
  const [sqm, setSqm] = useState('1');

  const convert = () => {
    const m = parseFloat(sqm);
    if (isNaN(m)) return {};
    return {
      sqkm: m / 1000000,
      sqcm: m * 10000,
      hectares: m / 10000,
      sqmiles: m * 0.000000386102,
      sqyards: m * 1.19599,
      sqfeet: m * 10.7639,
      acres: m * 0.000247105,
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Area Converter"
      description="Convert between area units"
      category="converter"
      categoryName="Converter"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Square Meters"
            value={sqm}
            onChange={(e) => setSqm(e.target.value)}
            type="number"
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">m²</InputAdornment> } }}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            {Object.entries(result).map(([unit, value]) => (
              <div key={unit}>
                <Typography variant="body2" color="text.secondary">{unit}</Typography>
                <Typography variant="h6">{typeof value === 'number' ? value.toFixed(8) : '-'}</Typography>
              </div>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
