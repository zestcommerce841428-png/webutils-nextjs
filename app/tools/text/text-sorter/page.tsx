'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { Shuffle as ShuffleIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TextSorterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSort = (mode: 'asc' | 'desc' | 'random' | 'reverse' | 'unique') => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    let sorted: string[];

    switch (mode) {
      case 'asc':
        sorted = [...lines].sort((a, b) => a.localeCompare(b));
        break;
      case 'desc':
        sorted = [...lines].sort((a, b) => b.localeCompare(a));
        break;
      case 'random':
        sorted = [...lines].sort(() => Math.random() - 0.5);
        break;
      case 'reverse':
        sorted = [...lines].reverse();
        break;
      case 'unique':
        sorted = [...new Set(lines)];
        break;
      default:
        sorted = lines;
    }

    setOutput(sorted.join('\n'));
  };

  const handleCopy = () => {
    return output;
  };

  const handlePaste = (text: string) => {
    setInput(text);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolWrapper
      title="Text Sorter"
      description="Sort lines of text alphabetically, reverse order, randomly, or remove duplicates."
      category="text"
      categoryName="Text Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => handleSort('asc')}
                disabled={!input.trim()}
              >
                Sort A-Z
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSort('desc')}
                disabled={!input.trim()}
              >
                Sort Z-A
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSort('random')}
                disabled={!input.trim()}
                startIcon={<ShuffleIcon />}
              >
                Random
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSort('reverse')}
                disabled={!input.trim()}
              >
                Reverse
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSort('unique')}
                disabled={!input.trim()}
              >
                Remove Duplicates
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input (one line per item)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={18}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here (one item per line)..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Output
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={18}
              value={output}
              placeholder="Sorted text will appear here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Stats */}
        {output && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Input Lines
                  </Typography>
                  <Typography variant="h6">
                    {input.split('\n').filter(l => l.trim()).length}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Output Lines
                  </Typography>
                  <Typography variant="h6">
                    {output.split('\n').filter(l => l.trim()).length}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Features:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li><strong>Sort A-Z:</strong> Alphabetical order (ascending)</li>
              <li><strong>Sort Z-A:</strong> Reverse alphabetical order (descending)</li>
              <li><strong>Random:</strong> Shuffle lines randomly</li>
              <li><strong>Reverse:</strong> Reverse the current order</li>
              <li><strong>Remove Duplicates:</strong> Keep only unique lines</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
