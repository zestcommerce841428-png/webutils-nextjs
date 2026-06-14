'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import ToolWrapper from '@/components/tools/ToolWrapper';

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [repaymentType, setRepaymentType] = useState<'equal-payment' | 'equal-principal'>('equal-payment');
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const months = parseFloat(loanTerm) * 12;

    if (!principal || !rate || !months || principal <= 0 || months <= 0) {
      return null;
    }

    const schedule: LoanResult['schedule'] = [];
    let balance = principal;
    let totalPayment = 0;
    let totalInterest = 0;

    if (repaymentType === 'equal-payment') {
      // Equal Monthly Payment (等额本息)
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

      for (let month = 1; month <= months; month++) {
        const interest = balance * rate;
        const principalPayment = monthlyPayment - interest;
        balance -= principalPayment;

        totalPayment += monthlyPayment;
        totalInterest += interest;

        if (month <= 12 || month > months - 12 || month % 12 === 0) {
          schedule.push({
            month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest,
            balance: Math.max(0, balance),
          });
        }
      }

      return {
        monthlyPayment,
        totalPayment,
        totalInterest,
        schedule,
      };
    } else {
      // Equal Principal Payment (等额本金)
      const principalPayment = principal / months;

      for (let month = 1; month <= months; month++) {
        const interest = balance * rate;
        const payment = principalPayment + interest;
        balance -= principalPayment;

        totalPayment += payment;
        totalInterest += interest;

        if (month <= 12 || month > months - 12 || month % 12 === 0) {
          schedule.push({
            month,
            payment,
            principal: principalPayment,
            interest,
            balance: Math.max(0, balance),
          });
        }
      }

      return {
        monthlyPayment: principalPayment + (principal * rate), // First month payment
        totalPayment,
        totalInterest,
        schedule,
      };
    }
  };

  useEffect(() => {
    const res = calculateLoan();
    setResult(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, interestRate, loanTerm, repaymentType]);

  const handleCopy = () => {
    if (!result) return null;
    return `Loan Amount: $${parseFloat(loanAmount).toLocaleString()}\nInterest Rate: ${interestRate}%\nLoan Term: ${loanTerm} years\nRepayment Type: ${repaymentType === 'equal-payment' ? 'Equal Payment' : 'Equal Principal'}\n\nMonthly Payment: $${result.monthlyPayment.toFixed(2)}\nTotal Payment: $${result.totalPayment.toFixed(2)}\nTotal Interest: $${result.totalInterest.toFixed(2)}`;
  };

  return (
    <ToolWrapper
      title="Loan Calculator"
      description="Calculate mortgage and loan payments with equal payment or equal principal methods"
      category="calculator"
      categoryName="Calculator"
      onCopy={handleCopy}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Loan Details
            </Typography>

            <TextField
              label="Loan Amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                input: {
                  startAdornment: '$',
                },
              }}
            />

            <TextField
              label="Annual Interest Rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                input: {
                  endAdornment: '%',
                },
              }}
            />

            <TextField
              label="Loan Term"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                input: {
                  endAdornment: 'years',
                },
              }}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Repayment Method
              </Typography>
              <ToggleButtonGroup
                value={repaymentType}
                exclusive
                onChange={(_, val) => val && setRepaymentType(val)}
                fullWidth
                color="primary"
              >
                <ToggleButton value="equal-payment">
                  Equal Payment<br />
                  <Typography variant="caption">(等额本息)</Typography>
                </ToggleButton>
                <ToggleButton value="equal-principal">
                  Equal Principal<br />
                  <Typography variant="caption">(等额本金)</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>

            {result ? (
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {repaymentType === 'equal-payment' ? 'Monthly Payment' : 'First Month Payment'}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ${result.monthlyPayment.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Payment
                    </Typography>
                    <Typography variant="h6">
                      ${result.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Interest
                    </Typography>
                    <Typography variant="h6" color="error.main">
                      ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Interest Percentage
                    </Typography>
                    <Typography variant="h6">
                      {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Alert severity="warning">
                Please enter valid loan details.
              </Alert>
            )}
          </Paper>
        </Grid>

        {result && result.schedule.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment Schedule (Sample)
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell align="right">Payment</TableCell>
                      <TableCell align="right">Principal</TableCell>
                      <TableCell align="right">Interest</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell align="right">${row.payment.toFixed(2)}</TableCell>
                        <TableCell align="right">${row.principal.toFixed(2)}</TableCell>
                        <TableCell align="right">${row.interest.toFixed(2)}</TableCell>
                        <TableCell align="right">${row.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Showing first year, last year, and selected months
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Equal Payment:</strong> Fixed monthly payment throughout the loan term (popular in US).<br />
          <strong>Equal Principal:</strong> Principal payment is fixed, total payment decreases over time (popular in China).
        </Typography>
      </Alert>
    </ToolWrapper>
  );
}
