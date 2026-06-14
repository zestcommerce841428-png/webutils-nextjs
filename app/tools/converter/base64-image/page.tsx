'use client';

import React, { useState } from 'react';
import { TextField, Paper, Stack, Button } from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function Base64ImagePage() {
  const [base64, setBase64] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setBase64(ev.target?.result as string || '');
    reader.readAsDataURL(f);
  };

  return (
    <ToolWrapper
      title="Base64 Image Encoder"
      description="Convert images to Base64"
      category="converter"
      categoryName="Converter"
      onCopy={() => base64 || null}
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <input type="file" accept="image/*" onChange={handleFile} />
          {file && <p>File: {file.name} ({(file.size / 1024).toFixed(2)} KB)</p>}
        </Paper>
        {base64 && (
          <>
            <Paper sx={{ p: 3 }}>
              <img src={base64} alt="preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
            </Paper>
            <Paper sx={{ p: 3 }}>
              <TextField
                value={base64}
                multiline
                rows={8}
                fullWidth
                slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: '0.75rem' } } }}
              />
            </Paper>
          </>
        )}
      </Stack>
    </ToolWrapper>
  );
}
