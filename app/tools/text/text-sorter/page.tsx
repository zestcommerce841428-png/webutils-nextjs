'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TextSorterPage() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'asc' | 'desc' | 'length' | 'reverse'>('asc');

  const sort = () => {
    const lines = text.split('\n');
    switch (mode) {
      case 'asc': return lines.sort((a, b) => a.localeCompare(b)).join('\n');
      case 'desc': return lines.sort((a, b) => b.localeCompare(a)).join('\n');
      case 'length': return lines.sort((a, b) => a.length - b.length).join('\n');
      case 'reverse': return lines.reverse().join('\n');
    }
  };

  return (
    <ToolWrapper
      title="Text Sorter"
      description="Sort lines of text in various ways"
      category="text"
      categoryName="Text Tools"
      onCopy={() => sort()}
    >
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
            <ToggleButton value="asc">A→Z</ToggleButton>
            <ToggleButton value="desc">Z→A</ToggleButton>
            <ToggleButton value="length">By Length</ToggleButton>
            <ToggleButton value="reverse">Reverse</ToggleButton>
          </ToggleButtonGroup>
        </Box>

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
            label="Sorted Output"
            value={sort()}
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
