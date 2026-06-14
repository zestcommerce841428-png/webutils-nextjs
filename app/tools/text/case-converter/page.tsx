'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface CaseResult {
  original: string;
  camelCase: string;
  pascalCase: string;
  snakeCase: string;
  kebabCase: string;
  constantCase: string;
  titleCase: string;
  dotCase: string;
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CaseResult>({
    original: '',
    camelCase: '',
    pascalCase: '',
    snakeCase: '',
    kebabCase: '',
    constantCase: '',
    titleCase: '',
    dotCase: '',
  });

  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')
      .replace(/[-_]/g, '');
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '')
      .replace(/[-_]/g, '');
  };

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/\s+/g, '_')
      .replace(/-/g, '_')
      .replace(/__+/g, '_')
      .replace(/^_/, '')
      .toLowerCase();
  };

  const toKebabCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '-$1')
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-/, '')
      .toLowerCase();
  };

  const toConstantCase = (str: string): string => {
    return toSnakeCase(str).toUpperCase();
  };

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s|[-_])\w/g, (match) => match.toUpperCase())
      .replace(/[-_]/g, ' ');
  };

  const toDotCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '.$1')
      .replace(/\s+/g, '.')
      .replace(/[-_]/g, '.')
      .replace(/\.\.+/g, '.')
      .replace(/^\./, '')
      .toLowerCase();
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    
    if (text.trim()) {
      setResult({
        original: text,
        camelCase: toCamelCase(text),
        pascalCase: toPascalCase(text),
        snakeCase: toSnakeCase(text),
        kebabCase: toKebabCase(text),
        constantCase: toConstantCase(text),
        titleCase: toTitleCase(text),
        dotCase: toDotCase(text),
      });
    } else {
      setResult({
        original: '',
        camelCase: '',
        pascalCase: '',
        snakeCase: '',
        kebabCase: '',
        constantCase: '',
        titleCase: '',
        dotCase: '',
      });
    }
  };

  const handlePaste = (text: string) => {
    handleInputChange(text);
  };

  const handleClear = () => {
    setInput('');
    setResult({
      original: '',
      camelCase: '',
      pascalCase: '',
      snakeCase: '',
      kebabCase: '',
      constantCase: '',
      titleCase: '',
      dotCase: '',
    });
  };

  return (
    <ToolWrapper
      title="Case Converter"
      description="Convert text between different naming conventions: camelCase, snake_case, kebab-case, and more."
      category="text"
      categoryName="Text Tools"
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
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter text to convert..."
              variant="outlined"
              sx={{ fontFamily: 'monospace' }}
            />
          </Paper>
        </Grid>

        {/* Results */}
        {input.trim() && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  camelCase
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.camelCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  PascalCase
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.pascalCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  snake_case
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.snakeCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  kebab-case
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.kebabCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  CONSTANT_CASE
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.constantCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Title Case
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.titleCase}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  dot.case
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {result.dotCase}
                </Typography>
              </Paper>
            </Grid>
          </>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Common Use Cases:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
              <li><strong>camelCase:</strong> JavaScript variables, Java methods</li>
              <li><strong>PascalCase:</strong> Class names, React components</li>
              <li><strong>snake_case:</strong> Python variables, database columns</li>
              <li><strong>kebab-case:</strong> CSS classes, URLs</li>
              <li><strong>CONSTANT_CASE:</strong> Constants, environment variables</li>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
