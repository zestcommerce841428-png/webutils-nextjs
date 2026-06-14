'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Typography } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function CreditCardValidatorPage() {
  const [card, setCard] = useState('');

  const luhnCheck = (num: string) => {
    const digits = num.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0 && digits.length >= 13;
  };

  const isValid = luhnCheck(card);

  return (
    <ToolWrapper
      title="Credit Card Validator"
      description="Validate credit card numbers (Luhn algorithm)"
      category="text"
      categoryName="Text Tools"
      onCopy={() => null}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Card Number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            fullWidth
            placeholder="1234 5678 9012 3456"
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ color: isValid ? 'success.main' : 'error.main' }}>
            {card ? (isValid ? '✓ Valid Card Number' : '✗ Invalid Card Number') : 'Enter a card number'}
          </Typography>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
