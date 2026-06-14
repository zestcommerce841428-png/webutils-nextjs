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

interface PressureUnit {
  name: string;
  symbol: string;
  toPascals: (value: number) => number;
  fromPascals: (value: number) => number;
}

const pressureUnits: Record<string, PressureUnit> = {
  pascal: {
    name: 'Pascals',
    symbol: 'Pa',
    toPascals: (v) => v,
    fromPascals: (v) => v,
  },
  kilopascal: {
    name: 'Kilopascals',
    symbol: 'kPa',
    toPascals: (v) => v * 1000,
    fromPascals: (v) => v / 1000,
  },
  bar: {
    name: 'Bar',
    symbol: 'bar',
    toPascals: (v) => v * 100000,
    fromPascals: (v) => v / 100000,
  },
  millibar: {
    name: 'Millibar',
    symbol: 'mbar',
    toPascals: (v) => v * 100,
    fromPascals: (v) => v / 100,
  },
  atm: {
    name: 'Atmosphere',
    symbol: 'atm',
    toPascals: (v) => v * 101325,
    fromPascals: (v) => v / 101325,
  },
  psi: {
    name: 'PSI',
    symbol: 'psi',
    toPascals: (v) => v * 6894.757,
    fromPascals: (v) => v / 6894.757,
  },
  torr: {
    name: 'Torr',
    symbol: 'Torr',
    toPascals: (v) => v * 133.322,
    fromPascals: (v) => v / 133.322,
  },
  mmHg: {
    name: 'mmHg',
    symbol: 'mmHg',
    toPascals: (v) => v * 133.322,
    fromPascals: (v) => v / 133.322,
  },
  inHg: {
    name: 'Inches of Mercury',
    symbol: 'inHg',
    toPascals: (v) => v * 3386.39,
    fromPascals: (v) => v / 3386.39,
  },
};

export default function PressureConverterPage() {
  const [values, setValues] = useState<Record<string, string>>({
    pascal: '',
    kilopascal: '',
    bar: '',
    millibar: '',
    atm: '1',
    psi: '',
    torr: '',
    mmHg: '',
    inHg: '',
  });

  const handleChange = (unit: string, inputValue: string) => {
    if (inputValue === '' || inputValue === '-') {
      setValues({ ...values, [unit]: inputValue });
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return;

    const pascals = pressureUnits[unit].toPascals(numValue);
    const newValues: Record<string, string> = { [unit]: inputValue };

    Object.keys(pressureUnits).forEach((key) => {
      if (key !== unit) {
        const converted = pressureUnits[key].fromPascals(pascals);
        newValues[key] = converted.toString();
      }
    });

    setValues(newValues);
  };

  const handleCopy = () => {
    const lines = Object.entries(pressureUnits)
      .filter(([key]) => values[key] && values[key] !== '')
      .map(([key, unit]) => {
        const val = parseFloat(values[key]);
        return `${unit.name}: ${val} ${unit.symbol}`;
      });
    return lines.join('\n') || null;
  };

  return (
    <ToolWrapper
      title="Pressure Converter"
      description="Convert between Pascal, Bar, PSI, Atmosphere, and other pressure units"
      category="converter"
      categoryName="Converter"
      onCopy={handleCopy}
    >
      <Grid container spacing={2}>
        {Object.entries(pressureUnits).map(([key, unit]) => (
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
          Common Reference Values
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" component="div">
              <strong>Standard Atmosphere:</strong><br />
              101,325 Pa = 1 atm<br />
              1.01325 bar<br />
              14.696 psi
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" component="div">
              <strong>Tire Pressure:</strong><br />
              32 psi (typical car)<br />
              ≈ 2.2 bar<br />
              ≈ 220 kPa
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" component="div">
              <strong>Blood Pressure:</strong><br />
              120 mmHg (systolic)<br />
              ≈ 16 kPa<br />
              ≈ 2.3 psi
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ToolWrapper>
  );
}
