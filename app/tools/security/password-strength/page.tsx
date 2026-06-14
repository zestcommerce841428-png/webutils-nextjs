'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');

  const checkStrength = () => {
    const len = password.length;
    let score = 0;
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.min(score, 5)];
    const color = ['error', 'error', 'warning', 'info', 'success', 'success'][Math.min(score, 5)];
    return { strength, score, color };
  };

  const result = checkStrength();

  return (
    <ToolWrapper
      title="Password Strength Checker"
      description="Check password strength"
      category="security"
      categoryName="Security Tools"
      onCopy={() => null}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <p>Strength: <strong>{result.strength}</strong></p>
          <p>Score: {result.score}/6</p>
          <p>✓ Length ≥ 8 characters</p>
          <p>✓ Contains lowercase</p>
          <p>✓ Contains uppercase</p>
          <p>✓ Contains numbers</p>
          <p>✓ Contains special characters</p>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
