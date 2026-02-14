import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, type: 'success', message: '' });

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_URL}/api/v1/contact`, formData);

      setAlert({
        show: true,
        type: 'success',
        message: response.data.message,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again.';

      // Handle validation errors (422)
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const details = error.response.data.detail;
        if (Array.isArray(details)) {
          errorMessage = details.map(err => err.msg).join('. ');
        } else if (typeof details === 'string') {
          errorMessage = details;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error.response?.data?.detail === 'string') {
        errorMessage = error.response.data.detail;
      }

      setAlert({
        show: true,
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
          }}
        >
          Get In Touch
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Let's discuss how I can contribute to your team
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <IconButton
            color="primary"
            href="https://linkedin.com"
            target="_blank"
            sx={{
              border: 1,
              borderColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="primary"
            href="https://github.com"
            target="_blank"
            sx={{
              border: 1,
              borderColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="primary"
            href="mailto:liam@example.com"
            sx={{
              border: 1,
              borderColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
            }}
          >
            <EmailIcon />
          </IconButton>
        </Stack>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
          {alert.show && (
            <Alert severity={alert.type} sx={{ mb: 3 }} onClose={() => setAlert({ ...alert, show: false })}>
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  inputProps={{ minLength: 2, maxLength: 100 }}
                  helperText="2-100 characters"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  inputProps={{ minLength: 3, maxLength: 200 }}
                  helperText="3-200 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  required
                  disabled={loading}
                  inputProps={{ minLength: 10, maxLength: 2000 }}
                  helperText="10-2000 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  disabled={loading}
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
