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

function useTransactionsData() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/transactions/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de transaction');
        }
        return response.json();
      })
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return transactions;
}

function usePaiementsData() {
  const [paiement, setPaiement] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/paiements/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de paiement');
        }
        return response.json();
      })
      .then(data => {
        setPaiement(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return paiement;
}

export function useUsers() {
  const clients = useClientsData();
  const transactionsData = useTransactionsData();
  const paiementsData = usePaiementsData();

  return clients.map((client, index) => ({
    id: client.id_client, // viens de clients
    avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
    name: `${client.nom} ${client.prenom}`, // viens de clients
    phone: client.numero_portable, // viens de clients
    adresse: client.adresse, // viens de clients
    date_naissance: client.date_naissance, // viens de clients
    id_compte_energie: client.id_compte_energie, // viens de comptesEnergie
    transactions: transactionsData.map(transaction => `[ID transaction: ${transaction.id_transaction}, Paiement : ${transaction.paiement}]`).join(', '),
    paiements: paiementsData.map(paiement => `[Type de paiement : ${paiement.type}, Somme : ${paiement.somme}]`).join(', '),
  }));
}


