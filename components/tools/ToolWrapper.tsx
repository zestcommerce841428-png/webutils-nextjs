'use client';

import { ReactNode, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Stack,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  ContentCopy,
  ContentPaste,
  Clear,
  Share,
  Home,
} from '@mui/icons-material';
import Link from 'next/link';
import { copyToClipboard, readFromClipboard } from '@/lib/utils/clipboard';
import { generateShareUrl } from '@/lib/utils/urlState';

interface ToolWrapperProps {
  title: string;
  description: string;
  category: string;
  categoryName: string;
  children: ReactNode;
  onCopy?: () => string | null;
  onPaste?: (text: string) => void;
  onClear?: () => void;
  onShare?: () => unknown;
  enableUrlState?: boolean;
  enableShare?: boolean;
}

export default function ToolWrapper({
  title,
  description,
  category,
  categoryName,
  children,
  onCopy,
  onPaste,
  onClear,
  onShare,
  enableShare = true,
}: ToolWrapperProps) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCopy = async () => {
    if (!onCopy) return;
    const content = onCopy();
    if (!content) {
      setSnackbar({
        open: true,
        message: 'No content to copy',
        severity: 'info',
      });
      return;
    }
    const success = await copyToClipboard(content);
    setSnackbar({
      open: true,
      message: success ? 'Copied to clipboard!' : 'Failed to copy',
      severity: success ? 'success' : 'error',
    });
  };

  const handlePaste = async () => {
    if (!onPaste) return;
    const text = await readFromClipboard();
    if (text) {
      onPaste(text);
      setSnackbar({
        open: true,
        message: 'Pasted from clipboard!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to read clipboard',
        severity: 'error',
      });
    }
  };

  const handleShare = async () => {
    if (!enableShare) return;
    const state = onShare ? onShare() : {};
    const url = generateShareUrl(state);
    const success = await copyToClipboard(url);
    setSnackbar({
      open: true,
      message: success ? 'Share link copied!' : 'Failed to copy share link',
      severity: success ? 'success' : 'error',
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink
          component={Link}
          href="/"
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href={`/?category=${category}`}
          color="inherit"
          underline="hover"
        >
          {categoryName}
        </MuiLink>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Chip
          label={categoryName}
          size="small"
          color="primary"
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, gap: 1, flexWrap: 'wrap' }}>
        {onCopy && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopy />}
            onClick={handleCopy}
          >
            Copy
          </Button>
        )}
        {onPaste && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentPaste />}
            onClick={handlePaste}
          >
            Paste
          </Button>
        )}
        {onClear && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<Clear />}
            onClick={onClear}
            color="secondary"
          >
            Clear
          </Button>
        )}
        {enableShare && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<Share />}
            onClick={handleShare}
          >
            Share
          </Button>
        )}
      </Stack>

      {/* Tool Content */}
      <Paper elevation={2} sx={{ p: 3 }}>
        {children}
      </Paper>

      {/* Privacy Notice */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          🔒 <strong>Privacy First:</strong> All processing happens in your browser.
          Your data never leaves your device.
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
