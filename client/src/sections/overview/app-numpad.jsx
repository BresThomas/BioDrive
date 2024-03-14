import React, { useState } from 'react';
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
      // Supprime le dernier caractère de la valeur
      setValue((prevValue) => prevValue.slice(0, -1));
    } else if (input === 'C') {
      // Efface la valeur
      setValue('');
    } else if (input === '=') {
      // Si l'utilisateur appuie sur '=', passe la valeur à la fonction de rappel
      onValueChange(value);
    } else if (input === 'carte') {
      // Si l'utilisateur appuie sur '=', passe la valeur à la fonction de rappel
      onValueChange(value);
    } else {
      // Ajoute l'entrée à la valeur actuelle
      setValue((prevValue) => prevValue + input);
    }
  };

  return (
    <Card sx={{ width: '260px', height: '325px' }}> 
      <Grid container spacing={2} alignItems="center" m={0.15}>
        <Grid item mr={-1}>
            <TextField
            fullWidth
            label="Montant"
            variant="outlined"
            value={value}
            InputProps={{
                readOnly: true,
            }}
            />
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={1}>
            {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', 'Del'], ['C', 'carte', '=']].map((row, index) => (
              <Stack key={index} direction="row" spacing={1} justifyContent="center">
                {row.map((button) => (
                  <Button key={button} variant="contained" onClick={() => handleButtonClick(button)}>
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
