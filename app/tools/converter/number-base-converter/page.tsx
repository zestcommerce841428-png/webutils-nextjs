'use client';

import React, { useState } from 'react';
import { TextField, Typography, Paper, Stack } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function BinaryConverterPage() {
  const [decimal, setDecimal] = useState('42');

  const convert = () => {
    const num = parseInt(decimal);
    if (isNaN(num)) return { binary: '', octal: '', hex: '' };
    return {
      binary: num.toString(2),
      octal: num.toString(8),
      hex: num.toString(16).toUpperCase(),
    };
  };

  const result = convert();

  return (
    <ToolWrapper
      title="Number Base Converter"
      description="Convert between decimal, binary, octal, and hexadecimal"
      category="converter"
      categoryName="Converter"
      onCopy={() => `Decimal: ${decimal}\nBinary: ${result.binary}\nOctal: ${result.octal}\nHex: ${result.hex}`}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Decimal"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            type="number"
            fullWidth
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <div>
              <Typography variant="body2" color="text.secondary">Binary</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>{result.binary || '-'}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Octal</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>{result.octal || '-'}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Hexadecimal</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>{result.hex || '-'}</Typography>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolWrapper>
  );
}
