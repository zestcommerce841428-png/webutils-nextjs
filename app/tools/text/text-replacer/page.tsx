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
import { SwapVert as SwapVertIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TextReplacerPage() {
  const [input, setInput] = useState('');
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [output, setOutput] = useState('');
  const [matchCount, setMatchCount] = useState(0);

  const handleReplace = (replaceAll: boolean) => {
    if (!searchText) {
      return;
    }

    let result: string;
    let count = 0;

    if (replaceAll) {
      const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = input.replace(regex, () => {
        count++;
        return replaceText;
      });
    } else {
      result = input.replace(searchText, replaceText);
      count = input.includes(searchText) ? 1 : 0;
    }

    setOutput(result);
    setMatchCount(count);
  };

  const handleCopy = () => {
    return output;
  };

  const handlePaste = (text: string) => {
    setInput(text);
  };

  const handleClear = () => {
    setInput('');
    setSearchText('');
    setReplaceText('');
    setOutput('');
    setMatchCount(0);
  };

  return (
    <ToolWrapper
      title="Text Replacer"
      description="Find and replace text with support for single or multiple replacements."
      category="text"
      categoryName="Text Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Search & Replace Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  label="Find"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Enter text to find..."
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  label="Replace with"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Enter replacement text..."
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleReplace(false)}
                    disabled={!input || !searchText}
                    fullWidth
                  >
                    Replace
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReplace(true)}
                    disabled={!input || !searchText}
                    fullWidth
                  >
                    All
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {matchCount > 0 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Replaced {matchCount} occurrence{matchCount !== 1 ? 's' : ''}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Original Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={16}
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
              Result
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={16}
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
              <strong>Features:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li><strong>Replace:</strong> Replace first occurrence</li>
              <li><strong>Replace All:</strong> Replace all occurrences</li>
              <li>Case-sensitive matching</li>
              <li>Simple text find and replace (not regex)</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
