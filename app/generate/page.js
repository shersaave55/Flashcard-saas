/*'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  CardActionArea
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { collection } from 'firebase/firestore'
import {useUser} from '@clerk/nextjs'
import { WriteBatch } from 'firebase/firestore'


export default function Generate() {
  const {isLoaded, isSignedIn, user} = useUser()
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [name, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleFlashcardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => {
    setOpenI(true)
  }
  const handleClose = () => {
    setOpenI(false)
  }

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const batch = WriteBatch(db)
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)

      

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)){
          alert("Flashcard collection with the same name already exists!")
          return
        }
        else {
        collections.push({name})
        batch.set(userDocRef, {flashcards: collections}, {merge: true})
        }
      }
      else{
        batch.set(userDocRef, {flashcards: [{name}]})
      }
      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard)=>{
        const cardDocREf = doc(colRef)
        batch.set(cardDocREf, flashcard)
      })
      await batch.commit()
      handleClose()
      router.push('/flashcards')

    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>

        <Paper sx={{p: 4, width: '100%'}}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Paper>

      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardActionArea 
                  onClick={() => {handleFlashcardClick(index)}}>
                  <CardContent>
                    <Box sx={{
                      perspective: '1000px',
                      '$ > div': {
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                        width: '100%',
                        height: '200px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                        transform: flipped[index]? 'rotateY(180deg)' : 'rotateY(0deg)',

                      },
                      '$ > div > div': {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        boxSizing: 'border-box'

                      },
                      '$ > div > div:nth-of-type(2)':{
                        transform: 'rotateY(180deg)'
                      }
                    }}>
                     <div>
                      <div>
                        <Typography variant='h5' 
                              component="div">
                          {flashcard.front}
                        </Typography>
                        </div>
                        <div>
                        <Typography variant='h5' 
                              component="div">
                          {flashcard.back}
                        </Typography>
                        </div>
                      </div> 
                    </Box>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                  </CardActionArea>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Save Flashcards
          </Button>
        </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant= "outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
} */

'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Card,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardContent,
  CardActionArea,
  Link,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material'

import {db} from '/firebase' 
import {
  collection,
  doc,
  writeBatch,
  getDoc,
} from 'firebase/firestore';

import { useRouter } from 'next/navigation';
import {useUser,  SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Generate() {
  const {isLoaded, isSignedIn, user} = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [numFlashcards, setNumFlashcards] = useState('');
  const [flashcardTypes, setFlashcardTypes] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false); 
  const router = useRouter()

  const availableFlashcardTypes = [
    'Question-Answer',
    'Definition',
    'Fill-in-the-blank',
    'True/False',
    'Further Explanation',
  ];

  const handleSubmit = async () => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text,
              numFlashcards: numFlashcards,
              flashcardTypes: flashcardTypes }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate flashcards');
        }

        const data = await response.json();
        setFlashcards(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate flashcards. Please try again.');
    }
}

  const handleCardClick = (id) => (
    setFlipped((prev) => ({
     ...prev, 
       [id]: !prev[id], 
    }))
  )

  const dialogOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const saveFlashcards = async () => {
    if (!isSignedIn) { 
      setAlertOpen(true); 
      return;
    }
  
    if (!name) {
      alert('Please enter a name');
      return;
    }
  
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);
  
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard Collection With That Name Exists');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
  
    const colRef = collection(userDocRef, name); 
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
  
    await batch.commit();
    handleCloseDialog();
    router.push('/flashcards');
  };
  

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: '#000000', minHeight: '100vh', padding: '0', color: '#ffffff' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #98c1a2' }}>
        <Toolbar>
          <Link href="/" passHref style={{ textDecoration: 'none', color: '#ffffff', flexGrow: 1 }}>
            <Typography component="span">Flashcard SaaS</Typography>
          </Link>
          <Button variant="contained" sx={{ mr: 2, backgroundColor: '#98c1a2', color: '#2f4f4f' }} href="https://forms.gle/BMNEuzV2WQvKJ9Lp6">Feedback</Button>
          <SignedOut>
            <Button variant="contained" sx={{ mr: 2, backgroundColor: '#98c1a2', color: '#2f4f4f' }} href="/sign-in">Sign In</Button>
            <Button variant="contained" sx={{ backgroundColor: '#98c1a2', color: '#2f4f4f' }} href="/sign-up">Sign Up</Button>
          </SignedOut>

          <SignedIn>
            <Button variant="contained" sx={{ mr: 2, backgroundColor: '#98c1a2', color: '#2f4f4f' }} href="/generate">Generate</Button>
            <Button variant="contained" sx={{ mr: 2, backgroundColor: '#98c1a2', color: '#2f4f4f' }} href="/flashcards">Flashcards</Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
          Generate Flashcards
        </Typography>

        <TextField
          fullWidth
          label="Number of Flashcards. If you are not sure, leave it blank. The AI will decide for you!"
          type="number"
          value={numFlashcards}
          onChange={(e) => setNumFlashcards(e.target.value)}
          sx={{ mb: 2, mt: 2, backgroundColor: '#1a1a1a', input: { color: '#ffffff' }, label: { color: '#b2d8d8' } }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="flashcard-types-label" sx={{ color: '#b2d8d8' }}>Flashcard Types</InputLabel>
          <Select
            labelId="flashcard-types-label"
            multiple
            value={flashcardTypes}
            onChange={(e) => setFlashcardTypes(e.target.value)}
            input={<OutlinedInput label="Flashcard Types" sx={{ color: '#ffffff' }} />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} sx={{ backgroundColor: '#98c1a2', color: '#2f4f4f' }} />
                ))}
              </Box>
            )}
          >
            {availableFlashcardTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2, backgroundColor: '#1a1a1a', textarea: { color: '#ffffff' }, label: { color: '#b2d8d8' } }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#98c1a2', color: '#2f4f4f' }}
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#ffffff' }}>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box sx={{
                        perspective: '1000px',
                        '& > div': {
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d', 
                          position: 'relative', 
                          width: '100%', 
                          height: '208px', 
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                          transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)', 
                        }, 
                        '& > div > div:nth-of-type(2)': { 
                          transform: 'rotateY(180deg)' 
                        }, 
                        '& > div > div': { 
                          position: 'absolute', 
                          width: '100%', 
                          height: '100%', 
                          backfaceVisibility: 'hidden', 
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 2,
                          boxSizing: 'border-box'
                        },  
                      }}>
                        <div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>{flashcard.front}</Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>{flashcard.back}</Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#98c1a2', color: '#2f4f4f' }}
              onClick={() => setOpen(true)}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: '#ffffff' }}>Save Flashcard Set</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
          <DialogContentText sx={{ color: '#b2d8d8' }}>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ backgroundColor: '#1a1a1a', input: { color: '#ffffff' }, label: { color: '#b2d8d8' } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#98c1a2' }}>Cancel</Button>
          <Button onClick={saveFlashcards} sx={{ color: '#98c1a2' }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={alertOpen} onClose={handleCloseAlert}>
        <DialogTitle sx={{ color: '#ffffff' }}>Not Signed In</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
          <DialogContentText sx={{ color: '#b2d8d8' }}>
            You need to be signed in to save your flashcards. Please sign in or create an account and try generating the cards again.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1a1a1a' }}>
          <Button onClick={handleCloseAlert} sx={{ color: '#98c1a2' }}>Close</Button>
          <Button onClick={() => router.push('/sign-in')} sx={{ color: '#98c1a2' }}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
