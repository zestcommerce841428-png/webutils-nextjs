'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import {
  Construction,
  Home,
  Schedule,
  ArrowBack,
} from '@mui/icons-material';
import Link from 'next/link';

export default function ComingSoonPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Log which tool was attempted to access
    const path = window.location.pathname;
    console.log('Coming Soon page for:', path);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Construction sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Coming Soon
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
          This tool is currently under development
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Chip
            icon={<Schedule />}
            label="Migration in Progress"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1rem',
              py: 2.5,
              px: 1,
            }}
          />
        </Box>
        
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
          We&apos;re migrating 1000+ tools to this new platform. This tool will be available soon!
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Go Back
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<Home />}
            component={Link}
            href="/"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Browse Available Tools
          </Button>
        </Stack>
      </Paper>

      {/* Info Section */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Currently Available Tools
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          We&apos;ve already migrated the following development tools:
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {[
            'JSON Formatter',
            'Base64 Encoder',
            'URL Encoder',
            'Hash Generator',
            'UUID Generator',
            'Color Converter',
          ].map((tool) => (
            <Chip
              key={tool}
              label={tool}
              color="success"
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          <strong>Migration Progress:</strong> 6 / 1000+ tools (0.6%)
        </Typography>
        <Typography variant="caption" color="text.secondary">
          New tools are being added daily!
        </Typography>
      </Box>
    </Container>
  );
}
