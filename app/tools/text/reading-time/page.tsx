'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function ReadingTimePage() {
  const [text, setText] = useState('');

  const calculate = () => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const wpm = 200; // average reading speed
    const minutes = Math.ceil(words / wpm);
    return { words, minutes };
  };

  const result = calculate();

  return (
    <ToolWrapper
      title="Reading Time Calculator"
      description="Estimate reading time for text"
      category="text"
      categoryName="Text Tools"
      onCopy={() => `Words: ${result.words}\nReading Time: ${result.minutes} min`}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={12}
            fullWidth
            placeholder="Paste your text here..."
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <div>
              <Typography variant="body2" color="text.secondary">Word Count</Typography>
              <Typography variant="h4">{result.words}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Reading Time (200 WPM)</Typography>
              <Typography variant="h4">{result.minutes} min</Typography>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
