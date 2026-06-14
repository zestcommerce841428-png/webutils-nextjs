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
} from '@mui/material';
import { Casino as DiceIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      return;
    }

    if (minNum >= maxNum) {
      return;
    }

    if (countNum < 1 || countNum > 1000) {
      return;
    }

    const numbers: number[] = [];
    for (let i = 0; i < countNum; i++) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      numbers.push(random);
    }

    setResults(numbers);
  };

  const handleCopy = () => {
    return results.join(', ');
  };

  const handleClear = () => {
    setResults([]);
  };

  return (
    <ToolWrapper
      title="Random Number Generator"
      description="Generate random numbers within a specified range with customizable quantity."
      category="generator"
      categoryName="Generators"
      onCopy={handleCopy}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Minimum"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Maximum"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  type="number"
                  variant="outlined"
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max: 1000,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={generate}
                  startIcon={<DiceIcon />}
                  sx={{ height: '56px' }}
                >
                  Generate
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Results */}
        {results.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Generated Numbers ({results.length})
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  maxHeight: '400px',
                  overflow: 'auto',
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {results.map((num, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        minWidth: '60px',
                        textAlign: 'center',
                      }}
                    >
                      {num}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Statistics */}
        {results.length > 1 && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Average
                    </Typography>
                    <Typography variant="h5">
                      {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Sum
                    </Typography>
                    <Typography variant="h5">
                      {results.reduce((a, b) => a + b, 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Minimum
                    </Typography>
                    <Typography variant="h5">
                      {Math.min(...results)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Maximum
                    </Typography>
                    <Typography variant="h5">
                      {Math.max(...results)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Use Cases:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>Generate lottery numbers</li>
              <li>Random selection for games</li>
              <li>Create test data</li>
              <li>Random sampling</li>
              <li>Password generation seeds</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
