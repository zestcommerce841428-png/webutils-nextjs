'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function LineNumbererPage() {
  const [text, setText] = useState('');

  const addNumbers = () => text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');

  return (
    <ToolWrapper
      title="Line Numberer"
      description="Add line numbers to text"
      category="text"
      categoryName="Text Tools"
      onCopy={() => addNumbers()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={12}
            fullWidth
          />
        </Paper>
        <Button variant="contained" onClick={() => setText(addNumbers())}>Add Line Numbers</Button>
      </Stack>
    </ToolWrapper>
  );
}
