'use client';

import { useState } from 'react';
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Slider,
} from '@mui/material';
import { Refresh, ContentCopy } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';
import { copyToClipboard } from '@/lib/utils/clipboard';

type UuidVersion = 'v4' | 'v7';

// UUID v4 generator
const generateUuidV4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// UUID v7 generator (timestamp-based)
const generateUuidV7 = (): string => {
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, '0');
  const randomHex = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8)}-7${randomHex.slice(0, 3)}-${randomHex.slice(3, 7)}-${randomHex.slice(7)}`;
};

// NanoID generator
const generateNanoId = (length: number): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
};

export default function UuidGeneratorPage() {
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [count, setCount] = useState(1);
  const [nanoIdLength, setNanoIdLength] = useState(21);
  const [uuids, setUuids] = useState<string[]>([]);
  const [showNanoId, setShowNanoId] = useState(false);

  const handleGenerate = () => {
    if (showNanoId) {
      const ids = Array.from({ length: count }, () => generateNanoId(nanoIdLength));
      setUuids(ids);
    } else {
      const generator = version === 'v4' ? generateUuidV4 : generateUuidV7;
      const newUuids = Array.from({ length: count }, generator);
      setUuids(newUuids);
    }
  };

  const handleCopy = async (uuid: string) => {
    await copyToClipboard(uuid);
  };

  const handleCopyAll = () => {
    return uuids.join('\n');
  };

  const handleClear = () => {
    setUuids([]);
  };

  return (
    <ToolWrapper
      title="UUID / NanoID Generator"
      description="Generate UUIDs (v4, v7) and NanoIDs for unique identifiers"
      category="dev"
      categoryName="开发工具"
      onCopy={handleCopyAll}
      onClear={handleClear}
      enableShare
    >
      <Stack spacing={3}>
        {/* ID Type Selection */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            ID Type:
          </Typography>
          <ToggleButtonGroup
            value={showNanoId ? 'nanoid' : 'uuid'}
            exclusive
            onChange={(_, val) => val && setShowNanoId(val === 'nanoid')}
            size="small"
          >
            <ToggleButton value="uuid">UUID</ToggleButton>
            <ToggleButton value="nanoid">NanoID</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* UUID Version Selection */}
        {!showNanoId && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              UUID Version:
            </Typography>
            <ToggleButtonGroup
              value={version}
              exclusive
              onChange={(_, val) => val && setVersion(val)}
              size="small"
            >
              <ToggleButton value="v4">v4 (Random)</ToggleButton>
              <ToggleButton value="v7">v7 (Timestamp)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {/* NanoID Length */}
        {showNanoId && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              NanoID Length: {nanoIdLength}
            </Typography>
            <Slider
              value={nanoIdLength}
              onChange={(_, val) => setNanoIdLength(val as number)}
              min={8}
              max={64}
              step={1}
              marks={[
                { value: 8, label: '8' },
                { value: 21, label: '21 (default)' },
                { value: 64, label: '64' },
              ]}
            />
          </Box>
        )}

        {/* Count Selection */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Number to Generate:
          </Typography>
          <TextField
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            size="small"
            sx={{ width: 150 }}
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
          startIcon={<Refresh />}
          onClick={handleGenerate}
          size="large"
        >
          Generate {showNanoId ? 'NanoID' : 'UUID'}
        </Button>

        {/* Results */}
        {uuids.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Generated {showNanoId ? 'NanoIDs' : 'UUIDs'}: ({uuids.length})
            </Typography>
            <Stack spacing={1}>
              {uuids.map((uuid, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      flexGrow: 1,
                      wordBreak: 'break-all',
                    }}
                  >
                    {uuid}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopy />}
                    onClick={() => handleCopy(uuid)}
                  >
                    Copy
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Info */}
        <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2">
            <strong>{showNanoId ? 'NanoID' : `UUID ${version.toUpperCase()}`}:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            {showNanoId ? (
              <>
                <li>URL-friendly unique ID</li>
                <li>Shorter than UUID (21 chars by default)</li>
                <li>Uses A-Za-z0-9-_ alphabet</li>
                <li>Secure random generation</li>
              </>
            ) : version === 'v4' ? (
              <>
                <li>Randomly generated</li>
                <li>122 bits of randomness</li>
                <li>Format: 8-4-4-4-12 hex digits</li>
                <li>Collision probability: virtually zero</li>
              </>
            ) : (
              <>
                <li>Timestamp-based sortable UUIDs</li>
                <li>First 48 bits: millisecond precision timestamp</li>
                <li>Remaining bits: random</li>
                <li>Ideal for database primary keys</li>
              </>
            )}
          </ul>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
