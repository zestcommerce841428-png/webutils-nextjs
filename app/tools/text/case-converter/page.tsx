'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab'>('upper');

  const convert = () => {
    switch (mode) {
      case 'upper': return text.toUpperCase();
      case 'lower': return text.toLowerCase();
      case 'title': return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
      case 'camel': return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      case 'snake': return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
      case 'kebab': return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
  };

  return (
    <ToolWrapper
      title="Case Converter"
      description="Convert text between different cases"
      category="text"
      categoryName="Text Tools"
      onCopy={() => convert()}
    >
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="upper">UPPER</ToggleButton>
            <ToggleButton value="lower">lower</ToggleButton>
            <ToggleButton value="title">Title Case</ToggleButton>
            <ToggleButton value="sentence">Sentence case</ToggleButton>
            <ToggleButton value="camel">camelCase</ToggleButton>
            <ToggleButton value="snake">snake_case</ToggleButton>
            <ToggleButton value="kebab">kebab-case</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper sx={{ p: 3 }}>
          <TextField
            label="Input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={6}
            fullWidth
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <TextField
            label="Output"
            value={convert()}
            multiline
            rows={6}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
