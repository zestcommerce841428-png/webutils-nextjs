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

export default function SQLFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<FormatMode>('format');
  const [error, setError] = useState('');

  const formatSQL = (sql: string): string => {
    // Keywords to uppercase and format
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
      'HAVING', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'CREATE TABLE',
      'ALTER TABLE', 'DROP TABLE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'INNER JOIN', 'OUTER JOIN', 'ON', 'AS', 'DISTINCT', 'UNION',
      'VALUES', 'SET', 'LIMIT', 'OFFSET', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
      'NOT', 'NULL', 'IS', 'LIKE', 'IN', 'BETWEEN', 'EXISTS'
    ];

    let formatted = sql
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Uppercase keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword);
    });

    // Add line breaks
    formatted = formatted
      .replace(/\bSELECT\b/g, '\nSELECT\n  ')
      .replace(/\bFROM\b/g, '\nFROM\n  ')
      .replace(/\bWHERE\b/g, '\nWHERE\n  ')
      .replace(/\bAND\b/g, '\n  AND ')
      .replace(/\bOR\b/g, '\n  OR ')
      .replace(/\bORDER BY\b/g, '\nORDER BY\n  ')
      .replace(/\bGROUP BY\b/g, '\nGROUP BY\n  ')
      .replace(/\bHAVING\b/g, '\nHAVING\n  ')
      .replace(/\bLEFT JOIN\b/g, '\nLEFT JOIN\n  ')
      .replace(/\bRIGHT JOIN\b/g, '\nRIGHT JOIN\n  ')
      .replace(/\bINNER JOIN\b/g, '\nINNER JOIN\n  ')
      .replace(/\bJOIN\b/g, '\nJOIN\n  ')
      .replace(/\bON\b/g, '\n  ON ')
      .replace(/\bINSERT INTO\b/g, '\nINSERT INTO\n  ')
      .replace(/\bVALUES\b/g, '\nVALUES\n  ')
      .replace(/\bUPDATE\b/g, '\nUPDATE\n  ')
      .replace(/\bSET\b/g, '\nSET\n  ')
      .replace(/\bDELETE FROM\b/g, '\nDELETE FROM\n  ')
      .replace(/,/g, ',\n  ')
      .replace(/\(/g, '\n(\n  ')
      .replace(/\)/g, '\n)\n')
      // Clean up excess newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return formatted;
  };

  const minifySQL = (sql: string): string => {
    // Basic SQL minification
    return sql
      // Remove comments
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleProcess = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter SQL code');
      return;
    }

    try {
      const result = mode === 'format' ? formatSQL(input) : minifySQL(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing SQL');
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
      title="SQL Formatter / Minifier"
      description="Format or minify SQL queries with proper indentation and keyword highlighting."
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
              Input SQL
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter SQL query here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Output SQL
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={output}
              placeholder="Formatted/minified SQL will appear here..."
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
              <li><strong>Format:</strong> Adds proper indentation, line breaks, and uppercase keywords</li>
              <li><strong>Minify:</strong> Removes unnecessary whitespace and comments</li>
              <li>Improves SQL readability and maintainability</li>
              <li>Perfect for cleaning up complex queries</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
