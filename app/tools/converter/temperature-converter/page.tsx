'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type Unit = 'celsius' | 'fahrenheit' | 'kelvin';

const units: { value: Unit; label: string; symbol: string }[] = [
  { value: 'celsius', label: 'Celsius', symbol: '°C' },
  { value: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' },
  { value: 'kelvin', label: 'Kelvin', symbol: 'K' },
];

export default function TemperatureConverterPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<Unit>('celsius');
  const [results, setResults] = useState<{ unit: string; value: string; symbol: string }[]>([]);

  const convert = (value: number, from: Unit): Record<Unit, number> => {
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * (5 / 9);
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
    }

    // Convert from Celsius to all units
    return {
      celsius: celsius,
      fahrenheit: (celsius * 9/5) + 32,
      kelvin: celsius + 273.15,
    };
  };

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return;
    }

    const converted = convert(value, inputUnit);
    const resultArray = units.map(unit => ({
      unit: unit.label,
      value: converted[unit.value].toFixed(2),
      symbol: unit.symbol,
    }));

    setResults(resultArray);
  };

  const handleClear = () => {
    setInputValue('');
    setResults([]);
  };

  return (
    <ToolWrapper
      title="Temperature Converter"
      description="Convert temperatures between Celsius, Fahrenheit, and Kelvin."
      category="converter"
      categoryName="Converters"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input Temperature
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                variant="outlined"
                type="number"
                sx={{ flexGrow: 1, minWidth: '200px' }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value as Unit)}
                  label="Unit"
                >
                  {units.map(unit => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleConvert}
                disabled={!inputValue}
                startIcon={<CalculateIcon />}
                sx={{ height: '56px' }}
              >
                Convert
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results */}
        {results.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              <Grid container spacing={2}>
                {results.map((result, index) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        border: '2px solid',
                        borderColor: result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        bgcolor: result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') ? 'primary.50' : 'background.paper',
                        textAlign: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {result.unit}
                        </Typography>
                        {result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') && (
                          <Chip label="Input" size="small" color="primary" />
                        )}
                      </Box>
                      <Typography variant="h4" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {result.value}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {result.symbol}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Conversion Formulas:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <li>°C to °F: (°C × 9/5) + 32</li>
              <li>°F to °C: (°F − 32) × 5/9</li>
              <li>°C to K: °C + 273.15</li>
              <li>K to °C: K − 273.15</li>
            </Box>
          </Alert>
        </Grid>

        {/* Quick Reference */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Reference
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip label="Water Freezes: 0°C = 32°F = 273.15K" size="small" color="primary" variant="outlined" />
              <Chip label="Water Boils: 100°C = 212°F = 373.15K" size="small" color="error" variant="outlined" />
              <Chip label="Room Temp: ~20°C = ~68°F = ~293K" size="small" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
