'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Typography, Paper, Stack, Box } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [age, setAge] = useState<any>({});

  useEffect(() => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diff = now.getTime() - birth.getTime();
    
    const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
    const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor(diff / (60 * 1000));
    
    setAge({ years, months, weeks, days, hours, minutes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthDate]);

  return (
    <ToolWrapper
      title="Age Calculator"
      description="Calculate age from birth date"
      category="calculator"
      categoryName="Calculator"
      onCopy={() => JSON.stringify(age, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Birth Date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            fullWidth
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Your Age</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
            <div>
              <Typography variant="body2" color="text.secondary">Years</Typography>
              <Typography variant="h5">{age.years || 0}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Months</Typography>
              <Typography variant="h5">{age.months || 0}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Weeks</Typography>
              <Typography variant="h5">{age.weeks || 0}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Days</Typography>
              <Typography variant="h5">{age.days || 0}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Hours</Typography>
              <Typography variant="h5">{age.hours?.toLocaleString() || 0}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Minutes</Typography>
              <Typography variant="h5">{age.minutes?.toLocaleString() || 0}</Typography>
            </div>
          </Box>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
