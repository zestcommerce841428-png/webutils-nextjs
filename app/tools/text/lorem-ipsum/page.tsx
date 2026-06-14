'use client';

import { useState } from 'react';
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Article, Refresh } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

type GenerateType = 'paragraphs' | 'sentences' | 'words';

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
];

export default function LoremIpsumPage() {
  const [type, setType] = useState<GenerateType>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-15 words
    const words = Array.from({ length: wordCount }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-7 sentences
    const sentences = Array.from({ length: sentenceCount }, generateSentence);
    return sentences.join(' ');
  };

  const handleGenerate = () => {
    let result = '';
    
    if (type === 'words') {
      const words = Array.from({ length: count }, generateWord);
      result = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, generateSentence);
      result = sentences.join(' ');
    } else {
      const paragraphs = Array.from({ length: count }, generateParagraph);
      result = paragraphs.join('\n\n');
    }
    
    setOutput(result);
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <ToolWrapper
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and mockups"
      category="text"
      categoryName="文本工具"
      onCopy={() => output}
      onClear={handleClear}
      enableShare
    >
      <Stack spacing={3}>
        {/* Type Selection */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Generate:
          </Typography>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(_, val) => val && setType(val)}
            fullWidth
          >
            <ToggleButton value="paragraphs">Paragraphs</ToggleButton>
            <ToggleButton value="sentences">Sentences</ToggleButton>
            <ToggleButton value="words">Words</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Count */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Number of {type}:
          </Typography>
          <TextField
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            size="small"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 100,
              },
            }}
          />
        </Box>

        {/* Generate Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<Article />}
          onClick={handleGenerate}
        >
          Generate Lorem Ipsum
        </Button>

        {/* Output */}
        {output && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Generated Text: ({output.split(/\s+/).length} words)
            </Typography>
            <TextField
              value={output}
              multiline
              rows={15}
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Box>
        )}
      </Stack>
    </ToolWrapper>
  );
}
