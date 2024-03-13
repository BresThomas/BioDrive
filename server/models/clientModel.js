class Client {
    constructor(id_client, nom, prenom, adresse, date_naissance, numero_portable, id_compte_energie) {
        this.id_client = id_client;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.date_naissance = date_naissance;
        this.numero_portable = numero_portable;
        this.id_compte_energie = id_compte_energie;
    }
}

export default Client;
