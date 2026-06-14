'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function MorseCodePage() {
  const [text, setText] = useState('');

  const morseCode: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const toMorse = () => {
    return text.toUpperCase().split('').map(c => morseCode[c] || c).join(' ');
  };

  return (
    <ToolWrapper
      title="Morse Code Translator"
      description="Convert text to Morse code"
      category="converter"
      categoryName="Converter"
      onCopy={() => toMorse()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Morse Code"
            value={toMorse()}
            fullWidth
            multiline
            rows={4}
            slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.2rem' } } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
