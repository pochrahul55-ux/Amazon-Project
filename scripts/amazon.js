import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";

cartQuantity();

function renderProducts() {
let renderProductsHTML = '';
products.forEach((product) => {
  renderProductsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
  });
  return renderProductsHTML;
}
document.querySelector('.js-products-grid').innerHTML = renderProducts();

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
        const {productId} = btn.dataset;
        showAddedToCartMessage(productId);
        selectProductQuantity(productId);
        cartQuantity();
    });
  });

let timeOutId = {};
function showAddedToCartMessage(productId) {
  if (timeOutId[productId]) clearTimeout(timeOutId[productId]);

  document.querySelector(`.js-added-to-cart-${productId}`)
      .classList.add('added-to-cart-visible');

  timeOutId[productId] = setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`)
      .classList.remove('added-to-cart-visible');
  }, 2000);
}

function selectProductQuantity(productId) {
  const selectQuantity = document.querySelector(`.js-product-quantity-${productId}`)
  const quantity = Number(selectQuantity.value);
  
  addToCart(productId, quantity);
}

function cartQuantity() {
  document.querySelector('.js-cart-quantity').innerText = calculateCartQuantity();
}