export default class Cart {
  constructor() {
    this.cart = new Map();
    this.itemCount = 0;
    this.total = 0;
  }

  addItem(product) {
    if (this.cart.has(product.id)) {
      this.cart.set(product.id, this.cart.get(product.id) + 1);
    } else {
      this.cart.set(product.id, 1);
    }
    this.itemCount += 1;
    this.total += product.prixClient;
  }

  removeItem(product) {
    if (this.cart.has(product.id)) {
      if (this.cart.get(product.id) === 1) {
        this.cart.delete(product.id);
      } else {
        this.cart.set(product.id, this.cart.get(product.id) - 1);
      }
      this.itemCount -= 1;
      this.total -= product.prixClient;
    }
  }

  getCart() {
    return this.cart;
  }

  getItemCount() {
    return this.itemCount;
  }

  getTotal() {
    return this.total;
  }

  getSize() {
    return this.cart.size;
  }

  clearCart() {
    this.cart.clear();
    this.itemCount = 0;
    this.total = 0;
  }
}
