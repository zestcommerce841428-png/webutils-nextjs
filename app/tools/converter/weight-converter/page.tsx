'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function WeightConverterPage() {
  const [kg, setKg] = useState('1');

  const convert = () => {
    const k = parseFloat(kg);
    if (isNaN(k)) return {};
    return {
      grams: k * 1000,
      pounds: k * 2.20462,
      ounces: k * 35.274,
      tons: k / 1000,
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Weight Converter"
      description="Convert between weight units"
      category="converter"
      categoryName="Converter"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Kilograms"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            type="number"
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }}
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
