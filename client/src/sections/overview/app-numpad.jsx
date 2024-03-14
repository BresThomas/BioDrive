import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import grey from '@mui/material/colors/grey';


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
    } else {
      // Ajoute l'entrée à la valeur actuelle
      setValue((prevValue) => prevValue + input);
    }
  };

  return (
    <Box sx={{ width: '200px', height: '300px' }}> {/* Ajout des propriétés width et height */}
      <Grid container spacing={2} alignItems="center">
        <Grid item mr={-1}>
          
<TextField
  fullWidth
  label=""
  variant="outlined"
  value={value}
  InputProps={{
    readOnly: true,
    style: {backgroundColor: 'white' },
  }}
/>
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={1}>
            {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', 'Del']].map((row, index) => (
              <Stack key={index} direction="row" spacing={1} justifyContent="center"> {/* Ajout de justifyContent */}
                {row.map((button) => (
                  <Button key={button} variant="contained" onClick={() => handleButtonClick(button)}>
                    {button}
                  </Button>
                ))}
              </Stack>
            ))}
            <Stack direction="row" spacing={1} justifyContent="center"> {/* Ajout de justifyContent */}
              <Button variant="contained" onClick={() => handleButtonClick('C')}>
                C
              </Button>
              <Button variant="contained" onClick={() => handleButtonClick('=')}>
                =
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

AppNumPad.propTypes = {
  onValueChange: PropTypes.func.isRequired,
};
