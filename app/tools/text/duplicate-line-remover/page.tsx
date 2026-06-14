'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Alert,
  Chip,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function DuplicateLineRemoverPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const removeDuplicates = (text: string) => {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    
    setOutput(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length,
    });
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    if (text.trim()) {
      removeDuplicates(text);
    } else {
      setOutput('');
      setStats({ original: 0, unique: 0, removed: 0 });
    }
  };

  const handleCopy = () => {
    return output;
  };

  const handlePaste = (text: string) => {
    handleInputChange(text);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStats({ original: 0, unique: 0, removed: 0 });
  };

  return (
    <ToolWrapper
      title="Duplicate Line Remover"
      description="Remove duplicate lines from text while preserving the original order."
      category="text"
      categoryName="Text Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input (with duplicates)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={18}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
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
              Output (unique lines)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={18}
              value={output}
              placeholder="Unique lines will appear here..."
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

        {/* Statistics */}
        {output && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statistics
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Original Lines
                  </Typography>
                  <Typography variant="h6">
                    {stats.original}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Unique Lines
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {stats.unique}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Duplicates Removed
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {stats.removed}
                  </Typography>
                </Box>
              </Box>
              {stats.removed > 0 && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Removed {stats.removed} duplicate line{stats.removed !== 1 ? 's' : ''} (
                  {((stats.removed / stats.original) * 100).toFixed(1)}% reduction)
                </Alert>
              )}
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
              <li>Preserves the original order of lines</li>
              <li>Case-sensitive comparison</li>
              <li>Keeps the first occurrence of each line</li>
              <li>Empty lines are also deduplicated</li>
              <li>Perfect for cleaning up lists, logs, and data</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
