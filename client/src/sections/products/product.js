export default class Product {
    constructor(id,nom,prixClient,prixFournisseur,type) {
        this.id = id;
        this.nom = nom;
        this.prixClient = prixClient;
        this.prixFournisseur = prixFournisseur;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getPrixClient() {
        return this.prixClient;
    }

    getPrixFournisseur() {
        return this.prixFournisseur;
    }

    getType() {
        return this.type;
    }
}