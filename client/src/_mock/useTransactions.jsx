import { useEffect, useState } from 'react';
import { sample } from 'lodash';

export function useTransactionsData() {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/Transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setTransaction(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return transactions;
}

export function useTransactions() {
  const transactions = useTransactionsData();

  return transactions.map((transaction, index) => ({
    id: transaction.id_stock,
    produit : transaction.produit,
    quantité : transaction.quantité,
  }));
}
