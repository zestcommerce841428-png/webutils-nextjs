'use client';

import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Chip,
  InputAdornment,
  Stack,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import ToolCard from '@/components/tools/ToolCard';
import toolsData from '@/data/tools.json';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { categories, tools: toolsObj } = toolsData as {
    categories: Record<string, { name: string; icon: string; color: string }>;
    tools: Record<string, { path: string; name: string; category: string; keywords: string }>;
  };

  // Convert tools object to array
  const tools = useMemo(() => Object.values(toolsObj), [toolsObj]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.keywords.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tools, searchQuery, selectedCategory]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          🔧 WebUtils
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          1000+ Free Online Tools
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Privacy-first tools that work entirely in your browser.
          No data upload. No tracking. Works offline.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search tools... (e.g., JSON formatter, QR code, calculator)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: 800, mx: 'auto', display: 'block' }}
        />
      </Box>

      {/* Category Filters */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 4,
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <Chip
          label="All"
          onClick={() => setSelectedCategory('all')}
          color={selectedCategory === 'all' ? 'primary' : 'default'}
          sx={{ cursor: 'pointer' }}
        />
        {Object.entries(categories).map(([key, cat]) => (
          <Chip
            key={key}
            label={`${cat.icon} ${cat.name}`}
            onClick={() => setSelectedCategory(key)}
            color={selectedCategory === key ? 'primary' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
        Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
      </Typography>

      {/* Tools Grid */}
      <Grid container spacing={3}>
        {filteredTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.path}>
            <ToolCard
              name={tool.name}
              category={categories[tool.category]?.name || tool.category}
              categoryIcon={categories[tool.category]?.icon || '🔧'}
              categoryColor={categories[tool.category]?.color || 'primary'}
              path={tool.path}
              keywords={tool.keywords}
            />
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No tools found matching your search
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try different keywords or browse all categories
          </Typography>
        </Box>
      )}
    </Container>
  );
}
