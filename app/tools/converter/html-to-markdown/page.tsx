'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function HTMLToMarkdownPage() {
  const [input, setInput] = useState(`<h1>Hello World</h1>
<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<a href="https://example.com">Link</a>`);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'simple' | 'strict'>('simple');

  const htmlToMarkdown = (html: string, strict: boolean = false): string => {
    let markdown = html;

    // Headers
    markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
    markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
    markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
    markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
    markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
    markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

    // Bold
    markdown = markdown.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');

    // Italic
    markdown = markdown.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');

    // Strike
    markdown = markdown.replace(/<(del|s|strike)[^>]*>(.*?)<\/(del|s|strike)>/gi, '~~$2~~');

    // Code
    markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

    // Pre/Code blocks
    markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
    markdown = markdown.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n\n');

    // Links
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    // Images
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

    // Lists
    markdown = markdown.replace(/<ul[^>]*>/gi, '');
    markdown = markdown.replace(/<\/ul>/gi, '\n');
    markdown = markdown.replace(/<ol[^>]*>/gi, '');
    markdown = markdown.replace(/<\/ol>/gi, '\n');
    markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '* $1\n');

    // Blockquote
    markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, content) => {
      return content
        .trim()
        .split('\n')
        .map((line: string) => '> ' + line)
        .join('\n') + '\n\n';
    });

    // Horizontal rule
    markdown = markdown.replace(/<hr[^>]*\/?>/gi, '\n---\n\n');

    // Line breaks
    markdown = markdown.replace(/<br[^>]*\/?>/gi, '\n');

    // Paragraphs
    markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

    // Divs
    markdown = markdown.replace(/<div[^>]*>(.*?)<\/div>/gi, '$1\n\n');

    // Remove remaining HTML tags if strict mode
    if (strict) {
      markdown = markdown.replace(/<[^>]+>/g, '');
    }

    // Clean up whitespace
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    markdown = markdown.trim();

    return markdown;
  };

  React.useEffect(() => {
    try {
      const result = htmlToMarkdown(input, mode === 'strict');
      setOutput(result);
    } catch (error) {
      setOutput('Error converting HTML to Markdown');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  const handleCopy = () => output || null;

  return (
    <ToolWrapper
      title="HTML to Markdown Converter"
      description="Convert HTML code to Markdown format"
      category="converter"
      categoryName="Converter"
      onCopy={handleCopy}
    >
      <Stack spacing={3}>
        <Box>
          <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, val) => val && setMode(val)}
              color="primary"
            >
              <ToggleButton value="simple">Simple (Keep Unknown Tags)</ToggleButton>
              <ToggleButton value="strict">Strict (Remove All Tags)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              HTML Input
            </Typography>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              multiline
              rows={20}
              fullWidth
              placeholder="Enter HTML..."
              sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
            />
          </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Markdown Output
            </Typography>
            <TextField
              value={output}
              multiline
              rows={20}
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                  sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                },
              }}
            />
          </Paper>
          </Box>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Supported Elements:</strong> Headings (h1-h6), Bold, Italic, Strike, Code, Links, Images, Lists (ul/ol), Blockquotes, Horizontal Rules, Line Breaks, Paragraphs
        </Typography>
      </Alert>
    </ToolWrapper>
  );
}
