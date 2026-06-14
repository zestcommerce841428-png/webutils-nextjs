'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function DiscountCalculatorPage() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');

  const calc = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d)) return { savings: 0, final: 0 };
    const savings = (p * d) / 100;
    return { savings, final: p - savings };
  };

  const result = calc();

  return (
    <ToolWrapper
      title="Discount Calculator"
      description="Calculate discounted price"
      category="calculator"
      categoryName="Calculator"
      onCopy={() => `Original: $${price}\nDiscount: ${discount}%\nSavings: $${result.savings.toFixed(2)}\nFinal: $${result.final.toFixed(2)}`}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Original Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" fullWidth />
            <TextField label="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} type="number" fullWidth />
          </Stack>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Result</Typography>
          <Stack spacing={2}>
            <div>
              <Typography variant="body2" color="text.secondary">You Save</Typography>
              <Typography variant="h4" color="success.main">${result.savings.toFixed(2)}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Final Price</Typography>
              <Typography variant="h4">${result.final.toFixed(2)}</Typography>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
