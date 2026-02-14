import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import ScrollAnimation from '../ScrollAnimation/ScrollAnimation';

const About = () => {
  const theme = useTheme();

  const highlights = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: '3.61 GPA',
      description: 'Senior at Cal Poly Pomona',
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Full-Stack Developer',
      description: 'React, FastAPI, Firebase, AWS',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'CS Club President',
      description: 'Leading student community',
    },
  ];

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
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
          About Me
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          Passionate about building scalable, user-centric applications
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {highlights.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ScrollAnimation delay={index * 100}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </ScrollAnimation>
            </Grid>
          ))}
        </Grid>

        <ScrollAnimation delay={300}>
          <Paper elevation={2} sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              I'm a Senior Computer Science student at Cal Poly Pomona with a strong foundation in
              full-stack development and a passion for building impactful software solutions. With
              hands-on experience in React, FastAPI, Firebase, and AWS, I've developed scalable web
              applications that prioritize user experience and code quality.
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              My experience as a Teaching Assistant and Math Tutor has honed my ability to break down
              complex technical concepts and communicate effectively with diverse audiences. As President
              of the Computer Science Club, I've cultivated leadership skills while fostering a
              collaborative community of aspiring developers.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              I'm driven by the challenge of solving real-world problems through clean, maintainable code.
              Whether it's architecting a mental wellness platform or building a mission control system,
              I approach each project with attention to detail, scalability, and user-centric design.
              I'm currently seeking opportunities to apply my skills in a professional environment and
              contribute to meaningful projects.
            </Typography>
          </Paper>
        </ScrollAnimation>
      </Container>
    </Box>
  );
};

export default About;
