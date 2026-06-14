'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function UrlShortenerSimulatorPage() {
  const [url, setUrl] = useState('');

  const shorten = () => {
    if (!url) return '';
    const hash = btoa(url).slice(0, 8);
    return `https://short.url/${hash}`;
  };

  return (
    <ToolWrapper
      title="URL Shortener Simulator"
      description="Simulate URL shortening (demo only)"
      category="network"
      categoryName="Network Tools"
      onCopy={() => shorten()}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            placeholder="https://example.com/very/long/url..."
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Short URL (Simulated)"
            value={shorten()}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
