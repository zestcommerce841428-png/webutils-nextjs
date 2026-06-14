'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number; // in minutes
  speakingTime: number; // in minutes
}

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<Stats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  const calculateStats = (input: string) => {
    // Characters
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;

    // Words (split by whitespace and filter empty strings)
    const wordsArray = input.trim().split(/\s+/).filter(word => word.length > 0);
    const words = input.trim() === '' ? 0 : wordsArray.length;

    // Sentences (split by .!?)
    const sentencesArray = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentences = sentencesArray.length;

    // Paragraphs (split by double newline or more)
    const paragraphsArray = input.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphs = input.trim() === '' ? 0 : paragraphsArray.length;

    // Lines (split by newline)
    const linesArray = input.split(/\n/);
    const lines = input.trim() === '' ? 0 : linesArray.length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(words / 130);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    calculateStats(text);
  }, [text]);

  const handleCopy = () => {
    return text;
  };

  const handlePaste = (pastedText: string) => {
    setText(pastedText);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <ToolWrapper
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs. Calculate reading and speaking time."
      category="text"
      categoryName="Text Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input Area */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Text Input
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              {/* Basic Stats */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Characters
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.characters.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Characters (no spaces)
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.charactersNoSpaces.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Words
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.words.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Sentences
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.sentences.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Paragraphs
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.paragraphs.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Lines
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stats.lines.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Time Estimates */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ bgcolor: 'primary.50' }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      📖 Reading Time
                    </Typography>
                    <Typography variant="h5" component="div">
                      {stats.readingTime === 0 ? '< 1' : stats.readingTime} min
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Based on 200 words/min
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ bgcolor: 'success.50' }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      🎤 Speaking Time
                    </Typography>
                    <Typography variant="h5" component="div">
                      {stats.speakingTime === 0 ? '< 1' : stats.speakingTime} min
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Based on 130 words/min
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Calculation Details:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>Words are counted by splitting text on whitespace</li>
              <li>Sentences are counted by detecting periods, exclamation marks, and question marks</li>
              <li>Paragraphs are separated by empty lines (double line breaks)</li>
              <li>Reading time assumes 200 words per minute (average adult reading speed)</li>
              <li>Speaking time assumes 130 words per minute (average speaking speed)</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
