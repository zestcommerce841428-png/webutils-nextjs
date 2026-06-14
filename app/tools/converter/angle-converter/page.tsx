'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface AngleUnit {
  name: string;
  symbol: string;
  toDegrees: (value: number) => number;
  fromDegrees: (value: number) => number;
}

const angleUnits: Record<string, AngleUnit> = {
  degrees: {
    name: 'Degrees',
    symbol: '°',
    toDegrees: (v) => v,
    fromDegrees: (v) => v,
  },
  radians: {
    name: 'Radians',
    symbol: 'rad',
    toDegrees: (v) => v * (180 / Math.PI),
    fromDegrees: (v) => v * (Math.PI / 180),
  },
  gradians: {
    name: 'Gradians',
    symbol: 'grad',
    toDegrees: (v) => v * 0.9,
    fromDegrees: (v) => v / 0.9,
  },
  turns: {
    name: 'Turns',
    symbol: 'turn',
    toDegrees: (v) => v * 360,
    fromDegrees: (v) => v / 360,
  },
  arcminutes: {
    name: 'Arcminutes',
    symbol: '′',
    toDegrees: (v) => v / 60,
    fromDegrees: (v) => v * 60,
  },
  arcseconds: {
    name: 'Arcseconds',
    symbol: '″',
    toDegrees: (v) => v / 3600,
    fromDegrees: (v) => v * 3600,
  },
};

export default function AngleConverterPage() {
  const [values, setValues] = useState<Record<string, string>>({
    degrees: '180',
    radians: '',
    gradians: '',
    turns: '',
    arcminutes: '',
    arcseconds: '',
  });

  const handleChange = (unit: string, inputValue: string) => {
    if (inputValue === '' || inputValue === '-') {
      setValues({ ...values, [unit]: inputValue });
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return;

    const degrees = angleUnits[unit].toDegrees(numValue);
    const newValues: Record<string, string> = { [unit]: inputValue };

    Object.keys(angleUnits).forEach((key) => {
      if (key !== unit) {
        const converted = angleUnits[key].fromDegrees(degrees);
        newValues[key] = converted.toString();
      }
    });

    setValues(newValues);
  };

  const handleCopy = () => {
    const lines = Object.entries(angleUnits)
      .filter(([key]) => values[key] && values[key] !== '')
      .map(([key, unit]) => {
        const val = parseFloat(values[key]);
        return `${unit.name}: ${val} ${unit.symbol}`;
      });
    return lines.join('\n') || null;
  };

  return (
    <ToolWrapper
      title="Angle Converter"
      description="Convert between degrees, radians, gradians, turns, and more"
      category="converter"
      categoryName="Converter"
      onCopy={handleCopy}
    >
      <Grid container spacing={2}>
        {Object.entries(angleUnits).map(([key, unit]) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
            <Paper sx={{ p: 2 }}>
              <TextField
                label={unit.name}
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                fullWidth
                type="number"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">{unit.symbol}</InputAdornment>
                    ),
                  },
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Common Conversions
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" component="div">
              <strong>Degrees to Radians:</strong> ° × π/180<br />
              <strong>Radians to Degrees:</strong> rad × 180/π<br />
              <strong>Degrees to Gradians:</strong> ° × 10/9
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" component="div">
              <strong>Common Values:</strong><br />
              90° = π/2 rad = 100 grad = 0.25 turn<br />
              180° = π rad = 200 grad = 0.5 turn<br />
              360° = 2π rad = 400 grad = 1 turn
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ToolWrapper>
  );
}
