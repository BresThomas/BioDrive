import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton  from '@mui/material/IconButton';

import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return ((<Grid xs={12.4} md={12.6} lg={12.4}>
    <Card sx={{ p: 3, width: 1 }}>
      <Typography variant="h3">Paiement en attente</Typography>

      <LoadingButton
        sx={{ width: '22.5%' }}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={togglePopup}
      >
        close
      </LoadingButton>
    </Card>
  </Grid>
  ));
};

export default Popup;
