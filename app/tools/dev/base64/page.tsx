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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  LockOpen,
  Lock,
  Upload,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { saveStateToUrl, loadStateFromUrl } from '@/lib/utils/urlState';
import { readFileAsText, readFileAsDataURL } from '@/lib/utils/clipboard';

type Mode = 'encode' | 'decode';
type InputType = 'text' | 'file';

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>('encode');
  const [inputType, setInputType] = useState<InputType>('text');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const state = loadStateFromUrl<{ input?: string; mode?: Mode }>();
    if (state) {
      if (state.input) setInput(state.input);
      if (state.mode) setMode(state.mode);
    }
  }, []);

  const handleEncode = () => {
    setError('');
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      saveStateToUrl({ input, mode: 'encode' });
    } catch (err) {
      setError('Failed to encode. Make sure input is valid.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    setError('');
    try {
      const decoded = atob(input);
      setOutput(decoded);
      saveStateToUrl({ input, mode: 'decode' });
    } catch (err) {
      setError('Failed to decode. Invalid Base64 string.');
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    try {
      if (mode === 'encode') {
        // For encoding, read as data URL (includes base64)
        const dataUrl = await readFileAsDataURL(file);
        const base64 = dataUrl.split(',')[1]; // Remove data:*/*;base64, prefix
        setOutput(base64);
      } else {
        // For decoding, read as text
        const text = await readFileAsText(file);
        setInput(text);
      }
    } catch (err) {
      setError('Failed to read file.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolWrapper
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings, supports text and file input"
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
              <Lock sx={{ mr: 1 }} />
              Encode
            </ToggleButton>
            <ToggleButton value="decode">
              <LockOpen sx={{ mr: 1 }} />
              Decode
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="contained"
            onClick={handleProcess}
            disabled={!input.trim()}
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </Button>

          {mode === 'encode' && (
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          )}
        </Box>

        {/* Input Type Selection */}
        <FormControl>
          <FormLabel>Input Type:</FormLabel>
          <RadioGroup
            row
            value={inputType}
            onChange={(e) => setInputType(e.target.value as InputType)}
          >
            <FormControlLabel value="text" control={<Radio size="small" />} label="Text" />
            <FormControlLabel value="file" control={<Radio size="small" />} label="File" />
          </RadioGroup>
        </FormControl>

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
          {inputType === 'text' ? (
            <TextField
              multiline
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
              fullWidth
              sx={{
                '& textarea': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                },
              }}
            />
          ) : (
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
              }}
              component="label"
            >
              <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Click to upload file or drag and drop
              </Typography>
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Box>
          )}
        </Box>

        {/* Output */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Output:
          </Typography>
          <TextField
            multiline
            rows={8}
            value={output}
            placeholder={mode === 'encode' ? 'Base64 encoded result...' : 'Decoded text...'}
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
            <strong>About Base64:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Base64 is a binary-to-text encoding scheme</li>
            <li>Commonly used in data URLs, email attachments, and APIs</li>
            <li>Increases data size by approximately 33%</li>
            <li>Use Encode to convert text/files to Base64</li>
            <li>Use Decode to convert Base64 back to text</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
