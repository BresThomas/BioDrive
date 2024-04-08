import { useEffect, useState } from 'react';
import { sample } from 'lodash';

export function usePompesData() {
  const [pompes, setPompes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/pompes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setPompes(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return pompes;
}

export function usePompes() {
  const pompes = usePompesData();

  return pompes.map((pompe, index) => ({
    id: pompe.id_pompe,
    carburants: pompe.carburants,
    isRunning: pompe.isRunning
  }));
}
