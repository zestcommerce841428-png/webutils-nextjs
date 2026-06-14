'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function BinaryTextPage() {
  const [text, setText] = useState('Hello');

  const toBinary = () => {
    return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  return (
    <ToolWrapper
      title="Binary Text Converter"
      description="Convert text to binary"
      category="converter"
      categoryName="Converter"
      onCopy={() => toBinary()}
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
            label="Binary"
            value={toBinary()}
            fullWidth
            multiline
            rows={4}
            slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace' } } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
