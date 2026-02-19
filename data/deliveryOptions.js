import { cart } from "./cart.js";

export const deliveryOptions = [
  {
    deliveryOptionId: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    deliveryOptionId: '2',
    deliveryDays: 5,
    priceCents: 499
  },
  {
    deliveryOptionId: '3',
    deliveryDays: 2,
    priceCents: 999
  }
]

export function getDeliveryOptionId(cartItem) {
  const matchedDeliveryOption = 
    deliveryOptions.find(option => option.deliveryOptionId === cartItem.deliveryOptionsId);
  
  return matchedDeliveryOption;
}