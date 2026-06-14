'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button, Checkbox, FormControlLabel } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function RandomPasswordPage() {
  const [length, setLength] = useState('16');
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (options.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) return '';
    
    const len = parseInt(length) || 16;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  return (
    <ToolWrapper
      title="Random Password Generator"
      description="Generate secure random passwords"
      category="generator"
      categoryName="Generator"
      onCopy={() => password}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Stack>
            <FormControlLabel
              control={<Checkbox checked={options.upper} onChange={(e) => setOptions({...options, upper: e.target.checked})} />}
              label="Uppercase (A-Z)"
            />
            <FormControlLabel
              control={<Checkbox checked={options.lower} onChange={(e) => setOptions({...options, lower: e.target.checked})} />}
              label="Lowercase (a-z)"
            />
            <FormControlLabel
              control={<Checkbox checked={options.numbers} onChange={(e) => setOptions({...options, numbers: e.target.checked})} />}
              label="Numbers (0-9)"
            />
            <FormControlLabel
              control={<Checkbox checked={options.symbols} onChange={(e) => setOptions({...options, symbols: e.target.checked})} />}
              label="Symbols (!@#$...)"
            />
          </Stack>
          <Button variant="contained" onClick={() => setPassword(generate())} sx={{ mt: 2 }}>
            Generate Password
          </Button>
        </Paper>
        {password && (
          <Paper sx={{ p: 3 }}>
            <TextField
              value={password}
              fullWidth
              slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' } } }}
            />
          </Paper>
        )}
      </Stack>
    </ToolWrapper>
  );
}
