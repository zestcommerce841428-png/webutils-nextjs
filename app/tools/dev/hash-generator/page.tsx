'use client';

import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Alert,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { Calculate, Upload } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { saveStateToUrl, loadStateFromUrl } from '@/lib/utils/urlState';
import { readFileAsText } from '@/lib/utils/clipboard';

// Simple hash implementations (for demo - in production use crypto-js or native crypto API)
const simpleHash = async (text: string, algorithm: string): Promise<string> => {
  if (typeof window === 'undefined') return '';
  
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Use Web Crypto API
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

interface HashResult {
  md5?: string;
  sha1?: string;
  sha256?: string;
  sha512?: string;
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<HashResult>({});
  const [error, setError] = useState('');
  const [algorithms, setAlgorithms] = useState({
    // md5: true,  // MD5 not supported by Web Crypto API
    sha1: true,
    sha256: true,
    sha512: true,
  });

  useEffect(() => {
    const state = loadStateFromUrl<{ input?: string }>();
    if (state?.input) setInput(state.input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async () => {
    setError('');
    setResults({});
    
    if (!input.trim()) {
      setError('Please enter text to hash');
      return;
    }
    
    try {
      const newResults: HashResult = {};
      
      // Note: MD5 is not supported by Web Crypto API
      // Would need crypto-js library for MD5
      
      if (algorithms.sha1) {
        newResults.sha1 = await simpleHash(input, 'SHA-1');
      }
      
      if (algorithms.sha256) {
        newResults.sha256 = await simpleHash(input, 'SHA-256');
      }
      
      if (algorithms.sha512) {
        newResults.sha512 = await simpleHash(input, 'SHA-512');
      }
      
      setResults(newResults);
      saveStateToUrl({ input });
    } catch (err) {
      setError('Failed to generate hash');
      console.error(err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    try {
      const text = await readFileAsText(file);
      setInput(text);
    } catch (err) {
      setError('Failed to read file');
    }
  };

  const handleClear = () => {
    setInput('');
    setResults({});
    setError('');
  };

  const handleToggleAlgorithm = (algo: keyof typeof algorithms) => {
    setAlgorithms(prev => ({ ...prev, [algo]: !prev[algo] }));
  };

  const copyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolWrapper
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text and files"
      category="dev"
      categoryName="开发工具"
      onPaste={(text) => setInput(text)}
      onClear={handleClear}
      onShare={() => ({ input })}
      enableShare
    >
      <Stack spacing={3}>
        {/* Algorithm Selection */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Select Hash Algorithms:
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={algorithms.sha1}
                  onChange={() => handleToggleAlgorithm('sha1')}
                  size="small"
                />
              }
              label="SHA-1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={algorithms.sha256}
                  onChange={() => handleToggleAlgorithm('sha256')}
                  size="small"
                />
              }
              label="SHA-256"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={algorithms.sha512}
                  onChange={() => handleToggleAlgorithm('sha512')}
                  size="small"
                />
              }
              label="SHA-512"
            />
          </FormGroup>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Calculate />}
            onClick={handleGenerate}
            disabled={!input.trim()}
          >
            Generate Hashes
          </Button>

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
            Input Text:
          </Typography>
          <TextField
            multiline
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            fullWidth
            sx={{
              '& textarea': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Hash Results:
            </Typography>
            <Stack spacing={2}>
              {results.sha1 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    SHA-1:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        flexGrow: 1,
                      }}
                    >
                      {results.sha1}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => copyHash(results.sha1!)}
                    >
                      Copy
                    </Button>
                  </Box>
                </Paper>
              )}

              {results.sha256 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    SHA-256:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        flexGrow: 1,
                      }}
                    >
                      {results.sha256}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => copyHash(results.sha256!)}
                    >
                      Copy
                    </Button>
                  </Box>
                </Paper>
              )}

              {results.sha512 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    SHA-512:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        flexGrow: 1,
                      }}
                    >
                      {results.sha512}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => copyHash(results.sha512!)}
                    >
                      Copy
                    </Button>
                  </Box>
                </Paper>
              )}
            </Stack>
          </Box>
        )}

        {/* Help Text */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>About Hash Functions:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li><strong>SHA-1:</strong> 160-bit hash (less secure, use for compatibility)</li>
            <li><strong>SHA-256:</strong> 256-bit hash (recommended for most uses)</li>
            <li><strong>SHA-512:</strong> 512-bit hash (highest security)</li>
            <li>Hashes are one-way - cannot be reversed</li>
            <li>Same input always produces same hash</li>
            <li>Used for file integrity, password storage, digital signatures</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
