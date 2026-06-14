'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  Chip,
} from '@mui/material';
import { QrCode2 as QrCodeIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState('200');

  const generate = () => {
    if (!text.trim()) {
      return;
    }

    // Using a free QR code API
    const encodedText = encodeURIComponent(text);
    const sizeNum = parseInt(size) || 200;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeNum}x${sizeNum}&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const download = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePaste = (pastedText: string) => {
    setText(pastedText);
  };

  const handleClear = () => {
    setText('');
    setQrCodeUrl('');
  };

  return (
    <ToolWrapper
      title="QR Code Generator"
      description="Generate QR codes from text, URLs, or any data with customizable size."
      category="generator"
      categoryName="Generators"
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or data to encode..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                label="Size (px)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                type="number"
                variant="outlined"
                size="small"
                sx={{ width: '120px' }}
                slotProps={{
                  htmlInput: {
                    min: 100,
                    max: 1000,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={generate}
                disabled={!text.trim()}
                startIcon={<QrCodeIcon />}
              >
                Generate QR Code
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                QR Code
              </Typography>
              <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={download}>
                    Download QR Code
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Common Uses:</strong>
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Website URLs" size="small" />
              <Chip label="WiFi Credentials" size="small" />
              <Chip label="Contact Information" size="small" />
              <Chip label="Product Info" size="small" />
              <Chip label="Event Details" size="small" />
              <Chip label="Payment Links" size="small" />
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
