'use client';

import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Badge,
} from '@mui/material';
import { CheckCircle, Schedule } from '@mui/icons-material';
import Link from 'next/link';

interface ToolCardProps {
  name: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  path: string;
  keywords?: string;
  isCompleted?: boolean;
}

// List of completed tools (31 total - Day 1 Complete!)
const completedTools = [
  'tools/dev/json-formatter.html',
  'tools/dev/base64.html',
  'tools/dev/url-codec.html',
  'tools/dev/hash-generator.html',
  'tools/dev/uuid-generator.html',
  'tools/dev/color-converter.html',
  'tools/dev/timestamp.html',
  'tools/dev/regex-tester.html',
  'tools/dev/css-formatter.html',
  'tools/dev/sql-formatter.html',
  'tools/dev/markdown-preview.html',
  'tools/dev/html-entity.html',
  'tools/dev/number-base-converter.html',
  'tools/dev/ip-subnet-calculator.html',
  'tools/generator/password-generator.html',
  'tools/generator/random-number-generator.html',
  'tools/generator/qr-code-generator.html',
  'tools/text/lorem-ipsum.html',
  'tools/text/word-counter.html',
  'tools/text/text-diff.html',
  'tools/text/case-converter.html',
  'tools/text/string-escaper.html',
  'tools/text/text-sorter.html',
  'tools/text/text-replacer.html',
  'tools/text/text-to-speech.html',
  'tools/text/slug-generator.html',
  'tools/text/duplicate-line-remover.html',
  'tools/converter/file-size-converter.html',
  'tools/converter/percentage-calculator.html',
  'tools/converter/temperature-converter.html',
  'tools/converter/time-converter.html',
];

export default function ToolCard({
  name,
  category,
  categoryIcon,
  categoryColor,
  path,
  keywords,
}: ToolCardProps) {
  // Convert path to route: tools/dev/json-formatter.html -> /tools/dev/json-formatter
  const route = path.replace('.html', '');
  
  // Check if tool is completed
  const isCompleted = completedTools.includes(path);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        opacity: isCompleted ? 1 : 0.7,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/${route}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, position: 'relative' }}>
            <Typography variant="h5" component="span" sx={{ mr: 1 }}>
              {categoryIcon}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
              {name}
            </Typography>
            {isCompleted ? (
              <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
            ) : (
              <Schedule sx={{ color: 'warning.main', fontSize: 20 }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: `${categoryColor}.100`,
                color: `${categoryColor}.800`,
              }}
            />
            <Chip
              label={isCompleted ? 'Available' : 'Coming Soon'}
              size="small"
              color={isCompleted ? 'success' : 'warning'}
              variant="outlined"
            />
          </Box>

          {keywords && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {keywords.split(' ').slice(0, 4).join(', ')}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
