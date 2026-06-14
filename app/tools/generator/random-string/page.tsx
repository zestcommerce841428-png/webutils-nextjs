'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function RandomStringPage() {
  const [length, setLength] = useState('32');
  const [result, setResult] = useState('');

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = parseInt(length) || 32;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };

  return (
    <ToolWrapper
      title="Random String Generator"
      description="Generate random alphanumeric strings"
      category="generator"
      categoryName="Generator"
      onCopy={() => result}
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
          <Button variant="contained" onClick={() => setResult(generate())}>
            Generate String
          </Button>
        </Paper>
        {result && (
          <Paper sx={{ p: 3 }}>
            <TextField
              value={result}
              fullWidth
              multiline
              rows={3}
              slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace' } } }}
            />
          </Paper>
        )}
      </Stack>
    </ToolWrapper>
  );
}
