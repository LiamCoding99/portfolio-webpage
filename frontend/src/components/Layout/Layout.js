import React from 'react';
import { Box } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Education from '../Education/Education';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Experience from '../Experience/Experience';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <Box>
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </Box>
  );
};

export default Layout;
