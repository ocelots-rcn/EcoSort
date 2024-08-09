import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageContext from './LanguageContext';
import { useDataContext } from './DataProvider'; // Import DataProvider context hook

const Header = ({ onNewBin }) => {
  const { translation, setLanguage } = useContext(LanguageContext);
  const { groupingLabels, checkGrouping } = useDataContext(); // Access groupingLabels and checkGrouping from DataProvider
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [currentGrouping, setCurrentGrouping] = useState('Select Grouping');
  const [selectedIndex, setSelectedIndex] = useState(null); // To track selected index

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

  const handleNewBinClick = () => {
    onNewBin();
  };

  const handleGroupingSelect = (index) => {
    setCurrentGrouping(groupingLabels[index]);
    setSelectedIndex(index); // Set the selected index
    handleMenuClose();
    // Trigger the assessment check with the selected index
    checkGrouping(index);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Button 
              onClick={handleNewBinClick} 
              variant="contained" 
              sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
            >
              {translation.newBin}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleMenuClick}
              >
                {currentGrouping}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {groupingLabels && groupingLabels.length > 0 ? (
                  groupingLabels.map((grouping, index) => (
                    <MenuItem 
                      key={grouping} 
                      onClick={() => handleGroupingSelect(index)} // Pass the index
                    >
                      {grouping}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No groupings available</MenuItem>
                )}
              </Menu>
            </Box>
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