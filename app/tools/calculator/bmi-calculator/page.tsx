'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface BMIResult {
  bmi: number;
  category: string;
  healthyMin: number;
  healthyMax: number;
  color: string;
}

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('7');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    let bmi: number;
    
    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100; // cm to m
      if (!w || !h || w <= 0 || h <= 0) return null;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weight);
      const f = parseFloat(feet);
      const i = parseFloat(inches);
      if (!w || !f || w <= 0 || f < 0) return null;
      const totalInches = f * 12 + (i || 0);
      if (totalInches <= 0) return null;
      bmi = (w / (totalInches * totalInches)) * 703;
    }

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#2196F3';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = '#4CAF50';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#FF9800';
    } else {
      category = 'Obese';
      color = '#F44336';
    }

    const h = unit === 'metric' ? parseFloat(height) / 100 : (parseFloat(feet) * 12 + (parseFloat(inches) || 0)) / 39.37;
    const healthyMin = 18.5 * (h * h);
    const healthyMax = 24.9 * (h * h);

    return { bmi, category, healthyMin, healthyMax, color };
  };

  useEffect(() => {
    const res = calculateBMI();
    setResult(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight, height, feet, inches, unit]);

  const getBMIProgress = () => {
    if (!result) return 0;
    // Map BMI to 0-100 scale (15 to 40 BMI range)
    return Math.min(100, Math.max(0, ((result.bmi - 15) / 25) * 100));
  };

  const handleCopy = () => {
    if (!result) return null;
    return `BMI: ${result.bmi.toFixed(1)}\nCategory: ${result.category}\nHealthy Weight Range: ${result.healthyMin.toFixed(1)} - ${result.healthyMax.toFixed(1)} ${unit === 'metric' ? 'kg' : 'lbs'}`;
  };

  return (
    <ToolWrapper
      title="BMI Calculator"
      description="Calculate Body Mass Index and assess weight health status"
      category="calculator"
      categoryName="Calculator"
      onCopy={handleCopy}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ToggleButtonGroup
              value={unit}
              exclusive
              onChange={(_, val) => val && setUnit(val)}
              color="primary"
            >
              <ToggleButton value="metric">Metric (kg, cm)</ToggleButton>
              <ToggleButton value="imperial">Imperial (lbs, ft/in)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Input
            </Typography>

            <TextField
              label="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                input: {
                  endAdornment: unit === 'metric' ? 'kg' : 'lbs',
                },
              }}
            />

            {unit === 'metric' ? (
              <TextField
                label="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                fullWidth
                margin="normal"
                type="number"
                slotProps={{
                  input: {
                    endAdornment: 'cm',
                  },
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  label="Feet"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Inches"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>

            {result ? (
              <>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <Typography variant="h2" sx={{ fontWeight: 600, color: result.color }}>
                    {result.bmi.toFixed(1)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: result.color, mt: 1 }}>
                    {result.category}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    BMI Scale
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={getBMIProgress()}
                    sx={{
                      height: 20,
                      borderRadius: 1,
                      backgroundColor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: result.color,
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      15
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      40+
                    </Typography>
                  </Box>
                </Box>

                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    Healthy Weight Range:
                  </Typography>
                  <Typography variant="body2">
                    {result.healthyMin.toFixed(1)} - {result.healthyMax.toFixed(1)}{' '}
                    {unit === 'metric' ? 'kg' : 'lbs'}
                  </Typography>
                </Alert>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>BMI Categories:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Underweight: &lt; 18.5<br />
                    • Normal: 18.5 - 24.9<br />
                    • Overweight: 25 - 29.9<br />
                    • Obese: ≥ 30
                  </Typography>
                </Box>
              </>
            ) : (
              <Alert severity="warning">
                Please enter valid weight and height values.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> BMI is a screening tool and may not accurately reflect body composition. Consult healthcare professionals for personalized health advice.
        </Typography>
      </Alert>
    </ToolWrapper>
  );
}
