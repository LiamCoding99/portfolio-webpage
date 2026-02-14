import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

const Experience = () => {
  const experiences = [
    {
      title: 'President',
      organization: 'Computer Science Club',
      location: 'Cal Poly Pomona',
      period: '2024 - Present',
      description: [
        'Leading a student organization focused on professional development',
        'Organizing technical workshops, hackathons, and networking events',
        'Mentoring members in software development and career preparation',
        'Building a collaborative community of aspiring developers',
      ],
      icon: <GroupsIcon sx={{ fontSize: 32 }} />,
      color: 'primary',
    },
    {
      title: 'Teaching Assistant',
      organization: 'Computer Science Department',
      location: 'Santa Ana College',
      period: '2023 - 2024',
      description: [
        'Assisted students in learning programming fundamentals and problem-solving',
        'Held office hours to provide one-on-one academic support',
        'Graded assignments and provided constructive feedback',
        'Facilitated lab sessions and clarified complex CS concepts',
      ],
      icon: <SchoolIcon sx={{ fontSize: 32 }} />,
      color: 'secondary',
    },
    {
      title: 'Math Tutor',
      organization: 'Math Department',
      location: 'Santa Ana College',
      period: '2022 - 2023',
      description: [
        'Tutored students in algebra, calculus, and discrete mathematics',
        'Developed personalized learning strategies for diverse learning styles',
        'Improved student comprehension and academic performance',
        'Strengthened communication and teaching abilities',
      ],
      icon: <WorkIcon sx={{ fontSize: 32 }} />,
      color: 'success',
    },
  ];

  return (
    <Box id="experience" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
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
          Professional Timeline
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Work experience and leadership roles
        </Typography>

        <Grid container spacing={4}>
          {experiences.map((exp, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderLeft: 6,
                  borderColor: `${exp.color}.main`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <Grid container spacing={3}>
                  {/* Icon & Period */}
                  <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' } }}>
                    <Avatar
                      sx={{
                        bgcolor: `${exp.color}.main`,
                        width: 64,
                        height: 64,
                        mb: 2,
                      }}
                    >
                      {exp.icon}
                    </Avatar>
                    <Chip
                      label={exp.period}
                      color={exp.color}
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>

                  {/* Content */}
                  <Grid item xs={12} md={10}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {exp.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      color={`${exp.color}.main`}
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      {exp.organization}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      📍 {exp.location}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {exp.description.map((item, i) => (
                        <Typography
                          component="li"
                          variant="body1"
                          key={i}
                          sx={{ mb: 1, lineHeight: 1.7 }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Experience;
