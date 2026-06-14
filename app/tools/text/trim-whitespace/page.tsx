'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TrimWhitespacePage() {
  const [text, setText] = useState('');

  const trim = () => text.split('\n').map(line => line.trim()).join('\n');

  return (
    <ToolWrapper
      title="Trim Whitespace"
      description="Remove leading and trailing whitespace"
      category="text"
      categoryName="Text Tools"
      onCopy={() => trim()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={10}
            fullWidth
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Trimmed Output"
            value={trim()}
            multiline
            rows={10}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
