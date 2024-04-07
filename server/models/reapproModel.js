class Reappro {
    constructor(id_reappro, id_produit, quantite, adresse_livraison, date_livraison, prix) {
        this.id_reappro = id_reappro;
        this.id_produit = id_produit;
        this.quantite = quantite;
        this.adresse_livraison = adresse_livraison
        this.date_livraison = date_livraison
        this.prix = prix
    }
}

module.exports = Reappro;
