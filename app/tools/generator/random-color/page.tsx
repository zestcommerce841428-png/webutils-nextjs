'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function RandomColorPage() {
  const [color, setColor] = useState('#3498db');

  const generate = () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return hex;
  };

  return (
    <ToolWrapper
      title="Random Color Generator"
      description="Generate random colors"
      category="generator"
      categoryName="Generator"
      onCopy={() => color}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Button variant="contained" onClick={() => setColor(generate())} fullWidth>
            Generate Random Color
          </Button>
        </Paper>
        <Paper sx={{ p: 3, backgroundColor: color, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
            <TextField
              value={color}
              slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold' } } }}
            />
          </div>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
