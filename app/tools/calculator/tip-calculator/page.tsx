'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TipCalculatorPage() {
  const [bill, setBill] = useState('100');
  const [tip, setTip] = useState('15');
  const [people, setPeople] = useState('1');

  const calc = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tip);
    const p = parseInt(people);
    if (isNaN(b) || isNaN(t) || isNaN(p) || p < 1) return { tipAmount: 0, total: 0, perPerson: 0 };
    const tipAmount = (b * t) / 100;
    const total = b + tipAmount;
    return { tipAmount, total, perPerson: total / p };
  };

  const result = calc();

  return (
    <ToolWrapper
      title="Tip Calculator"
      description="Calculate tip and split bill"
      category="calculator"
      categoryName="Calculator"
      onCopy={() => `Bill: $${bill}\nTip: ${tip}%\nTotal: $${result.total.toFixed(2)}\nPer Person: $${result.perPerson.toFixed(2)}`}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Bill Amount" value={bill} onChange={(e) => setBill(e.target.value)} type="number" fullWidth />
            <TextField label="Tip %" value={tip} onChange={(e) => setTip(e.target.value)} type="number" fullWidth />
            <TextField label="Split Between" value={people} onChange={(e) => setPeople(e.target.value)} type="number" fullWidth />
          </Stack>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <div>
              <Typography variant="body2" color="text.secondary">Tip Amount</Typography>
              <Typography variant="h5">${result.tipAmount.toFixed(2)}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Total</Typography>
              <Typography variant="h4">${result.total.toFixed(2)}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Per Person</Typography>
              <Typography variant="h5">${result.perPerson.toFixed(2)}</Typography>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
