'use client';

import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} WebUtils. All tools run 100% in your browser.
            Your data never leaves your device.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink
              component={Link}
              href="/about"
              color="text.secondary"
              underline="hover"
            >
              About
            </MuiLink>
            <MuiLink
              component={Link}
              href="/privacy"
              color="text.secondary"
              underline="hover"
            >
              Privacy
            </MuiLink>
            <MuiLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
            >
              GitHub
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
