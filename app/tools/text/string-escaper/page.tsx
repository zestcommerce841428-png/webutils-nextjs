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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type Operation = 'escape' | 'unescape';

export default function StringEscaperPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<Operation>('escape');

  const escapeString = (str: string): string => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\f/g, '\\f')
      .replace(/\v/g, '\\v')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  };

  const unescapeString = (str: string): string => {
    return str
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\f/g, '\f')
      .replace(/\\v/g, '\v')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  };

  const handleProcess = () => {
    const result = operation === 'escape' ? escapeString(input) : unescapeString(input);
    setOutput(result);
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
      title="String Escaper / Unescaper"
      description="Escape or unescape special characters in strings for programming."
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
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Operation</InputLabel>
                <Select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as Operation)}
                  label="Operation"
                  size="small"
                >
                  <MenuItem value="escape">Escape</MenuItem>
                  <MenuItem value="unescape">Unescape</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleProcess}
                disabled={!input}
                startIcon={<CopyIcon />}
              >
                {operation === 'escape' ? 'Escape' : 'Unescape'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
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
              rows={15}
              value={output}
              placeholder="Result will appear here..."
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

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Escape Sequences:</strong>
            </Typography>
            <Box sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \n → New line
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \t → Tab
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \r → Carriage return
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \\ → Backslash
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \' → Single quote
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  \" → Double quote
                </Grid>
              </Grid>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
