'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function ROT13Page() {
  const [text, setText] = useState('');

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  return (
    <ToolWrapper
      title="ROT13 Encoder/Decoder"
      description="ROT13 cipher encoding and decoding"
      category="converter"
      categoryName="Converter"
      onCopy={() => rot13(text)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={8}
            fullWidth
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="ROT13 Output"
            value={rot13(text)}
            multiline
            rows={8}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
