'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Alert,
  Chip,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface Match {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({
    g: true,  // global
    i: false, // case insensitive
    m: false, // multiline
    s: false, // dotAll
    u: false, // unicode
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const testRegex = () => {
    // Reset state
    setMatches([]);
    setError('');
    setIsValid(null);

    if (!pattern) {
      return;
    }

    try {
      // Build flags string
      const flagsStr = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');

      // Create regex
      const regex = new RegExp(pattern, flagsStr);
      setIsValid(true);

      if (!testString) {
        return;
      }

      // Find all matches
      const matchesArr: Match[] = [];
      
      if (flags.g) {
        // Global flag: find all matches
        let match;
        const globalRegex = new RegExp(pattern, flagsStr);
        while ((match = globalRegex.exec(testString)) !== null) {
          matchesArr.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          
          // Prevent infinite loop for zero-width matches
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++;
          }
        }
      } else {
        // Non-global: find first match only
        const match = regex.exec(testString);
        if (match) {
          matchesArr.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(matchesArr);
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    testRegex();
  }, [pattern, testString, flags]);

  const handleFlagChange = (flag: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleClear = () => {
    setPattern('');
    setTestString('');
  };

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    const parts: React.ReactElement[] = [];
    let lastIndex = 0;

    matches.forEach((match, idx) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>
            {testString.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add highlighted match
      parts.push(
        <span
          key={`match-${idx}`}
          style={{
            backgroundColor: 'rgba(255, 193, 7, 0.3)',
            fontWeight: 'bold',
            borderRadius: '2px',
            padding: '0 2px',
          }}
        >
          {match.match}
        </span>
      );

      lastIndex = match.index + match.match.length;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push(<span key="text-end">{testString.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <ToolWrapper
      title="Regex Tester"
      description="Test and debug regular expressions with real-time matching and detailed results."
      category="dev"
      categoryName="Developer Tools"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Pattern Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Regular Expression Pattern
            </Typography>
            <TextField
              fullWidth
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g., \d+|[a-z]+)"
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
              error={isValid === false}
              helperText={error}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
              {isValid !== null && (
                <>
                  {isValid ? (
                    <Chip
                      icon={<CheckCircle />}
                      label="Valid Pattern"
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<Cancel />}
                      label="Invalid Pattern"
                      color="error"
                      size="small"
                    />
                  )}
                </>
              )}
              {matches.length > 0 && (
                <Chip
                  label={`${matches.length} Match${matches.length !== 1 ? 'es' : ''}`}
                  color="primary"
                  size="small"
                />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Flags */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Flags
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.g}
                    onChange={() => handleFlagChange('g')}
                  />
                }
                label="g (global)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.i}
                    onChange={() => handleFlagChange('i')}
                  />
                }
                label="i (case insensitive)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.m}
                    onChange={() => handleFlagChange('m')}
                  />
                }
                label="m (multiline)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.s}
                    onChange={() => handleFlagChange('s')}
                  />
                }
                label="s (dotAll)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.u}
                    onChange={() => handleFlagChange('u')}
                  />
                }
                label="u (unicode)"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Test String */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Test String
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against the regex pattern..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Highlighted Result */}
        {testString && isValid && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Highlighted Matches
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  minHeight: '100px',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {highlightMatches()}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Match Details */}
        {matches.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Match Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>#</strong></TableCell>
                      <TableCell><strong>Match</strong></TableCell>
                      <TableCell><strong>Index</strong></TableCell>
                      <TableCell><strong>Captured Groups</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matches.map((match, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {match.match}
                        </TableCell>
                        <TableCell>{match.index}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {match.groups.length > 0
                            ? match.groups.map((g, i) => (
                                <Chip
                                  key={i}
                                  label={`$${i + 1}: ${g || '(empty)'}`}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))
                            : '(none)'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Common Regex Patterns:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li><code>\d</code> - Any digit (0-9)</li>
              <li><code>\w</code> - Any word character (a-z, A-Z, 0-9, _)</li>
              <li><code>\s</code> - Any whitespace character</li>
              <li><code>.</code> - Any character except newline</li>
              <li><code>*</code> - 0 or more times</li>
              <li><code>+</code> - 1 or more times</li>
              <li><code>?</code> - 0 or 1 time</li>
              <li><code>{'[abc]'}</code> - Any character in set</li>
              <li><code>(pattern)</code> - Capture group</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
