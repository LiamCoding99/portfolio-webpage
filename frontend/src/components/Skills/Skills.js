import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
} from '@mui/material';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'SQL'],
      color: 'primary',
    },
    {
      title: 'Web Development',
      skills: ['React', 'Node.js', 'FastAPI', 'HTML/CSS', 'Tailwind CSS', 'Material-UI', 'REST APIs'],
      color: 'secondary',
    },
    {
      title: 'Cloud & Database',
      skills: ['Firebase', 'AWS RDS', 'MySQL', 'Firestore', 'Cloud Deployment'],
      color: 'success',
    },
    {
      title: 'Tools & Practices',
      skills: ['Git', 'JDBC', 'Clean Code', 'Debugging', 'Agile', 'OOP', 'Data Structures'],
      color: 'info',
    },
    {
      title: 'Soft Skills',
      skills: ['Leadership', 'Teaching', 'Communication', 'Problem Solving', 'Team Collaboration'],
      color: 'warning',
    },
  ];

  return (
    <Box id="skills" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
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
          Skills & Technologies
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Comprehensive technical and professional competencies
        </Typography>

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderTop: 3,
                  borderColor: `${category.color}.main`,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: `${category.color}.main`,
                  }}
                >
                  {category.title}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {category.skills.map((skill, skillIndex) => (
                    <Chip
                      key={skillIndex}
                      label={skill}
                      color={category.color}
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
