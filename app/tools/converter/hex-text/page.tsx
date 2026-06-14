'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function HexTextPage() {
  const [text, setText] = useState('Hello');

  const toHex = () => {
    return text.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(' ');
  };

  return (
    <ToolWrapper
      title="Hex Text Converter"
      description="Convert text to hexadecimal"
      category="converter"
      categoryName="Converter"
      onCopy={() => toHex()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Hexadecimal"
            value={toHex()}
            fullWidth
            multiline
            rows={4}
            slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem' } } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
