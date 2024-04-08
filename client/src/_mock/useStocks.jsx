import { useEffect, useState } from 'react';
import { sample } from 'lodash';

export function useStocksData() {
  const [stocks, setStock] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/Stocks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setStock(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return stocks;
}

export function useStocks() {
  const stocks = useStocksData();

  return stocks.map((stock, index) => ({
    id: stock.id_stock,
    produit : stock.produit,
    quantité : stock.quantité,
  }));
}
