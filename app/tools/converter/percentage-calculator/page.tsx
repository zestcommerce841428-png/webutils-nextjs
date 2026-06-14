'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type Operation = 'add' | 'subtract' | 'percentage_of' | 'what_percent' | 'percent_change';

export default function PercentageCalculatorPage() {
  const [operation, setOperation] = useState<Operation>('percentage_of');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || (operation !== 'add' && operation !== 'subtract' && isNaN(n2))) {
      setResult('Invalid input');
      return;
    }

    let res = 0;
    switch (operation) {
      case 'add':
        // Add percentage to number: num1 + (num1 * num2/100)
        res = n1 + (n1 * n2 / 100);
        setResult(`${res.toFixed(2)}`);
        break;
      case 'subtract':
        // Subtract percentage from number: num1 - (num1 * num2/100)
        res = n1 - (n1 * n2 / 100);
        setResult(`${res.toFixed(2)}`);
        break;
      case 'percentage_of':
        // What is n1% of n2?
        res = (n1 / 100) * n2;
        setResult(`${res.toFixed(2)}`);
        break;
      case 'what_percent':
        // n1 is what percent of n2?
        res = (n1 / n2) * 100;
        setResult(`${res.toFixed(2)}%`);
        break;
      case 'percent_change':
        // Percentage change from n1 to n2
        res = ((n2 - n1) / n1) * 100;
        setResult(`${res > 0 ? '+' : ''}${res.toFixed(2)}%`);
        break;
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (num1 && (operation === 'add' || operation === 'subtract' || num2)) {
      calculate();
    } else {
      setResult('');
    }
  }, [num1, num2, operation]);

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <ToolWrapper
      title="Percentage Calculator"
      description="Calculate percentages, percentage changes, and perform percentage-based operations."
      category="converter"
      categoryName="Converters"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Operation Selection */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Calculation Type</InputLabel>
              <Select
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                label="Calculation Type"
              >
                <MenuItem value="percentage_of">What is X% of Y?</MenuItem>
                <MenuItem value="what_percent">X is what % of Y?</MenuItem>
                <MenuItem value="percent_change">% change from X to Y</MenuItem>
                <MenuItem value="add">Add X% to Y</MenuItem>
                <MenuItem value="subtract">Subtract X% from Y</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Input Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <TextField
              fullWidth
              label={operation === 'percentage_of' || operation === 'add' || operation === 'subtract' ? 'Percentage' : 'First Number'}
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              type="number"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Second Number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              type="number"
              variant="outlined"
            />
          </Paper>
        </Grid>

        {/* Result */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'primary.50', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Result
              </Typography>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                {result || '—'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Examples:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>What is 20% of 150? → 30</li>
              <li>50 is what % of 200? → 25%</li>
              <li>% change from 100 to 120? → +20%</li>
              <li>Add 10% to 100 → 110</li>
              <li>Subtract 25% from 200 → 150</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
