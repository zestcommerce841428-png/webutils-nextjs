'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  CompareArrows as CompareArrowsIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  lineNumber?: number;
}

type DiffMode = 'line' | 'word' | 'char';

export default function TextDiffPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffMode, setDiffMode] = useState<DiffMode>('line');
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });

  // Helper functions for different diff modes
  const lineDiff = (t1: string, t2: string): DiffResult[] => {
    const lines1 = t1.split('\n');
    const lines2 = t2.split('\n');
    const result: DiffResult[] = [];

    // Simple line-by-line comparison
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= lines1.length) {
        result.push({ type: 'added', value: lines2[i], lineNumber: i + 1 });
      } else if (i >= lines2.length) {
        result.push({ type: 'removed', value: lines1[i], lineNumber: i + 1 });
      } else if (lines1[i] === lines2[i]) {
        result.push({ type: 'unchanged', value: lines1[i], lineNumber: i + 1 });
      } else {
        result.push({ type: 'removed', value: lines1[i], lineNumber: i + 1 });
        result.push({ type: 'added', value: lines2[i], lineNumber: i + 1 });
      }
    }

    return result;
  };

  const wordDiff = (t1: string, t2: string): DiffResult[] => {
    const words1 = t1.split(/\s+/);
    const words2 = t2.split(/\s+/);
    const result: DiffResult[] = [];

    const maxLen = Math.max(words1.length, words2.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= words1.length) {
        result.push({ type: 'added', value: words2[i] });
      } else if (i >= words2.length) {
        result.push({ type: 'removed', value: words1[i] });
      } else if (words1[i] === words2[i]) {
        result.push({ type: 'unchanged', value: words1[i] });
      } else {
        result.push({ type: 'removed', value: words1[i] });
        result.push({ type: 'added', value: words2[i] });
      }
    }

    return result;
  };

  const charDiff = (t1: string, t2: string): DiffResult[] => {
    const result: DiffResult[] = [];
    const maxLen = Math.max(t1.length, t2.length);

    for (let i = 0; i < maxLen; i++) {
      if (i >= t1.length) {
        result.push({ type: 'added', value: t2[i] });
      } else if (i >= t2.length) {
        result.push({ type: 'removed', value: t1[i] });
      } else if (t1[i] === t2[i]) {
        result.push({ type: 'unchanged', value: t1[i] });
      } else {
        result.push({ type: 'removed', value: t1[i] });
        result.push({ type: 'added', value: t2[i] });
      }
    }

    return result;
  };

  const calculateDiff = () => {
    let result: DiffResult[] = [];

    if (diffMode === 'line') {
      result = lineDiff(text1, text2);
    } else if (diffMode === 'word') {
      result = wordDiff(text1, text2);
    } else {
      result = charDiff(text1, text2);
    }

    setDiffResult(result);

    // Calculate statistics
    const added = result.filter(d => d.type === 'added').length;
    const removed = result.filter(d => d.type === 'removed').length;
    const unchanged = result.filter(d => d.type === 'unchanged').length;
    setStats({ added, removed, unchanged });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    calculateDiff();
  }, [text1, text2, diffMode]);

  const handleSwap = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const handleClear = () => {
    setText1('');
    setText2('');
  };

  const renderDiffLine = (diff: DiffResult, index: number) => {
    const bgColor =
      diff.type === 'added'
        ? 'rgba(46, 160, 67, 0.15)'
        : diff.type === 'removed'
        ? 'rgba(229, 83, 75, 0.15)'
        : 'transparent';

    const borderLeft =
      diff.type === 'added'
        ? '3px solid rgb(46, 160, 67)'
        : diff.type === 'removed'
        ? '3px solid rgb(229, 83, 75)'
        : '3px solid transparent';

    return (
      <Box
        key={index}
        sx={{
          p: 1,
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          bgcolor: bgColor,
          borderLeft: borderLeft,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          minHeight: '24px',
        }}
      >
        {diff.lineNumber && (
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              width: '40px',
              color: 'text.secondary',
              userSelect: 'none',
              mr: 2,
            }}
          >
            {diff.lineNumber}
          </Typography>
        )}
        {diff.type === 'added' && (
          <Typography component="span" sx={{ color: 'success.main', mr: 1 }}>
            +
          </Typography>
        )}
        {diff.type === 'removed' && (
          <Typography component="span" sx={{ color: 'error.main', mr: 1 }}>
            -
          </Typography>
        )}
        {diff.value || ' '}
      </Box>
    );
  };

  return (
    <ToolWrapper
      title="Text Diff / Compare"
      description="Compare two texts and highlight differences line by line, word by word, or character by character."
      category="text"
      categoryName="Text Tools"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Mode Selection */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="subtitle1">Compare Mode:</Typography>
              <ToggleButtonGroup
                value={diffMode}
                exclusive
                onChange={(_, value) => value && setDiffMode(value)}
                size="small"
              >
                <ToggleButton value="line">Line by Line</ToggleButton>
                <ToggleButton value="word">Word by Word</ToggleButton>
                <ToggleButton value="char">Character by Character</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Text Inputs */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="error">
              Original Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" color="success.main">
                Modified Text
              </Typography>
              <ToggleButton
                value="swap"
                selected={false}
                onChange={handleSwap}
                size="small"
                sx={{ border: 'none' }}
              >
                <SwapHorizIcon sx={{ mr: 0.5 }} />
                Swap
              </ToggleButton>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Statistics */}
        {(text1 || text2) && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <CompareArrowsIcon color="primary" />
                <Typography variant="subtitle1">Comparison Statistics:</Typography>
                <Chip
                  label={`${stats.added} Added`}
                  color="success"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`${stats.removed} Removed`}
                  color="error"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`${stats.unchanged} Unchanged`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Diff Result */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Comparison Result
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {diffResult.length === 0 ? (
              <Alert severity="info">
                Enter text in both fields to see the comparison.
              </Alert>
            ) : (
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: '500px',
                }}
              >
                {diffResult.map((diff, index) => renderDiffLine(diff, index))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Legend */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Color Legend:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>
                <span style={{ color: 'rgb(46, 160, 67)' }}>Green (+)</span> =
                Added in modified text
              </li>
              <li>
                <span style={{ color: 'rgb(229, 83, 75)' }}>Red (-)</span> =
                Removed from original text
              </li>
              <li>No color = Unchanged text</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
