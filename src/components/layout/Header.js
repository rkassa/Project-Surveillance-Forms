import React from 'react';
import {Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar } from '@material-ui/core';
import {
  renderSelectField
} from '../form/form-util';

const Header = ({user, onLanguageSelect, lang, langCode, classes}) => {
  const handleLanguageChange = (e) => {
    onLanguageSelect(e.target.value);
    document.documentElement.lang = e.target.value;
  }

  const renderLanguageSelector = () => {
    const choices = [
      { label: lang.t('language.english'), value: 'en' },
      { label: lang.t('language.amharic'), value: 'am' },
    ]
    return (
      <div>
        <FormControl
        fullWidth
        size="small"
        id="languageSelector"
        >
          <Select
            value={langCode}
            onChange={handleLanguageChange}
            labelId="lang"
          >
            {choices.map((c, index) => (
              <MenuItem key={index} value={c.value} >
                <Typography style={{color: '#ffffff', fontSize: 14}}>{c.label}</Typography>
              </MenuItem>
            ))}
          </Select>
      </FormControl>
      </div>
    )
  }

  return (
    <AppBar position="static" style={{ color: 'white', backgroundColor: '#0040B7', justifyContent: 'middle' }}>
      <Toolbar variant="dense">
        <img src="/Flag.png" style={{ verticalAlign: 'middle', marginRight: 10 }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>{lang.t('officalWebsite')}</Typography>
        {renderLanguageSelector()}
      </Toolbar>
    </AppBar>
    // <Box py={1} pl={4} pr={7} style={{ color: 'white', backgroundColor: '#0944B4' }}>
     
    // </Box>
  );
};

export default Header;
