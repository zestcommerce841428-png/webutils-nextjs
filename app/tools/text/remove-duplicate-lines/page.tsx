'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function RemoveDuplicateLinesPage() {
  const [text, setText] = useState('');

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const unique = [...new Set(lines)];
    return unique.join('\n');
  };

  return (
    <ToolWrapper
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from text"
      category="text"
      categoryName="Text Tools"
      onCopy={() => removeDuplicates()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={10}
            fullWidth
            placeholder="Enter text with duplicate lines..."
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <TextField
            label="Output (Duplicates Removed)"
            value={removeDuplicates()}
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
