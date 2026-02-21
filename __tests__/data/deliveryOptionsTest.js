import { deliveryOptions, getDeliveryOptionId, calculateBusinessDays} from "../../data/deliveryOptions.js";
import dayjs from 'dayjs'; 

describe('test suite: getDeliveryOptionId', () => {
  it ('Should return matching delivery option', () => {
     const cartItem = {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '2'
    }
    const result = getDeliveryOptionId(cartItem);
    expect(result).toEqual(deliveryOptions[1]);
    expect(result.deliveryOptionId).toEqual('2');
  });

  it ('Should return undefined if the deliveryOptionId is invalid', () => {
    const cartItem = {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '999'
    }
    const result = getDeliveryOptionId(cartItem);
    expect(result).toEqual(undefined);
  });
});

describe('test suite: calculateBusinessDays', () => {
  it ('Should calculate only business days', () => {
    const today = dayjs('2026-01-09');
    const daysToDeliver = 3;

    const date = calculateBusinessDays(today, daysToDeliver);
    expect(date.day()).toEqual(3);
  });
});