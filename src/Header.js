import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Typography, Box, Grid,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import translations from './translations'; // Import translations

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      setLanguage(browserLang);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuClick = (event) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleLangMenuClose();
  };

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Button onClick={handleClick} variant="contained" sx={{ backgroundColor: '#8bc34a', color: '#fff' }}>
              {translations[language].newBin}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#8bc34a', color: '#fff', marginLeft: '75%' }}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleMenuClick}
              >
                {translations[language].feature}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>{translations[language].feature1}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{translations[language].feature2}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{translations[language].feature3}</MenuItem>
              </Menu>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleLangMenuClick}
            >
              {translations[language].language}
            </Button>
            <Menu
              anchorEl={langAnchorEl}
              open={Boolean(langAnchorEl)}
              onClose={handleLangMenuClose}
            >
              <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

