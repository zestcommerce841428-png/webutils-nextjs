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

type Unit = 'bytes' | 'kb' | 'mb' | 'gb' | 'tb';

const units: { value: Unit; label: string; multiplier: number }[] = [
  { value: 'bytes', label: 'Bytes', multiplier: 1 },
  { value: 'kb', label: 'Kilobytes (KB)', multiplier: 1024 },
  { value: 'mb', label: 'Megabytes (MB)', multiplier: 1024 * 1024 },
  { value: 'gb', label: 'Gigabytes (GB)', multiplier: 1024 * 1024 * 1024 },
  { value: 'tb', label: 'Terabytes (TB)', multiplier: 1024 * 1024 * 1024 * 1024 },
];

export default function FileSizeConverterPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<Unit>('mb');
  const [results, setResults] = useState<{ unit: string; value: string }[]>([]);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      return;
    }

    const inputMultiplier = units.find(u => u.value === inputUnit)?.multiplier || 1;
    const bytes = value * inputMultiplier;

    const converted = units.map(unit => ({
      unit: unit.label,
      value: (bytes / unit.multiplier).toFixed(2),
    }));

    setResults(converted);
  };

  const handleClear = () => {
    setInputValue('');
    setResults([]);
  };

  return (
    <ToolWrapper
      title="File Size Converter"
      description="Convert file sizes between bytes, kilobytes, megabytes, gigabytes, and terabytes."
      category="converter"
      categoryName="Converters"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input
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
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: result.unit.includes(units.find(u => u.value === inputUnit)?.label || '') ? 'primary.50' : 'background.paper',
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
                      <Typography variant="h5" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
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
              <strong>File Size Units:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>1 KB (Kilobyte) = 1,024 Bytes</li>
              <li>1 MB (Megabyte) = 1,024 KB = 1,048,576 Bytes</li>
              <li>1 GB (Gigabyte) = 1,024 MB = 1,073,741,824 Bytes</li>
              <li>1 TB (Terabyte) = 1,024 GB = 1,099,511,627,776 Bytes</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
