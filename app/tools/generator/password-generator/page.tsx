'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { VpnKey } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      charset = lowercase; // fallback
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) setStrength('Weak');
    else if (score <= 4) setStrength('Medium');
    else if (score <= 6) setStrength('Strong');
    else setStrength('Very Strong');
  };

  const handleClear = () => {
    setPassword('');
    setStrength('');
  };

  return (
    <ToolWrapper
      title="Password Generator"
      description="Generate secure random passwords with customizable options"
      category="generator"
      categoryName="生成器"
      onCopy={() => password}
      onClear={handleClear}
      enableShare
    >
      <Stack spacing={3}>
        {/* Length */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Password Length: {length}
          </Typography>
          <TextField
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(4, Math.min(64, parseInt(e.target.value) || 16)))}
            size="small"
            slotProps={{
              htmlInput: {
                min: 4,
                max: 64,
              },
            }}
          />
        </Box>

        {/* Options */}
        <FormControl>
          <FormLabel>Include:</FormLabel>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
              }
              label="Uppercase (A-Z)"
            />
            <FormControlLabel
              control={
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
              }
              label="Lowercase (a-z)"
            />
            <FormControlLabel
              control={
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
              }
              label="Numbers (0-9)"
            />
            <FormControlLabel
              control={
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
              }
              label="Symbols (!@#$%...)"
            />
          </Stack>
        </FormControl>

        {/* Generate Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<VpnKey />}
          onClick={generatePassword}
        >
          Generate Password
        </Button>

        {/* Result */}
        {password && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Generated Password:
            </Typography>
            <TextField
              value={password}
              multiline
              rows={3}
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                  sx: {
                    fontFamily: 'monospace',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                  },
                },
              }}
            />
            <Alert
              severity={
                strength === 'Weak' ? 'error' :
                strength === 'Medium' ? 'warning' :
                strength === 'Strong' ? 'info' : 'success'
              }
              sx={{ mt: 2 }}
            >
              Strength: <strong>{strength}</strong>
            </Alert>
          </Box>
        )}

        {/* Info */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Password Security Tips:</strong>
          </Typography>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Use at least 12 characters</li>
            <li>Mix uppercase, lowercase, numbers, and symbols</li>
            <li>Never reuse passwords across sites</li>
            <li>Use a password manager to store them</li>
            <li>Change passwords regularly</li>
          </ul>
        </Alert>
      </Stack>
    </ToolWrapper>
  );
}
