import { cart, loadFromStorage } from "../../data/cart.js";
import { getMatchingProduct } from "../../data/products.js";

describe('test suite: getMatchingProduct', () => {
  it('Should find a matching product', () => {
    const cartItem = 
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '2'
    }
    const matchingProduct = getMatchingProduct(cartItem);
    expect(matchingProduct.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  }); 

  it('Should return undefined if the product id is not found', () => {
    const cartItem = 
    {
      productId: 'invalid-product-id',
      quantity: 2,
      deliveryOptionsId: '2'
    }
    const matchingProduct = getMatchingProduct(cartItem);
    expect(matchingProduct).toEqual(undefined);
  });
});