export default class Cart {
  constructor(cart = new Map()) {
    this.items = cart;
    if (cart.size === 0) {
      this.itemCount = 0;
      this.total = 0;
    } else {
      this.updateCart();
    }
  }

  hasItem(productId) {
    return this.items instanceof Map ? this.items.has(productId) : null;
  }

  addItem(product) {
    if(this.items instanceof Map) {
      if (this.hasItem(product)) {
        this.items.set(product, this.items.get(product) + 1);
      } else {
        this.items.set(product, 1);
      }
    }
    this.updateCart();
  }

  removeItem(productId) {
    if (this.hasItem(productId)) {
      this.itemCount -= this.items.get(productId);
      this.total -= this.items.get(productId) * productId.prixClient;
      this.items.delete(productId);
    }
  }

  setQuantity(productId, quantity) {
    if (this.hasItem(productId)) {
      this.items.set(productId, quantity);
      this.updateCart();
    }
  }

  updateCart() {
    this.itemCount = 0;
    this.total = 0;
    if (this.items instanceof Map) {
      this.items.forEach((quantity, product) => {
        this.itemCount += quantity;
        this.total += quantity * product.prixClient;
      });
    }
  }
  
  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.itemCount;
  }

  getTotal() {
    return this.total;
  }

  getSize() {
    return this.items.size;
  }

}
