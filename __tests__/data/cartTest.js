import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

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