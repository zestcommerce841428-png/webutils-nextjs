'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TextReverserPage() {
  const [text, setText] = useState('');

  const reverse = () => text.split('').reverse().join('');
  const reverseWords = () => text.split(' ').reverse().join(' ');
  const reverseLines = () => text.split('\n').reverse().join('\n');

  return (
    <ToolWrapper
      title="Text Reverser"
      description="Reverse text, words, or lines"
      category="text"
      categoryName="Text Tools"
      onCopy={() => reverse()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={8}
            fullWidth
          />
        </Paper>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => setText(reverse())}>Reverse Characters</Button>
          <Button variant="outlined" onClick={() => setText(reverseWords())}>Reverse Words</Button>
          <Button variant="outlined" onClick={() => setText(reverseLines())}>Reverse Lines</Button>
        </Stack>
      </Stack>
    </ToolWrapper>
  );
}
