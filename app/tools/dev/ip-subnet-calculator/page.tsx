'use client';

import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  Chip,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import ToolWrapper from '@/components/tools/ToolWrapper';

export default function IPSubnetCalculatorPage() {
  const [ipAddress, setIpAddress] = useState('');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<{
    network: string;
    broadcast: string;
    firstHost: string;
    lastHost: string;
    subnetMask: string;
    wildcardMask: string;
    totalHosts: number;
    usableHosts: number;
    ipClass: string;
  } | null>(null);
  const [error, setError] = useState('');

  const ipToNumber = (ip: string): number => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  };

  const numberToIp = (num: number): string => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255,
    ].join('.');
  };

  const getIpClass = (firstOctet: number): string => {
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
    return 'Invalid';
  };

  const calculate = () => {
    setError('');
    setResult(null);

    // Validate IP
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ipAddress.match(ipRegex);
    
    if (!match) {
      setError('Invalid IP address format');
      return;
    }

    const octets = match.slice(1).map(Number);
    if (octets.some(octet => octet < 0 || octet > 255)) {
      setError('IP octets must be between 0 and 255');
      return;
    }

    // Validate CIDR
    const cidrNum = parseInt(cidr);
    if (cidrNum < 0 || cidrNum > 32) {
      setError('CIDR must be between 0 and 32');
      return;
    }

    // Calculate subnet mask
    const mask = ~((1 << (32 - cidrNum)) - 1) >>> 0;
    const subnetMask = numberToIp(mask);
    const wildcardMask = numberToIp(~mask >>> 0);

    // Calculate network and broadcast
    const ipNum = ipToNumber(ipAddress);
    const networkNum = (ipNum & mask) >>> 0;
    const broadcastNum = (networkNum | ~mask) >>> 0;

    // Calculate first and last host
    const firstHostNum = networkNum + 1;
    const lastHostNum = broadcastNum - 1;

    // Calculate number of hosts
    const totalHosts = Math.pow(2, 32 - cidrNum);
    const usableHosts = totalHosts - 2;

    setResult({
      network: numberToIp(networkNum),
      broadcast: numberToIp(broadcastNum),
      firstHost: numberToIp(firstHostNum),
      lastHost: numberToIp(lastHostNum),
      subnetMask,
      wildcardMask,
      totalHosts,
      usableHosts: usableHosts > 0 ? usableHosts : 0,
      ipClass: getIpClass(octets[0]),
    });
  };

  const handleClear = () => {
    setIpAddress('');
    setCidr('24');
    setResult(null);
    setError('');
  };

  return (
    <ToolWrapper
      title="IP Subnet Calculator"
      description="Calculate network details from IP address and CIDR notation."
      category="dev"
      categoryName="Developer Tools"
      onClear={handleClear}
    >
      <Grid container spacing={3}>
        {/* Input */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              IP Address and Subnet
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <TextField
                label="IP Address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="192.168.1.1"
                variant="outlined"
                sx={{ flexGrow: 1, minWidth: '200px' }}
              />
              <TextField
                label="CIDR"
                value={cidr}
                onChange={(e) => setCidr(e.target.value)}
                placeholder="24"
                variant="outlined"
                type="number"
                sx={{ width: '100px' }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 32,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={calculate}
                disabled={!ipAddress || !cidr}
                startIcon={<CalculateIcon />}
                sx={{ height: '56px' }}
              >
                Calculate
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Error */}
        {error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Results */}
        {result && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Network Address
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.network}/{cidr}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Broadcast Address
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.broadcast}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      IP Class
                    </Typography>
                    <Typography variant="h6">
                      Class {result.ipClass}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subnet Mask
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.subnetMask}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Wildcard Mask
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.wildcardMask}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Usable Hosts
                    </Typography>
                    <Typography variant="h6">
                      {result.usableHosts.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'success.main', borderRadius: 1, bgcolor: 'success.50' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      First Usable Host
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.firstHost}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'success.main', borderRadius: 1, bgcolor: 'success.50' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Usable Host
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {result.lastHost}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Common CIDR Notations:</strong>
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="/8 = 16.7M hosts" size="small" />
              <Chip label="/16 = 65K hosts" size="small" />
              <Chip label="/24 = 254 hosts" size="small" />
              <Chip label="/28 = 14 hosts" size="small" />
              <Chip label="/30 = 2 hosts" size="small" />
              <Chip label="/32 = 1 host" size="small" />
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </ToolWrapper>
  );
}
