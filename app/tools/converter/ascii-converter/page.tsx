'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function ASCIIConverterPage() {
  const [text, setText] = useState('Hello');

  const toASCII = () => text.split('').map(c => c.charCodeAt(0)).join(' ');
  const fromASCII = (ascii: string) => {
    try {
      return ascii.split(' ').map(n => String.fromCharCode(parseInt(n))).join('');
    } catch {
      return '';
    }
  };

  return (
    <ToolWrapper
      title="ASCII Converter"
      description="Convert text to/from ASCII codes"
      category="converter"
      categoryName="Converter"
      onCopy={() => toASCII()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" gutterBottom>Text</Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" gutterBottom>ASCII Codes</Typography>
          <TextField
            value={toASCII()}
            fullWidth
            multiline
            rows={3}
            slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace' } } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
