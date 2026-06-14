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
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type Unit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

const units: { value: Unit; label: string; multiplier: number }[] = [
  { value: 'seconds', label: 'Seconds', multiplier: 1 },
  { value: 'minutes', label: 'Minutes', multiplier: 60 },
  { value: 'hours', label: 'Hours', multiplier: 3600 },
  { value: 'days', label: 'Days', multiplier: 86400 },
  { value: 'weeks', label: 'Weeks', multiplier: 604800 },
  { value: 'months', label: 'Months (30 days)', multiplier: 2592000 },
  { value: 'years', label: 'Years (365 days)', multiplier: 31536000 },
];

export default function TimeConverterPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<Unit>('hours');
  const [results, setResults] = useState<{ unit: string; value: string }[]>([]);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      return;
    }

    const inputMultiplier = units.find(u => u.value === inputUnit)?.multiplier || 1;
    const seconds = value * inputMultiplier;

    const converted = units.map(unit => ({
      unit: unit.label,
      value: (seconds / unit.multiplier).toFixed(6).replace(/\.?0+$/, ''),
    }));

    setResults(converted);
  };

  const handleClear = () => {
    setInputValue('');
    setResults([]);
  };

  return (
    <ToolWrapper
      title="Time Converter"
      description="Convert time between seconds, minutes, hours, days, weeks, months, and years."
      category="converter"
      categoryName="Converters"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input Time
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
              <FormControl sx={{ minWidth: 180 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        bgcolor: result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') ? 'primary.50' : 'background.paper',
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {result.unit}
                      </Typography>
                      <Typography variant="h6" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                        {result.value}
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
              <strong>Quick Reference:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2, fontSize: '0.9rem' }}>
              <li>1 minute = 60 seconds</li>
              <li>1 hour = 60 minutes = 3,600 seconds</li>
              <li>1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
              <li>1 week = 7 days = 168 hours = 604,800 seconds</li>
              <li>1 year = 365 days = 8,760 hours = 31,536,000 seconds</li>
            </Box>
          </Alert>
        </Grid>

        {/* Examples */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'success.50' }}>
            <Typography variant="subtitle1" gutterBottom color="success.main">
              Common Conversions
            </Typography>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">⏰ <strong>1 hour</strong> = 60 minutes</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">📅 <strong>1 day</strong> = 24 hours</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">📆 <strong>1 week</strong> = 7 days</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">🗓️ <strong>1 year</strong> = 365 days</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
