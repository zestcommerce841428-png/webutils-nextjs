'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { Palette, Refresh } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export default function ColorConverterPage() {
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbR, setRgbR] = useState(59);
  const [rgbG, setRgbG] = useState(130);
  const [rgbB, setRgbB] = useState(246);
  const [hslH, setHslH] = useState(217);
  const [hslS, setHslS] = useState(91);
  const [hslL, setHslL] = useState(60);
  const [error, setError] = useState('');

  const updateFromHex = (hex: string) => {
    setHexInput(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbR(rgb.r);
      setRgbG(rgb.g);
      setRgbB(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslH(hsl.h);
      setHslS(hsl.s);
      setHslL(hsl.l);
      setError('');
    } else {
      setError('Invalid HEX color');
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbR(r);
    setRgbG(g);
    setRgbB(b);
    setHexInput(rgbToHex(r, g, b));
    const hsl = rgbToHsl(r, g, b);
    setHslH(hsl.h);
    setHslS(hsl.s);
    setHslL(hsl.l);
    setError('');
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHslH(h);
    setHslS(s);
    setHslL(l);
    const rgb = hslToRgb(h, s, l);
    setRgbR(rgb.r);
    setRgbG(rgb.g);
    setRgbB(rgb.b);
    setHexInput(rgbToHex(rgb.r, rgb.g, rgb.b));
    setError('');
  };

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    updateFromHex(randomHex);
  };

  const handleClear = () => {
    updateFromHex('#000000');
  };

  const currentColor = hexInput;

  return (
    <ToolWrapper
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats with live preview"
      category="dev"
      categoryName="开发工具"
      onCopy={() => `HEX: ${hexInput}\nRGB: rgb(${rgbR}, ${rgbG}, ${rgbB})\nHSL: hsl(${hslH}, ${hslS}%, ${hslL}%)`}
      onClear={handleClear}
      enableShare
    >
      <Stack spacing={3}>
        {/* Color Preview */}
        <Paper
          sx={{
            height: 150,
            backgroundColor: currentColor,
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: rgbToHsl(rgbR, rgbG, rgbB).l > 50 ? '#000' : '#fff',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {currentColor}
          </Typography>
        </Paper>

        {/* Random Color Button */}
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={generateRandomColor}
        >
          Random Color
        </Button>

        {/* Error */}
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* HEX Input */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            HEX:
          </Typography>
          <TextField
            value={hexInput}
            onChange={(e) => updateFromHex(e.target.value)}
            placeholder="#3b82f6"
            fullWidth
            slotProps={{
              input: {
                startAdornment: <Palette sx={{ mr: 1, color: 'action.active' }} />,
                sx: { fontFamily: 'monospace' },
              },
            }}
          />
        </Box>

        {/* RGB Input */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            RGB:
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              label="R"
              type="number"
              value={rgbR}
              onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgbG, rgbB)}
              slotProps={{ htmlInput: { min: 0, max: 255 } }}
              size="small"
              fullWidth
            />
            <TextField
              label="G"
              type="number"
              value={rgbG}
              onChange={(e) => updateFromRgb(rgbR, parseInt(e.target.value) || 0, rgbB)}
              slotProps={{ htmlInput: { min: 0, max: 255 } }}
              size="small"
              fullWidth
            />
            <TextField
              label="B"
              type="number"
              value={rgbB}
              onChange={(e) => updateFromRgb(rgbR, rgbG, parseInt(e.target.value) || 0)}
              slotProps={{ htmlInput: { min: 0, max: 255 } }}
              size="small"
              fullWidth
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            rgb({rgbR}, {rgbG}, {rgbB})
          </Typography>
        </Box>

        {/* HSL Input */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            HSL:
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              label="H"
              type="number"
              value={hslH}
              onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hslS, hslL)}
              slotProps={{ htmlInput: { min: 0, max: 360 } }}
              size="small"
              fullWidth
            />
            <TextField
              label="S"
              type="number"
              value={hslS}
              onChange={(e) => updateFromHsl(hslH, parseInt(e.target.value) || 0, hslL)}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              size="small"
              fullWidth
            />
            <TextField
              label="L"
              type="number"
              value={hslL}
              onChange={(e) => updateFromHsl(hslH, hslS, parseInt(e.target.value) || 0)}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              size="small"
              fullWidth
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            hsl({hslH}, {hslS}%, {hslL}%)
          </Typography>
        </Box>

        {/* Info */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Color Formats:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li><strong>HEX:</strong> #RRGGBB format (web standard)</li>
            <li><strong>RGB:</strong> Red, Green, Blue values (0-255)</li>
            <li><strong>HSL:</strong> Hue (0-360°), Saturation (0-100%), Lightness (0-100%)</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
