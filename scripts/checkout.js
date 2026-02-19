import { products, getMatchingProduct } from "../data/products.js";
import { 
  cart, 
  calculateCartQuantity, 
  removeFromCart, 
  updateCartInArray,
  updateCartDeliveryOption,
} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions, getDeliveryOptionId } from "../data/deliveryOptions.js";
import dayJs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

checkoutProducts();

export function checkoutProducts() {
  showCheckoutItems();
  let renderProductsHTML = '';

  cart.forEach((cartItem) => {
    const deliveryOption = getDeliveryOptionId(cartItem);

    const today = dayJs();
    const deliveryDays = today.add(deliveryOption.deliveryDays, 'day');
    const formatDate = deliveryDays.format('dddd, MMMM, D');

    const matchingProduct = getMatchingProduct(cartItem)

    renderProductsHTML += /*html*/ `
        <div class="cart-item-container js-cart-item-container"
          data-product-id="${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${formatDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>

                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary
                  js-update-quantity-link" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input type="number" class="input-quantity js-input-quantity">
                  <span class="save-quantity link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${showDeliveryOptions(cartItem, matchingProduct)}
              </div>
            </div>
        </div>
      `
  });
  document.querySelector('.js-order-summary').innerHTML = renderProductsHTML;

  function showCheckoutItems() {
    document.querySelector('.js-return-to-home-link').innerHTML = 
      `${calculateCartQuantity()} items`;
  }

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {
        const {productId} = deleteLink.dataset;
        removeFromCart(productId);
        showCheckoutItems();
        document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`).remove();
      });
    });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
        const {productId} = updateLink.dataset;
        updateCartQuantity(productId);   
      });
    });

  document.querySelectorAll('.js-save-quantity')
  .forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const {productId} = saveLink.dataset;
      saveCartQuantity(productId);
    });
  });

  function updateCartQuantity(productId) {
    const productContainer = 
        document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`);
    const currentQuantity = 
      productContainer.querySelector('.js-quantity-label').textContent;
      
    productContainer.querySelector('.js-input-quantity').value = currentQuantity; 
    productContainer.classList.add('is-editing');
  }

  function saveCartQuantity(productId) {
    const container = 
      document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`);
    const quantity = Number(container.querySelector('.js-input-quantity').value);

    if (quantity <= 0 || quantity >=1000 || isNaN(quantity)) {
      return alert('Please enter the quantity between 0 and 1000.');
    }

    updateCartInArray(productId, quantity);

    container.classList.remove('is-editing'); 
    container.querySelector('.js-quantity-label').textContent = quantity;

    showCheckoutItems();
  }

  document.querySelectorAll('.js-input-quantity')
  .forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const productId = 
          input.closest('.js-cart-item-container').dataset.productId;
        saveCartQuantity(productId);
      }
    });
  });

  function showDeliveryOptions(cartItem, matchingProduct) {
    let renderDeliveryOptionsHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayJs();
      const deliveryDays = today.add(deliveryOption.deliveryDays, 'day');
      const formatDate = deliveryDays.format('dddd, MMMM, D');

      const deliveryCost = deliveryOption.priceCents === 0 
        ? 'FREE Shipping' 
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.deliveryOptionId === cartItem.deliveryOptionsId;

      renderDeliveryOptionsHTML += /*html*/ `
          <div class="delivery-option js-delivery-option"
           data-product-id="${matchingProduct.id}"
           data-delivery-option-id="${deliveryOption.deliveryOptionId}">
            <input type="radio" class="delivery-option-input"         
              ${isChecked ? 'checked': ''}
             name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                ${formatDate}
              </div>
              <div class="delivery-option-price">
                ${deliveryCost}
              </div>
            </div>
          </div>
      `
    });
    return renderDeliveryOptionsHTML;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryOption) => {
      deliveryOption.addEventListener('click', () => {
        const {productId, deliveryOptionId} = deliveryOption.dataset;
        updateCartDeliveryOption(productId, deliveryOptionId);
        checkoutProducts();
      });
    })
}
