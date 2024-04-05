import React, { useState } from 'react';
import { Typography, Card, Stack, TextField, Modal, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const AjouterTache = () => {
  const [tache, setTache] = useState({ libelle: '', dateButoire: '', assigne: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const ajouterTache = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/newTache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tache)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la tâche');
      }
      console.log('Tâche ajoutée avec succès');
      setModalOpen(true); // Ouvre le modal après l'ajout réussi
      setTache({ libelle: '', dateButoire: '', assigne: '' }); // Vide le formulaire
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTache({ ...tache, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ajouterTache();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h6" sx={{ width: '15%' }}>Ajouter une Tâche 📝</Typography>
          <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '70%' }}>
            <TextField name="libelle" label="Libellé" sx={{ width: '33%' }} value={tache.libelle} onChange={handleInputChange}/>
            <TextField name="dateButoire" label="Date Butoire" sx={{ width: '33%' }} value={tache.dateButoire} onChange={handleInputChange}/>
            <TextField name="assigne" label="Assigné" sx={{ width: '33%' }} value={tache.assigne} onChange={handleInputChange}/>
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
            Tâche ajoutée
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            La tâche a été ajoutée avec succès.
          </Typography>
          <Button sx={{ mt: 1 }} onClick={handleCloseModal}>Fermer</Button>
        </Card>
      </Modal>
    </>
  );
};

export default AjouterTache;
