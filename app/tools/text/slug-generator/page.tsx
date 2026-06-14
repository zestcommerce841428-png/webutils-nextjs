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
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    if (text.trim()) {
      setSlug(generateSlug(text));
    } else {
      setSlug('');
    }
  };

  const handleCopy = () => {
    return slug;
  };

  const handlePaste = (text: string) => {
    handleInputChange(text);
  };

  const handleClear = () => {
    setInput('');
    setSlug('');
  };

  return (
    <ToolWrapper
      title="URL Slug Generator"
      description="Convert text into URL-friendly slugs for websites, blog posts, and SEO."
      category="text"
      categoryName="Text Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter title or text to convert to URL slug..."
              variant="outlined"
            />
          </Paper>
        </Grid>

        {/* Output */}
        {slug && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'success.50' }}>
              <Typography variant="h6" gutterBottom color="success.main">
                Generated Slug
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: 'success.main',
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  wordBreak: 'break-all',
                }}
              >
                {slug}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Chip
                  label={`${slug.length} characters`}
                  size="small"
                  color="primary"
                />
                <Chip
                  label={slug.includes('-') ? `${slug.split('-').length} words` : '1 word'}
                  size="small"
                  color="primary"
                />
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Examples */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Example Transformations
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip label="My Blog Post Title" size="small" />
                <Typography>→</Typography>
                <Chip label="my-blog-post-title" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip label="Hello World!" size="small" />
                <Typography>→</Typography>
                <Chip label="hello-world" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip label="Best SEO Practices 2024" size="small" />
                <Typography>→</Typography>
                <Chip label="best-seo-practices-2024" size="small" color="success" />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>URL Slug Best Practices:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li>Use lowercase letters</li>
              <li>Replace spaces with hyphens (-)</li>
              <li>Remove special characters</li>
              <li>Keep it short and descriptive</li>
              <li>Use keywords for better SEO</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
