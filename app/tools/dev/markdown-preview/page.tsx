'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import {
  Code as CodeIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type ViewMode = 'edit' | 'preview';

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState('# Welcome to Markdown Preview\n\nStart typing in **Markdown** and see the _live preview_!\n\n## Features\n\n- **Bold** and *italic* text\n- Lists and checklists\n- [Links](https://example.com)\n- Code blocks\n- And more!\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const handleCopy = () => {
    return input;
  };

  const handlePaste = (text: string) => {
    setInput(text);
  };

  const handleClear = () => {
    setInput('');
  };

  const convertMarkdownToHTML = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto;"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: monospace;">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #1976d2; text-decoration: none;">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');

    // Unordered lists
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*<\/li>)/g, '<ul style="margin: 12px 0; padding-left: 24px;">$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^&gt; (.+)$/gim, '<blockquote style="border-left: 4px solid #ddd; margin: 12px 0; padding-left: 16px; color: #666;">$1</blockquote>');
    html = html.replace(/^> (.+)$/gim, '<blockquote style="border-left: 4px solid #ddd; margin: 12px 0; padding-left: 16px; color: #666;">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p style="margin: 12px 0;">');
    html = html.replace(/\n/g, '<br />');

    // Wrap in paragraphs
    html = `<div style="line-height: 1.6;"><p style="margin: 12px 0;">${html}</p></div>`;

    return html;
  };

  return (
    <ToolWrapper
      title="Markdown Preview"
      description="Write Markdown and see the rendered HTML preview in real-time."
      category="dev"
      categoryName="Developer Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* View Mode Toggle */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="subtitle1">View:</Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, value) => value && setViewMode(value)}
                size="small"
              >
                <ToggleButton value="edit">
                  <CodeIcon sx={{ mr: 1 }} />
                  Edit
                </ToggleButton>
                <ToggleButton value="preview">
                  <VisibilityIcon sx={{ mr: 1 }} />
                  Preview
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Editor & Preview */}
        {viewMode === 'edit' ? (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Markdown Editor
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={24}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Markdown here..."
                variant="outlined"
                sx={{ fontFamily: 'monospace' }}
              />
            </Paper>
          </Grid>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Box
                sx={{
                  p: 3,
                  minHeight: '500px',
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  '& h1': { fontSize: '2rem', fontWeight: 700, mt: 2, mb: 1 },
                  '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 2, mb: 1 },
                  '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
                  '& pre': { overflow: 'auto' },
                  '& code': { fontSize: '0.9em' },
                  '& ul, & ol': { my: 1.5 },
                  '& li': { my: 0.5 },
                }}
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(input) }}
              />
            </Paper>
          </Grid>
        )}

        {/* Markdown Cheatsheet */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Markdown Syntax Cheatsheet:</strong>
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  <li># Heading 1</li>
                  <li>## Heading 2</li>
                  <li>**Bold text**</li>
                  <li>*Italic text*</li>
                  <li>~~Strikethrough~~</li>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  <li>`Inline code`</li>
                  <li>[Link](url)</li>
                  <li>- Bullet list</li>
                  <li>1. Numbered list</li>
                  <li>&gt; Blockquote</li>
                </Box>
              </Grid>
            </Grid>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
