import { useEffect, useState } from 'react';
import { sample } from 'lodash';

export function useIncidentData() {
  const [incidents, setIncident] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/Incidents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setIncident(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return incidents;
}

export function useIncidents() {
  const incidents = useIncidentData();

  return incidents.map((incident, index) => ({
    id: incident.id_incident,
    gravite: incident.gravite,
    date: incident.date,
    intitule: incident.intitule,
    description: incident.description,
  }));
}
