'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import { AccessTime, Refresh } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { copyToClipboard } from '@/lib/utils/clipboard';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');
  const [error, setError] = useState('');

  const handleToDate = () => {
    setError('');
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setError('Invalid timestamp');
        return;
      }
      
      // Auto-detect if timestamp is in seconds or milliseconds
      const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
      setDatetime(date.toISOString());
    } catch (err) {
      setError('Failed to convert timestamp');
    }
  };

  const handleToTimestamp = () => {
    setError('');
    try {
      const date = new Date(datetime);
      if (isNaN(date.getTime())) {
        setError('Invalid date format');
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (err) {
      setError('Failed to convert date');
    }
  };

  const handleCurrentTime = () => {
    const now = new Date();
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
    setDatetime(now.toISOString());
    setError('');
  };

  const handleClear = () => {
    setTimestamp('');
    setDatetime('');
    setError('');
  };

  const handleProcess = () => {
    if (mode === 'toDate') {
      handleToDate();
    } else {
      handleToTimestamp();
    }
  };

  return (
    <ToolWrapper
      title="Timestamp Converter"
      description="Convert between Unix timestamp and human-readable date/time"
      category="dev"
      categoryName="开发工具"
      onCopy={() => mode === 'toDate' ? datetime : timestamp}
      onPaste={(text) => mode === 'toDate' ? setTimestamp(text) : setDatetime(text)}
      onClear={handleClear}
      enableShare
    >
      <Stack spacing={3}>
        {/* Current Time Button */}
        <Button
          variant="contained"
          startIcon={<AccessTime />}
          onClick={handleCurrentTime}
          size="large"
        >
          Current Time
        </Button>

        {/* Mode Selection */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Conversion Mode:
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
            fullWidth
          >
            <ToggleButton value="toDate">
              Timestamp → Date
            </ToggleButton>
            <ToggleButton value="toTimestamp">
              Date → Timestamp
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {mode === 'toDate' ? (
          <>
            {/* Timestamp Input */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Unix Timestamp (seconds or milliseconds):
              </Typography>
              <TextField
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="1234567890"
                fullWidth
                type="number"
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleToDate}
              disabled={!timestamp}
            >
              Convert to Date
            </Button>

            {/* Date Output */}
            {datetime && (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Date & Time (ISO 8601):
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}
                >
                  {datetime}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                  Local Time:
                </Typography>
                <Typography variant="body1">
                  {new Date(datetime).toLocaleString()}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                  UTC:
                </Typography>
                <Typography variant="body1">
                  {new Date(datetime).toUTCString()}
                </Typography>
              </Paper>
            )}
          </>
        ) : (
          <>
            {/* Date Input */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Date & Time:
              </Typography>
              <TextField
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                placeholder="2024-01-01T12:00:00Z"
                fullWidth
                type="datetime-local"
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleToTimestamp}
              disabled={!datetime}
            >
              Convert to Timestamp
            </Button>

            {/* Timestamp Output */}
            {timestamp && (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Unix Timestamp (seconds):
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: 'monospace', flexGrow: 1 }}
                  >
                    {timestamp}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => copyToClipboard(timestamp)}
                  >
                    Copy
                  </Button>
                </Box>
                <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                  Milliseconds:
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {parseInt(timestamp) * 1000}
                </Typography>
              </Paper>
            )}
          </>
        )}

        {/* Info */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>About Unix Timestamp:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Unix time: seconds since Jan 1, 1970 00:00:00 UTC</li>
            <li>Commonly used in databases and APIs</li>
            <li>Supports both seconds and milliseconds</li>
            <li>ISO 8601 format recommended for readability</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
