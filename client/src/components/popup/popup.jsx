import React, { useState } from 'react';
import { Ring } from 'react-loading';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return ((<Grid xs={12.4} md={12.6} lg={12.4}>
                  <Card
                    sx={{
                      p: 3,
                      width: 1,
                    }}
                    >
                    <Typography variant="h3">Paiement en attente</Typography>
                    <Ring color="#123abc" size={50} />
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
