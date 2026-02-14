import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';

const Hero = () => {
  const theme = useTheme();

  const handleResumeDownload = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    window.open(`${API_URL}/api/v1/resume/download`, '_blank');
  };

  const handleContactClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        pt: { xs: 12, md: 16 },
        pb: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 50%)`,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Liam T. Nguyen
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 400,
              mb: 3,
              opacity: 0.95,
            }}
          >
            Full-Stack Developer & Computer Science Student
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 300,
              mb: 5,
              maxWidth: '700px',
              mx: 'auto',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Senior at Cal Poly Pomona | Building impactful web applications with React, FastAPI, and modern cloud technologies
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              onClick={handleContactClick}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.9),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get In Touch
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleResumeDownload}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: alpha('#ffffff', 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Download Resume
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
