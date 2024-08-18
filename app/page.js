import Image from 'next/image';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container } from '@mui/material';
import Head from 'next/head';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import getStripe from '@/utils/get-stripe'

export default function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ background: '#000000', minHeight: '100vh', padding: '0 2rem' }}>
      <Head>
        <title>FlashCard SaaS</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>
    
      <AppBar position="static" sx={{ background: '#1a1a1a', boxShadow: 'none', borderBottom: '2px solid #98c1a2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#ffffff' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#ffffff', ml: 1 }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#b2d8d8', display: 'inline-block', padding: '0 10px', borderRadius: '8px' }}>
          The easiest way to create flashcards from your text.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" sx={{ mt: 2, mr: 2, background: '#98c1a2', color: '#2f4f4f' }} href="/generate">
            Get Started
          </Button>
          <Button variant="outlined" sx={{ mt: 2, color: '#98c1a2', borderColor: '#98c1a2' }}>
            Learn More
          </Button>
        </Box>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#ffffff' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              p: 3, // Reduced padding
              background: '#1a1a1a',
              border: '2px solid #98c1a2', // Thinner border
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Smaller shadow
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)', // Smaller shadow on hover
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>Customizable Flashcards</Typography>
              <Typography sx={{ color: '#b2d8d8' }}>
                Create flashcards tailored to your needs with customizable options and formats.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              p: 3, // Reduced padding
              background: '#1a1a1a',
              border: '2px solid #98c1a2', // Thinner border
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Smaller shadow
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)', // Smaller shadow on hover
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>Collaborative Learning</Typography>
              <Typography sx={{ color: '#b2d8d8' }}>
                Share flashcard sets with others and collaborate on learning materials.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              p: 3, // Reduced padding
              background: '#1a1a1a',
              border: '2px solid #98c1a2', // Thinner border
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Smaller shadow
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)', // Smaller shadow on hover
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>AI-Powered Recommendations</Typography>
              <Typography sx={{ color: '#b2d8d8' }}>
                Receive smart suggestions on how to improve your flashcards with our AI tools.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#ffffff' }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              p: 3, // Consistent padding
              background: '#1a1a1a',
              border: '2px solid #98c1a2', // Consistent border
              borderRadius: 2,
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)', // Consistent shadow
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.7)', // Consistent shadow on hover
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>Basic</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>Free</Typography>
              <Typography sx={{ color: '#b2d8d8' }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, background: '#98c1a2', color: '#2f4f4f' }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{
              p: 3, // Consistent padding
              background: '#1a1a1a',
              border: '2px solid #98c1a2', // Consistent border
              borderRadius: 2,
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)', // Consistent shadow
              transform: 'scale(1.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.7)', // Consistent shadow on hover
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>Pro</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>$7 / month</Typography>
              <Typography sx={{ color: '#b2d8d8' }}>
                Access to unlimited flashcard features and much more storage.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, background: '#98c1a2', color: '#2f4f4f' }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
