class Product {
    constructor(id, type, nom, prixClient, prixFournisseur, test) {
      (this.id = id),
      (this.type = type),
      (this.nom = nom),
      (this.prixClient = prixClient),
      (this.prixFournisseur = prixFournisseur)
    }
  }
  
  export default Product;