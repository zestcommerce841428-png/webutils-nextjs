'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type ConversionType = 'bin2dec' | 'bin2hex' | 'bin2oct' | 'dec2bin' | 'dec2hex' | 'dec2oct' | 'hex2bin' | 'hex2dec' | 'hex2oct' | 'oct2bin' | 'oct2dec' | 'oct2hex';

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState<ConversionType>('dec2bin');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter a number');
      return;
    }

    try {
      let result = '';
      const trimmedInput = input.trim();

      switch (conversionType) {
        case 'bin2dec':
          result = parseInt(trimmedInput, 2).toString(10);
          break;
        case 'bin2hex':
          result = parseInt(trimmedInput, 2).toString(16).toUpperCase();
          break;
        case 'bin2oct':
          result = parseInt(trimmedInput, 2).toString(8);
          break;
        case 'dec2bin':
          result = parseInt(trimmedInput, 10).toString(2);
          break;
        case 'dec2hex':
          result = parseInt(trimmedInput, 10).toString(16).toUpperCase();
          break;
        case 'dec2oct':
          result = parseInt(trimmedInput, 10).toString(8);
          break;
        case 'hex2bin':
          result = parseInt(trimmedInput, 16).toString(2);
          break;
        case 'hex2dec':
          result = parseInt(trimmedInput, 16).toString(10);
          break;
        case 'hex2oct':
          result = parseInt(trimmedInput, 16).toString(8);
          break;
        case 'oct2bin':
          result = parseInt(trimmedInput, 8).toString(2);
          break;
        case 'oct2dec':
          result = parseInt(trimmedInput, 8).toString(10);
          break;
        case 'oct2hex':
          result = parseInt(trimmedInput, 8).toString(16).toUpperCase();
          break;
      }

      if (result === 'NaN' || result === '') {
        setError('Invalid input for selected conversion');
        return;
      }

      setOutput(result);
    } catch (err) {
      setError('Invalid input format');
    }
  };

  const handleCopy = () => {
    return output;
  };

  const handlePaste = (text: string) => {
    setInput(text);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolWrapper
      title="Number Base Converter"
      description="Convert numbers between binary, decimal, hexadecimal, and octal bases."
      category="dev"
      categoryName="Developer Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Conversion Type</InputLabel>
                <Select
                  value={conversionType}
                  onChange={(e) => setConversionType(e.target.value as ConversionType)}
                  label="Conversion Type"
                  size="small"
                >
                  <MenuItem value="dec2bin">Decimal → Binary</MenuItem>
                  <MenuItem value="dec2hex">Decimal → Hexadecimal</MenuItem>
                  <MenuItem value="dec2oct">Decimal → Octal</MenuItem>
                  <MenuItem value="bin2dec">Binary → Decimal</MenuItem>
                  <MenuItem value="bin2hex">Binary → Hexadecimal</MenuItem>
                  <MenuItem value="bin2oct">Binary → Octal</MenuItem>
                  <MenuItem value="hex2dec">Hexadecimal → Decimal</MenuItem>
                  <MenuItem value="hex2bin">Hexadecimal → Binary</MenuItem>
                  <MenuItem value="hex2oct">Hexadecimal → Octal</MenuItem>
                  <MenuItem value="oct2dec">Octal → Decimal</MenuItem>
                  <MenuItem value="oct2bin">Octal → Binary</MenuItem>
                  <MenuItem value="oct2hex">Octal → Hexadecimal</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={convert}
                disabled={!input.trim()}
                startIcon={<CalculateIcon />}
              >
                Convert
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input
            </Typography>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter number..."
              variant="outlined"
              sx={{ fontFamily: 'monospace', fontSize: '1.2rem' }}
            />
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Output
            </Typography>
            <TextField
              fullWidth
              value={output}
              placeholder="Result will appear here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace', fontSize: '1.2rem' }}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Error */}
        {error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Number Base Systems:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li><strong>Binary (Base-2):</strong> Uses digits 0-1</li>
              <li><strong>Octal (Base-8):</strong> Uses digits 0-7</li>
              <li><strong>Decimal (Base-10):</strong> Uses digits 0-9 (standard)</li>
              <li><strong>Hexadecimal (Base-16):</strong> Uses digits 0-9 and A-F</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
