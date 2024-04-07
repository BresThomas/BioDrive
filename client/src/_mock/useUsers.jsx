import { useEffect, useState } from 'react';
import { sample } from 'lodash';

export function useClientsData() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/clients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setClients(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return clients;
}

export function useUsers() {
  const clients = useClientsData();

  return clients.map((client, index) => ({
    id: client.id_client,
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: `${client.nom} ${client.prenom}`,
    phone: client.numero_portable,
    adresse: client.adresse,
    date_naissance: client.date_naissance,
    id_compte_energie: client.id_compte_energie,
  }));
}
