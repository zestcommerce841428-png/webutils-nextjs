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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Link as LinkIcon,
  LinkOff,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { saveStateToUrl, loadStateFromUrl } from '@/lib/utils/urlState';

type Mode = 'encode' | 'decode';

export default function UrlCodecPage() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [encodeComponent, setEncodeComponent] = useState(true);

  useEffect(() => {
    const state = loadStateFromUrl<{ input?: string; mode?: Mode }>();
    if (state?.input) setInput(state.input);
    if (state?.mode) setMode(state.mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEncode = () => {
    setError('');
    try {
      const encoded = encodeComponent
        ? encodeURIComponent(input)
        : encodeURI(input);
      setOutput(encoded);
      saveStateToUrl({ input, mode: 'encode' });
    } catch (err) {
      setError('Failed to encode URL');
      setOutput('');
    }
  };

  const handleDecode = () => {
    setError('');
    try {
      const decoded = encodeComponent
        ? decodeURIComponent(input)
        : decodeURI(input);
      setOutput(decoded);
      saveStateToUrl({ input, mode: 'decode' });
    } catch (err) {
      setError('Failed to decode URL. Invalid URL encoding.');
      setOutput('');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolWrapper
      title="URL Encoder/Decoder"
      description="Encode and decode URLs and URL components with support for special characters"
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
            <ToggleButton value="encode">
              <LinkIcon sx={{ mr: 1 }} />
              Encode
            </ToggleButton>
            <ToggleButton value="decode">
              <LinkOff sx={{ mr: 1 }} />
              Decode
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControlLabel
            control={
              <Checkbox
                checked={encodeComponent}
                onChange={(e) => setEncodeComponent(e.target.checked)}
                size="small"
              />
            }
            label="Component mode (recommended)"
          />

          <Button
            variant="contained"
            onClick={handleProcess}
            disabled={!input.trim()}
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
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
            Input:
          </Typography>
          <TextField
            multiline
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter URL or text to encode...'
                : 'Enter encoded URL to decode...'
            }
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
            rows={6}
            value={output}
            placeholder={
              mode === 'encode'
                ? 'Encoded URL will appear here...'
                : 'Decoded URL will appear here...'
            }
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
                wordBreak: 'break-all',
              },
            }}
          />
        </Box>

        {/* Help Text */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>URL Encoding:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>
              <strong>Component mode:</strong> Use encodeURIComponent() - encodes all special
              characters except: <code>A-Z a-z 0-9 - _ . ! ~ * ' ( )</code>
            </li>
            <li>
              <strong>Full URL mode:</strong> Use encodeURI() - preserves URL structure characters
              like <code>: / ? # [ ] @</code>
            </li>
            <li>Component mode is recommended for query parameters and path segments</li>
            <li>Full URL mode is better for complete URLs</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
