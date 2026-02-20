import { 
  addToCart, 
  cart, 
  loadFromStorage, 
  removeFromCart,
  updateCartDeliveryOption,
  updateCartInArray,
  calculateCartQuantity
 } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify([]);
    });
    jest.spyOn(Storage.prototype, 'setItem');
    loadFromStorage();
  });

  it ('Should add an existing product to the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionsId: '1'
      }])
    );
  });
  
  it ('Should add a new product to the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '1'
      }])
    );
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '2'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }]) 
      }
    );     
    jest.spyOn(Storage.prototype, 'setItem');
    loadFromStorage();
});
  
  it ('Should delete a product from the cart', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    );
  });

  it ('Should not delete a product that is not in the cart', () => {
    removeFromCart('product-not-in-cart');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '2'
      }, {
         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    );
  });
});

describe('test suite: updateCartDeliveryOption', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '2'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    });
    jest.spyOn(Storage.prototype, 'setItem');
    loadFromStorage();
  });

  it ('Should update the delivery id', () => {
    updateCartDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].deliveryOptionsId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '3'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    );
  });
});

describe('test suite: updateCartInArray', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '2'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    });
    jest.spyOn(Storage.prototype, 'setItem');
    loadFromStorage();
  });

  it ('Should update the quantity in the cart', () => {
    updateCartInArray('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionsId: '2'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '1'
      }])
    );
  });
});

describe('test suite: calculateCartQuantity', () => {
  jest.restoreAllMocks();

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify([])
    });
    loadFromStorage();
  });

  it ('Should calculate the cart quantity', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
    expect(calculateCartQuantity()).toEqual(3);
  });

  it ('Should return 0 if the cart is empty', () => {
    expect(calculateCartQuantity()).toEqual(0);
  });
});