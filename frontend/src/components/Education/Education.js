import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Education = () => {
  const coursework = [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Software Engineering',
    'Computer Architecture',
    'Operating Systems',
    'Web Development',
    'Cloud Computing',
  ];

  return (
    <Box id="education" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
          }}
        >
          Education
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Academic background and achievements
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderLeft: 6,
            borderColor: 'primary.main',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    California State Polytechnic University, Pomona
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Bachelor of Science in Computer Science
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip
                  label="Expected Graduation: June 2026"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  icon={<EmojiEventsIcon />}
                  label="GPA: 3.61"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', mb: 3 }}>
                Pursuing a comprehensive education in computer science with focus on software
                engineering, full-stack development, and cloud technologies. Active in campus
                organizations and committed to academic excellence.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Relevant Coursework
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {coursework.map((course, index) => (
                  <Chip
                    key={index}
                    label={course}
                    variant="outlined"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Education;
