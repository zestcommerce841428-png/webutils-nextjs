'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function DateDiffCalculatorPage() {
  const [date1, setDate1] = useState('2024-01-01');
  const [date2, setDate2] = useState('2024-12-31');

  const diff = () => {
    const d1 = new Date(date1).getTime();
    const d2 = new Date(date2).getTime();
    const diffMs = Math.abs(d2 - d1);
    return {
      days: Math.floor(diffMs / (24 * 60 * 60 * 1000)),
      hours: Math.floor(diffMs / (60 * 60 * 1000)),
      minutes: Math.floor(diffMs / (60 * 1000)),
      seconds: Math.floor(diffMs / 1000),
    };
  };

  const result = diff();

  return (
    <ToolWrapper
      title="Date Difference Calculator"
      description="Calculate difference between two dates"
      category="calculator"
      categoryName="Calculator"
      onCopy={() => JSON.stringify(result, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Start Date" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} fullWidth />
            <TextField label="End Date" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} fullWidth />
          </Stack>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Difference</Typography>
          <Stack spacing={1}>
            <Typography>Days: <strong>{result.days}</strong></Typography>
            <Typography>Hours: <strong>{result.hours?.toLocaleString()}</strong></Typography>
            <Typography>Minutes: <strong>{result.minutes?.toLocaleString()}</strong></Typography>
            <Typography>Seconds: <strong>{result.seconds?.toLocaleString()}</strong></Typography>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
