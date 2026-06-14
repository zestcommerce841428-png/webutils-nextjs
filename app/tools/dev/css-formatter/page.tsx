'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import {
  Code as CodeIcon,
  Compress as CompressIcon,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type FormatMode = 'format' | 'minify';

export default function CSSFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<FormatMode>('format');
  const [error, setError] = useState('');

  const formatCSS = (css: string): string => {
    // Basic CSS formatting
    const formatted = css
      // Remove all existing whitespace
      .replace(/\s+/g, ' ')
      // Add newline after {
      .replace(/\{/g, ' {\n  ')
      // Add newline after ;
      .replace(/;/g, ';\n  ')
      // Add newline and remove extra spaces before }
      .replace(/\}/g, '\n}\n\n')
      // Remove trailing spaces
      .replace(/\s+$/gm, '')
      // Remove leading spaces from closing braces
      .replace(/^\s+\}/gm, '}')
      // Fix multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      // Trim start and end
      .trim();

    return formatted;
  };

  const minifyCSS = (css: string): string => {
    // Basic CSS minification
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove whitespace around { } : ; ,
      .replace(/\s*([{}:;,])\s*/g, '$1')
      // Remove unnecessary spaces
      .replace(/\s+/g, ' ')
      // Remove spaces around > + ~ operators
      .replace(/\s*([>+~])\s*/g, '$1')
      // Trim
      .trim();
  };

  const handleProcess = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter CSS code');
      return;
    }

    try {
      const result = mode === 'format' ? formatCSS(input) : minifyCSS(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing CSS');
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

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: FormatMode | null) => {
    if (newMode) {
      setMode(newMode);
      if (input) {
        setTimeout(() => handleProcess(), 0);
      }
    }
  };

  return (
    <ToolWrapper
      title="CSS Formatter / Minifier"
      description="Format or minify CSS code with proper indentation and line breaks."
      category="dev"
      categoryName="Developer Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Mode Selection */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="subtitle1">Mode:</Typography>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                size="small"
              >
                <ToggleButton value="format">
                  <CodeIcon sx={{ mr: 1 }} />
                  Format
                </ToggleButton>
                <ToggleButton value="minify">
                  <CompressIcon sx={{ mr: 1 }} />
                  Minify
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant="contained"
                onClick={handleProcess}
                disabled={!input.trim()}
              >
                {mode === 'format' ? 'Format' : 'Minify'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input CSS
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter CSS code here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Output CSS
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={output}
              placeholder="Formatted/minified CSS will appear here..."
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

        {/* Stats */}
        {output && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statistics
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Original Size
                  </Typography>
                  <Typography variant="h6">
                    {input.length.toLocaleString()} bytes
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {mode === 'format' ? 'Formatted' : 'Minified'} Size
                  </Typography>
                  <Typography variant="h6">
                    {output.length.toLocaleString()} bytes
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {mode === 'format' ? 'Size Change' : 'Reduction'}
                  </Typography>
                  <Typography variant="h6" color={mode === 'minify' && output.length < input.length ? 'success.main' : 'text.primary'}>
                    {((output.length - input.length) / input.length * 100).toFixed(1)}%
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
              <li><strong>Format:</strong> Adds proper indentation and line breaks for readability</li>
              <li><strong>Minify:</strong> Removes unnecessary whitespace and comments to reduce file size</li>
              <li>Preserves CSS functionality while improving formatting</li>
              <li>Perfect for cleaning up messy CSS code</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
