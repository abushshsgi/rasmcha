import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, AppBar, Toolbar, IconButton, Grid, Paper, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Oddiy login (demo uchun): username: admin, password: 123456
    if (username === 'admin' && password === '123456') {
      onLogin();
    } else {
      setError("Login yoki parol noto'g'ri!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={5} boxShadow={10} borderRadius={3} bgcolor="#ffffff" sx={{ transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', '&:hover': { boxShadow: 15, transform: 'translateY(-5px)' }, border: '1px solid #e0e0e0' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2c3e50', fontWeight: '700', mb: 3, letterSpacing: 0.5 }}>Kirish</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Login" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required variant="outlined" size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, mb: 2 }} />
          <TextField label="Parol" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required variant="outlined" size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          {error && <Typography color="error" align="center" sx={{ mt: 2, mb: 1, fontSize: '0.9rem', fontWeight: '500' }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4, py: 1.6, borderRadius: 2.5, fontSize: '1.15rem', background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)', boxShadow: '0 4px 8px 2px rgba(76, 175, 80, .4)', transition: 'all 0.4s ease', '&:hover': { background: 'linear-gradient(45deg, #66BB6A 30%, #4CAF50 90%)', boxShadow: '0 6px 12px 3px rgba(76, 175, 80, .6)', transform: 'translateY(-2px)' } }}>Kirish</Button>
        </form>
      </Box>
    </Container>
  );
}

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImageType, setSelectedImageType] = useState('regular'); // 'regular' or 'banner'
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); // For carousel

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: selectedImageType // Add the selected type
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const bannerImages = images.filter(img => img.type === 'banner');
  const regularImages = images.filter(img => img.type === 'regular');

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#2c3e50', fontWeight: '800', mb: 5, textShadow: '1px 1px 3px rgba(0,0,0,0.15)', letterSpacing: 1 }}>Rasmlar va Bannerlar Galereyasi</Typography>
        
        {/* Rasm yuklash bo'limi */}
        <Paper elevation={8} sx={{ p: 5, mb: 6, borderRadius: 4, bgcolor: '#ffffff', border: '1px solid #dcdcdc', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', '&:hover': { boxShadow: 16, transform: 'translateY(-5px)' } }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2c3e50', fontWeight: '700', mb: 2.5, letterSpacing: 0.5 }}>Yangi rasm yuklash</Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: '80%' }}>Iltimos, yuklamoqchi bo'lgan rasmingiz turini tanlang (oddiy rasm yoki banner) va keyin rasmni tanlash uchun tugmani bosing.</Typography>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />} sx={{ mb: 3.5, py: 1.4, px: 5, fontSize: '1.15rem', borderRadius: 3, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', boxShadow: '0 5px 10px 2px rgba(33, 150, 243, .3)', transition: 'all 0.4s ease', '&:hover': { background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)', boxShadow: '0 8px 15px 3px rgba(33, 150, 243, .5)', transform: 'translateY(-3px)' } }}>
            Rasm yuklash
            <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
          </Button>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup row value={selectedImageType} onChange={(e) => setSelectedImageType(e.target.value)}>
              <FormControlLabel value="regular" control={<Radio size="medium" color="primary" />} label="Oddiy rasm" />
              <FormControlLabel value="banner" control={<Radio size="medium" color="primary" />} label="Banner uchun" />
            </RadioGroup>
          </FormControl>
        </Paper>

        {/* Bannerlar bo'limi */}
        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 3, borderBottom: '2px solid #5c6bc0', pb: 1.5, color: '#3f51b5', fontWeight: '700', letterSpacing: 0.5 }}>Bannerlar</Typography>
        {bannerImages.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ color: '#757575', fontStyle: 'italic', py: 4, bgcolor: '#ffffff', borderRadius: 2, boxShadow: 2 }}>Hali banner yuklanmagan.</Typography>
        ) : (
          <Box sx={{ position: 'relative', width: '100%', height: 450, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f4f8', borderRadius: 3, boxShadow: 8, transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', '&:hover': { boxShadow: 12 } }}>
            {bannerImages.length > 1 && (
              <IconButton
                onClick={handlePrevBanner}
                sx={{ position: 'absolute', left: 20, zIndex: 1, color: 'white', bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)', transform: 'scale(1.15)' }, p: 1.8, transition: 'all 0.3s ease', borderRadius: '50%' }}
              >
                <ArrowBackIosIcon fontSize="large" />
              </IconButton>
            )}
            <img
              src={bannerImages[currentBannerIndex].url}
              alt={bannerImages[currentBannerIndex].name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'inherit' }}
            />
            {bannerImages.length > 1 && (
              <IconButton
                onClick={handleNextBanner}
                sx={{ position: 'absolute', right: 20, zIndex: 1, color: 'white', bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)', transform: 'scale(1.15)' }, p: 1.8, transition: 'all 0.3s ease', borderRadius: '50%' }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            )}
            <Typography
              variant="body1"
              sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.7)', p: 1.2, px: 2.5, borderRadius: 2.5, fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.4)', fontSize: '1.05rem' }}
            >
              {bannerImages[currentBannerIndex].name} ({currentBannerIndex + 1} / {bannerImages.length})
            </Typography>
            {bannerImages.length > 1 && (
              <Box sx={{ position: 'absolute', bottom: 5, display: 'flex', gap: '5px', zIndex: 1 }}>
                {bannerImages.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: index === currentBannerIndex ? 'primary.main' : 'grey.500',
                      opacity: index === currentBannerIndex ? 1 : 0.6,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => setCurrentBannerIndex(index)}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Oddiy rasmlar bo'limi */}
        <Typography variant="h5" gutterBottom sx={{ mt: 7, mb: 3, borderBottom: '2px solid #5c6bc0', pb: 1.5, color: '#3f51b5', fontWeight: '700', letterSpacing: 0.5 }}>Oddiy rasmlar</Typography>
        {regularImages.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ color: '#757575', fontStyle: 'italic', py: 4, bgcolor: '#ffffff', borderRadius: 2, boxShadow: 2 }}>Hali oddiy rasm yuklanmagan.</Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {regularImages.map((img, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0', transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', '&:hover': { transform: 'translateY(-10px)', boxShadow: 12, }, cursor: 'pointer' }}>
                  <img src={img.url} alt={img.name} style={{ width: '100%', height: 230, objectFit: 'cover' }} />
                  <Typography align="center" variant="subtitle1" sx={{ p: 1.8, bgcolor: '#f8f8f8', fontWeight: '600', color: '#333', borderTop: '1px solid #eee' }}>{img.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Box sx={{ bgcolor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%)', boxShadow: 6, py: 1.5 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '700', letterSpacing: 1.2, color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Rasm va Banner Galereyasi</Typography>
          {loggedIn && <Button color="inherit" onClick={() => setLoggedIn(false)} sx={{ fontWeight: 'bold', px: 2.5, borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid white' } }}>Chiqish</Button>}
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        {!loggedIn ? <Login onLogin={() => setLoggedIn(true)} /> : <Gallery />}
      </Box>
    </Box>
  );
}

export default App;
