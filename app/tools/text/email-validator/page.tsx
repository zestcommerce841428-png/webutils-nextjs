'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function EmailValidatorPage() {
  const [email, setEmail] = useState('');

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValid = validate();

  return (
    <ToolWrapper
      title="Email Validator"
      description="Validate email addresses"
      category="text"
      categoryName="Text Tools"
      onCopy={() => null}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            type="email"
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isValid ? 'green' : 'red' }}>
            {email ? (isValid ? '✓ Valid Email' : '✗ Invalid Email') : 'Enter an email to validate'}
          </p>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
