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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type Operation = 'encode' | 'decode';

export default function HTMLEntityPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<Operation>('encode');
  const [error, setError] = useState('');

  const encodeHTMLEntities = (text: string): string => {
    const entityMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };

    return text.replace(/[&<>"'/]/g, (char) => entityMap[char] || char);
  };

  const decodeHTMLEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const handleProcess = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter text');
      return;
    }

    try {
      const result = operation === 'encode'
        ? encodeHTMLEntities(input)
        : decodeHTMLEntities(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing text');
    }
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
    setError('');
  };

  return (
    <ToolWrapper
      title="HTML Entity Encoder/Decoder"
      description="Convert special characters to HTML entities and vice versa."
      category="dev"
      categoryName="Developer Tools"
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
                  <MenuItem value="encode">Encode</MenuItem>
                  <MenuItem value="decode">Decode</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleProcess}
                disabled={!input.trim()}
                startIcon={<CalculateIcon />}
              >
                {operation === 'encode' ? 'Encode' : 'Decode'}
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

        {/* Error */}
        {error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Common HTML Entities:</strong>
            </Typography>
            <Box sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  &amp; → &amp;amp;
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  &lt; → &amp;lt;
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  &gt; → &amp;gt;
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  &quot; → &amp;quot;
                </Grid>
              </Grid>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
