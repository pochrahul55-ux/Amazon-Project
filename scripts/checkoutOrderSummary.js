import { cart } from "../data/cart.js";
import { getMatchingProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { getDeliveryOptionId } from "../data/deliveryOptions.js";

export function orderSummary() {
  let itemsTotal = 0;
  let shippingCosts = 0;
  let totalBeforeTaxes;
  let estimatedTax;
  let orderTotal;

  cart.forEach((cartItem) => {
    const matchingProduct = getMatchingProduct(cartItem);
    itemsTotal += matchingProduct.priceCents * cartItem.quantity; 

    const matchedDeliveryOption = getDeliveryOptionId(cartItem);
    shippingCosts += matchedDeliveryOption.priceCents;

    totalBeforeTaxes = itemsTotal + shippingCosts;

    estimatedTax = totalBeforeTaxes * 0.1;

    orderTotal = totalBeforeTaxes + estimatedTax;
  });

  const orderSummaryHTML = /*html*/ `
      
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${formatCurrency(itemsTotal)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingCosts)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `
  document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;
}