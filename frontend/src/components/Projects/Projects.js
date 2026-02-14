import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to static data if API fails
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
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
          Featured Projects
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Showcasing my work in full-stack development
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.shadows[12],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                    {project.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mb: 2, fontWeight: 500 }}
                  >
                    {project.tagline}
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    {project.description}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Key Highlights:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                    {project.highlights.slice(0, 4).map((highlight, index) => (
                      <Typography
                        component="li"
                        variant="body2"
                        key={index}
                        sx={{ mb: 0.5 }}
                      >
                        {highlight}
                      </Typography>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Technologies:
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {project.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </CardContent>

                {/* Action Buttons - Conditionally rendered based on project data */}
                <CardActions sx={{ p: 3, pt: 0 }}>
                  {/* GitHub button - shows only if github_url exists */}
                  {project.github_url && (
                    <Button
                      startIcon={<GitHubIcon />}
                      variant="outlined"
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </Button>
                  )}
                  {/* Live Demo button - shows only if live_url exists
                      For web apps: deployment URL
                      For desktop apps: demo video, releases, or documentation
                      For mobile apps: app store link or demo video
                      For ML projects: HuggingFace, Colab, or Streamlit demo */}
                  {project.live_url && (
                    <Button
                      startIcon={<LaunchIcon />}
                      variant="contained"
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
