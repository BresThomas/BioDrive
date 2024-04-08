import React, { useState } from 'react';
import { Typography, Stack, TextField, Modal, Button, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const AjouterCompteEnergieForm = () => {
  const [newCompteEnergie, setNewCompteEnergie] = useState({
    solde: '',
    id_avantage: 'nUfLHqvPEszwbzBZkenP'
  });
  const [modalOpen, setModalOpen] = useState(false);

  const addNewCompteEnergie = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/newCompteEnergie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompteEnergie)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du compte énergie');
      }
      console.log('Compte énergie ajouté avec succès');
      setModalOpen(true); // Ouvre le modal après l'ajout réussi
      // Réinitialise le formulaire après l'ajout réussi
      setNewCompteEnergie({
        solde: '',
        id_avantage: ''
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompteEnergie({ ...newCompteEnergie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCompteEnergie();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h6" sx={{ width: '70%' }}>Ajouter un nouveau compte énergie 🔋</Typography>
          <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '30%' }}>
          <TextField name="solde" label="Solde" value={newCompteEnergie.solde} onChange={handleInputChange}/>
          </Stack>
          <LoadingButton
            sx={{ width: '20%' }}
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
            Compte énergie ajouté
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Le nouveau compte énergie a été ajouté avec succès.
          </Typography>
          <Button sx={{ mt: 1 }} onClick={handleCloseModal}>Fermer</Button>
        </Card>
      </Modal>
    </>
  );
};

export default AjouterCompteEnergieForm;
