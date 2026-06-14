'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function FindReplacePage() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');

  const doReplace = () => find ? text.replace(new RegExp(find, 'g'), replace) : text;

  return (
    <ToolWrapper
      title="Find & Replace"
      description="Find and replace text"
      category="text"
      categoryName="Text Tools"
      onCopy={() => doReplace()}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <TextField label="Find" value={find} onChange={(e) => setFind(e.target.value)} fullWidth />
          <TextField label="Replace" value={replace} onChange={(e) => setReplace(e.target.value)} fullWidth />
        </Stack>
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
            label="Output"
            value={doReplace()}
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
