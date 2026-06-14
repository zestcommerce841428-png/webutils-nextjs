'use client';

import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Typography,
} from '@mui/material';
import {
  Code,
  Compress,
  BugReport,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { saveStateToUrl, loadStateFromUrl } from '@/lib/utils/urlState';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indentSize, setIndentSize] = useState(2);

  // Load state from URL on mount
  useEffect(() => {
    const state = loadStateFromUrl<{ input?: string; mode?: 'format' | 'minify' }>();
    if (state) {
      if (state.input) setInput(state.input);
      if (state.mode) setMode(state.mode);
    }
  }, []);

  const handleFormat = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      saveStateToUrl({ input, mode: 'format' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const handleMinify = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      saveStateToUrl({ input, mode: 'minify' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const handleValidate = () => {
    setError('');
    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const handleProcess = () => {
    if (mode === 'format') {
      handleFormat();
    } else {
      handleMinify();
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolWrapper
      title="JSON Formatter"
      description="Format, minify, and validate JSON with syntax highlighting and error detection"
      category="dev"
      categoryName="开发工具"
      onCopy={() => output}
      onPaste={(text) => setInput(text)}
      onClear={handleClear}
      onShare={() => ({ input, mode })}
      enableShare
    >
      <Stack spacing={3}>
        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && setMode(newMode)}
            size="small"
          >
            <ToggleButton value="format">
              <Code sx={{ mr: 1 }} />
              Format
            </ToggleButton>
            <ToggleButton value="minify">
              <Compress sx={{ mr: 1 }} />
              Minify
            </ToggleButton>
          </ToggleButtonGroup>

          {mode === 'format' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Indent:</Typography>
              <ToggleButtonGroup
                value={indentSize}
                exclusive
                onChange={(_, size) => size && setIndentSize(size)}
                size="small"
              >
                <ToggleButton value={2}>2</ToggleButton>
                <ToggleButton value={4}>4</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleProcess}
            disabled={!input.trim()}
          >
            {mode === 'format' ? 'Format' : 'Minify'}
          </Button>

          <Button
            variant="outlined"
            startIcon={<BugReport />}
            onClick={handleValidate}
            disabled={!input.trim()}
          >
            Validate
          </Button>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Input */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Input JSON:
          </Typography>
          <TextField
            multiline
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "example", "value": 123}'
            fullWidth
            sx={{
              '& textarea': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>

        {/* Output */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Output:
          </Typography>
          <TextField
            multiline
            rows={12}
            value={output}
            placeholder="Formatted JSON will appear here..."
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              '& textarea': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>

        {/* Help Text */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Tips:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Paste or type JSON in the input field</li>
            <li>Use Format to beautify with proper indentation</li>
            <li>Use Minify to remove all whitespace</li>
            <li>Use Validate to check if JSON is valid</li>
            <li>Copy button copies the output to clipboard</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
