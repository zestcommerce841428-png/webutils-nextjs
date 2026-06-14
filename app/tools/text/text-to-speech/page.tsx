'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function TextToSpeechPage() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (!text.trim()) return;

    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handlePaste = (pastedText: string) => {
    setText(pastedText);
  };

  const handleClear = () => {
    setText('');
    stop();
  };

  return (
    <ToolWrapper
      title="Text to Speech"
      description="Convert text to speech using browser's built-in speech synthesis."
      category="text"
      categoryName="Text Tools"
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Text to Speak
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              variant="outlined"
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <button
                onClick={speak}
                disabled={!text.trim() || isPlaying}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: text.trim() && !isPlaying ? 'pointer' : 'not-allowed',
                  backgroundColor: text.trim() && !isPlaying ? '#1976d2' : '#ccc',
                  color: 'white',
                }}
              >
                {isPlaying ? 'Speaking...' : 'Speak'}
              </button>
              <button
                onClick={stop}
                disabled={!isPlaying}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isPlaying ? 'pointer' : 'not-allowed',
                  backgroundColor: isPlaying ? '#d32f2f' : '#ccc',
                  color: 'white',
                }}
              >
                Stop
              </button>
            </Box>
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Note:</strong> This tool uses your browser&apos;s built-in Text-to-Speech API.
              The voice, accent, and quality depend on your browser and operating system.
            </Typography>
          </Alert>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Alert severity="success">
            <Typography variant="body2">
              <strong>Features:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>Works offline (no internet required)</li>
              <li>Completely free and private</li>
              <li>No data sent to external servers</li>
              <li>Supports multiple languages (depends on browser)</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
