export let cart = JSON.parse(localStorage.getItem('cart')) ?? [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
]

function saveStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  const matchingProduct = cart.find(cartItem => cartItem.productId === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
      cart.push({
      productId,
      quantity
    });
  }
   saveStorage();
}

export function removeFromCart(productId) {
  let newCart = cart.filter((cartItem) => cartItem.productId !== productId);
  cart = newCart;

  saveStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
     cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

