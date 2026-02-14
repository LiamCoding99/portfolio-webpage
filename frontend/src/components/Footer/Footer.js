import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Liam T. Nguyen
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="mailto:liam@example.com"
              aria-label="Email"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {currentYear} Liam T. Nguyen. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, display: { xs: 'none', sm: 'block' } }}>
            •
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Built with <FavoriteIcon sx={{ fontSize: 16 }} /> using React & FastAPI
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
