import React, { useState } from 'react';
import { Typography, Stack, TextField, Modal, Button, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const Boutique = () => {
  const [horaires, setHoraires] = useState({ horaireDebut: '', horaireFin: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const updateHoraireBoutique = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/updateHorairesBoutique/ry7f3x5cGAeF3PJELTN1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(horaires)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des horaires de la boutique');
      }
      console.log('Horaires de la boutique mis à jour avec succès');
      setModalOpen(true); // Ouvre le modal après la mise à jour réussie
      setHoraires({ horaireDebut: '', horaireFin: '' }); // Vide le formulaire
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHoraires({ ...horaires, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHoraireBoutique();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h6" sx={{ width: '30%' }}>Changer les horaires de la boutique ⏰</Typography>
          <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '70%' }}>
            <TextField name="horaireDebut" label="Horaire début (ex: 08:00)" sx={{ width: '50%' }} value={horaires.horaireDebut} onChange={handleInputChange}/>
            <TextField name="horaireFin" label="Horaire fin (ex: 18:00)" sx={{ width: '50%' }} value={horaires.horaireFin} onChange={handleInputChange}/>
          </Stack>
          <LoadingButton
            sx={{ width: '15%' }}
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            Ajouter
          </LoadingButton>
        </Stack>
      </form>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: 'absolute',
            width: 400,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Horaires mis à jour
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Les horaires de la boutique ont été mis à jour avec succès.
          </Typography>
          <Button sx={{ mt: 1 }} onClick={handleCloseModal}>Fermer</Button>
        </Card>
      </Modal>
    </>
  );
};

export default Boutique;
