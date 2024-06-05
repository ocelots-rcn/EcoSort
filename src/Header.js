import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
      <Toolbar>
        <Button onClick ={handleClick} variant="contained" sx={{ backgroundColor: '#8bc34a', color: '#fff', marginRight: 'auto' }}>
          New Bin
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#8bc34a', color: '#fff' }}
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMenuClick}
        >
          Feature
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Feature 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Feature 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Feature 3</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

