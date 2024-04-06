import React, { useState } from 'react';
import { Typography, Stack, TextField, Modal, Button, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const AjouterClient = () => {
  const [formDataClient, setFormDataClient] = useState({
    email: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse_post: '',
    date_naissance: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

  const updateHoraireAjouterClient = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/newClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formDataClient.email,
          nom: formDataClient.nom,
          id_compte_energie: "",
          prenom: formDataClient.prenom,
          date_naissance: formDataClient.date_naissance,
          numero_portable: formDataClient.tel,
          adresse: formDataClient.adresse_post,
        })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des horaires de la AjouterClient');
      }
      console.log('Horaires de la AjouterClient mis à jour avec succès');
      setModalOpen(true); // Ouvre le modal après la mise à jour réussie
      setFormDataClient({ // Vide le formulaire
        email: '',
        nom: '',
        prenom: '',
        tel: '',
        adresse_post: '',
        date_naissance: ''
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeClient = (e) => {
    const { name, value } = e.target;
    setFormDataClient({ ...formDataClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHoraireAjouterClient();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h6" sx={{ width: '25%' }}>Ajouter un Client 👤</Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <TextField name="email" value={formDataClient.email} label="Email" sx={{ width: '40%' }} onChange={handleChangeClient}/>
            <TextField name="nom" value={formDataClient.nom} label="Nom" sx={{ width: '40%' }} onChange={handleChangeClient}/>
            <TextField name="prenom" value={formDataClient.prenom} label="Prénom" sx={{ width: '40%' }} onChange={handleChangeClient}/>
            <TextField name="tel" value={formDataClient.tel} label="Tel." sx={{ width: '40%' }} onChange={handleChangeClient}/>
            <TextField name="adresse_post" value={formDataClient.adresse_post} label="Adresse Post." sx={{ width: '40%' }} onChange={handleChangeClient}/>
            <TextField name="date_naissance" value={formDataClient.date_naissance} label="Date de Naissance" sx={{ width: '40%' }} onChange={handleChangeClient}/>
          </Stack>
          <LoadingButton
            sx={{ width: '22.5%' }}
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            Submit
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
          Le client a été ajoutée avec succès.
          </Typography>
          <Button sx={{ mt: 1 }} onClick={handleCloseModal}>Fermer</Button>
        </Card>
      </Modal>
    </>
  );
};

export default AjouterClient;
