'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Box, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function CharacterCounterPage() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
  };

  return (
    <ToolWrapper
      title="Character Counter"
      description="Count characters, words, lines, and more"
      category="text"
      categoryName="Text Tools"
      onCopy={() => JSON.stringify(stats, null, 2)}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={10}
            fullWidth
            placeholder="Type or paste your text here..."
            sx={{ fontFamily: 'monospace' }}
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Characters</Typography>
              <Typography variant="h5">{stats.characters}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Characters (no spaces)</Typography>
              <Typography variant="h5">{stats.charactersNoSpaces}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Words</Typography>
              <Typography variant="h5">{stats.words}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Lines</Typography>
              <Typography variant="h5">{stats.lines}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Paragraphs</Typography>
              <Typography variant="h5">{stats.paragraphs}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Sentences</Typography>
              <Typography variant="h5">{stats.sentences}</Typography>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
