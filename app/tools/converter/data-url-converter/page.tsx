'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { copyToClipboard } from '@/lib/utils/clipboard';

export default function DataURLConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dataURL, setDataURL] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [decodedInfo, setDecodedInfo] = useState<{
    mimeType: string;
    size: number;
    data: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDataURL(result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDataURLDecode = (url: string) => {
    try {
      // Parse data URL: data:[<mediatype>][;base64],<data>
      const matches = url.match(/^data:([^;]+)?;base64,(.+)$/);
      if (!matches) {
        setDecodedInfo(null);
        return;
      }

      const mimeType = matches[1] || 'text/plain';
      const base64Data = matches[2];
      const binaryString = atob(base64Data);
      const size = binaryString.length;

      setDecodedInfo({
        mimeType,
        size,
        data: base64Data.substring(0, 100) + (base64Data.length > 100 ? '...' : ''),
      });
    } catch (error) {
      setDecodedInfo(null);
    }
  };

  const handleDataURLInput = (value: string) => {
    setDataURL(value);
    if (value.startsWith('data:')) {
      handleDataURLDecode(value);
    }
  };

  const downloadFromDataURL = () => {
    if (!dataURL) return;

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = file?.name || 'download';
    link.click();
  };

  const handleCopy = () => {
    if (mode === 'encode' && dataURL) {
      return dataURL;
    }
    if (mode === 'decode' && decodedInfo) {
      return `MIME Type: ${decodedInfo.mimeType}\nSize: ${decodedInfo.size} bytes`;
    }
    return null;
  };

  return (
    <ToolWrapper
      title="Data URL Converter"
      description="Convert files to Data URL (Base64) and decode Data URLs"
      category="converter"
      categoryName="Converter"
      onCopy={handleCopy}
    >
      <Stack spacing={3}>
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant={mode === 'encode' ? 'contained' : 'outlined'}
              onClick={() => setMode('encode')}
            >
              Encode to Data URL
            </Button>
            <Button
              variant={mode === 'decode' ? 'contained' : 'outlined'}
              onClick={() => setMode('decode')}
            >
              Decode Data URL
            </Button>
          </Box>
        </Box>

        {mode === 'encode' ? (
          <>
            <Box>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Upload File
                </Typography>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'block', marginBottom: 16 }}
                />
                {file && (
                  <Box sx={{ mt: 2 }}>
                    <Chip label={`File: ${file.name}`} />
                    <Chip label={`Type: ${file.type}`} sx={{ ml: 1 }} />
                    <Chip label={`Size: ${(file.size / 1024).toFixed(2)} KB`} sx={{ ml: 1 }} />
                  </Box>
                )}
              </Paper>
            </Box>

            {dataURL && (
              <Box>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Data URL Result
                    </Typography>
                    <Button
                      startIcon={<ContentCopyIcon />}
                      onClick={() => copyToClipboard(dataURL)}
                      size="small"
                    >
                      Copy
                    </Button>
                  </Box>
                  <TextField
                    value={dataURL}
                    multiline
                    rows={6}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                        sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                      },
                    }}
                  />
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Data URL Size: {(dataURL.length / 1024).toFixed(2)} KB
                    </Typography>
                  </Alert>
                </Paper>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Paste Data URL
                </Typography>
                <TextField
                  value={dataURL}
                  onChange={(e) => handleDataURLInput(e.target.value)}
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="data:image/png;base64,iVBORw0KG..."
                  sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                />
              </Paper>
            </Box>

            {decodedInfo && (
              <Box>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Decoded Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        MIME Type:
                      </Typography>
                      <Typography variant="body1">
                        {decodedInfo.mimeType}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Size:
                      </Typography>
                      <Typography variant="body1">
                        {(decodedInfo.size / 1024).toFixed(2)} KB ({decodedInfo.size} bytes)
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={downloadFromDataURL}
                      sx={{ mt: 1 }}
                    >
                      Download File
                    </Button>
                  </Box>
                </Paper>
              </Box>
            )}
          </>
        )}
      </Stack>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> Data URLs encode files as Base64 strings. Large files will create very long URLs. Best for small images, icons, and assets.
        </Typography>
      </Alert>
    </ToolWrapper>
  );
}
