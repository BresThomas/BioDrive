import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

export default function AppNumPad({ onValueChange }) {
  const [value, setValue] = useState('');

  const handleButtonClick = (input) => {
    if (input === 'Del') {
      setValue((prevValue) => prevValue.slice(0, -1));
    } else if (input === 'C') {
      setValue('');
    } else if (input === '=') {
      onValueChange(value);
    } else if (input === 'carte') {
      onValueChange(value);
    } else {
      setValue((prevValue) => prevValue + input);
    }
  };

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <Card sx={{ width: '340px', height: '500px' }}>
      <Grid container spacing={2} alignItems="center" ml={1} mt={2} mr={1}>
        <Grid item mr={-1}>
          <TextField
            fullWidth
            label="Montant"
            variant="outlined"
            value={value}
            onChange={(e)=>handleChange(e)}
            sx={{ width: '285px', height: '100px' }}
          />
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={1}>
            {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', 'Del'], ['C', 'carte', '=']].map((row, index) => (
              <Stack key={index} direction="row" spacing={1} justifyContent="center">
                {row.map((button) => (
                  <Button
                    key={button}
                    variant="contained"
                    onClick={() => handleButtonClick(button)}
                    sx={{ width: '90px', height: '45px' }} 
                  >
                    {button}
                  </Button>
                ))}
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

AppNumPad.propTypes = {
  onValueChange: PropTypes.func.isRequired,
};
