import React, { useContext, useState } from 'react';

import { AppBar, Toolbar, Button, Menu, MenuItem, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import LanguageContext from './LanguageContext';
import { useDataContext } from './DataProvider'; // Import DataProvider context hook

const Header = () => {
  const { translation, translateBlock, setLanguage } = useContext(LanguageContext);
  const {groupings, currentGrouping, setCurrentGrouping, createNewBin} = useDataContext(); // Access groupingLabels and checkGrouping from DataProvider
  const [langAnchorEl, setLangAnchorEl] = useState(null);

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

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
      <Toolbar sx={{ marginTop: 1}}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Button 
              onClick={createNewBin} 
              variant="contained" 
              sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
            >
              {translation.newBin}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="grouping-label">{translation['selectGrouping']}</InputLabel>
                <Select
                    sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
                    labelId="grouping-label"
                    value={currentGrouping}
                    onChange={(event) => setCurrentGrouping(event.target.value)}>
                    {Object.keys(groupings).map((group) =>
                        <MenuItem key={group} value={group}>{translateBlock(groupings[group].label)}</MenuItem>
                    )}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleLangMenuClick}
            >
              {translation.language}
            </Button>
            <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={handleLangMenuClose}>
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