class Product {
  constructor(id, type, nom, prixClient, prixFournisseur) {
    (this.id = id),
      (this.type = type),
      (this.nom = nom),
      (this.prixClient = prixClient),
      (this.prixFournisseur = prixFournisseur);
  }
}

module.exports = Product;
