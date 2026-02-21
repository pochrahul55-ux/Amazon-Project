import { loadFromStorage, removeFromCart, updateCartInArray } from "../../data/cart.js";
import { orderSummary } from "../../scripts/checkoutOrderSummary.js";
import { cart } from "../../data/cart.js";
import { checkoutProducts } from "../../scripts/checkoutProducts.js";

describe('test suite: orderSummary', () => {
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
    });
    loadFromStorage();
    document.body.innerHTML = 
      `<div class="js-payment-summary"></div>
      <div class="js-order-summary"></div>
      <div class="js-return-to-home-link"></div>`
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should calculate order summary', () => {
    checkoutProducts();
    const html = document.querySelector('.js-payment-summary').innerHTML;
    expect(html).toContain('$42.75');
    expect(html).toContain('$42.75');
    expect(html).toContain('$47.74');
    expect(html).toContain('$4.77');
    expect(html).toContain('$52.51');
  });

  it('should recalculate order summary after removing a product', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    orderSummary();
    const html = document.querySelector('.js-payment-summary').innerHTML;
    expect(html).toContain('Items (1)');
    expect(html).toContain('$20.95');
    expect(html).toContain('$0.00');
    expect(html).toContain('$20.95');
    expect(html).toContain('$2.10');
    expect(html).toContain('$23.05');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
  });

  it('Should not remove product when confirm is false', () => {
    checkoutProducts();
    window.confirm = jest.fn().mockReturnValue(false);
    document.querySelector('.js-delete-quantity-link').click();
    expect(cart.length).toEqual(2);
  });

  it('Should recalculate order summary after updating the cart quantity', () => {
    updateCartInArray('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 4);
    orderSummary();
    const html = document.querySelector('.js-payment-summary').innerHTML;
    expect(html).toContain('Items (5)');
    expect(html).toContain('$64.55');
    expect(html).toContain('$4.99');
    expect(html).toContain('$69.54');
    expect(html).toContain('$6.95');
    expect(html).toContain('$76.49');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(4);
  });
});