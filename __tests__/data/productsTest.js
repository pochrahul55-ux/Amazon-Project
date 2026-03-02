import { getMatchingProduct } from "../../data/products.js";
import { Product, ClothingProduct, ApplianceProduct } from "../../data/products.js";

describe('test suite: getMatchingProduct', () => {
  it('Should find a matching product', () => {
    const cartItem = 
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '2'
    };
    const matchingProduct = getMatchingProduct(cartItem);
    expect(matchingProduct.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  }); 

  it('Should return undefined if the product id is not found', () => {
    const cartItem = 
    {
      productId: 'invalid-product-id',
      quantity: 2,
      deliveryOptionsId: '2'
    };
    const matchingProduct = getMatchingProduct(cartItem);
    expect(matchingProduct).toEqual(undefined);
  });
});

describe('test suite: Product', () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
  }); 
  
  it('Should return getClothingSize as empty string', () => {
    expect(product.getClothingSize()).toEqual('');
  });
  
  it('Should return correct path to rating stars', () => {
    expect(product.getRatingStars()).toEqual('images/ratings/rating-45.png');
  });

  it('Should return correct price cents', () => {
    expect(product.getPriceCents()).toEqual('$10.90');
  });

  it('Should have correct id', () => {
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });

  it('Should have correct image path', () => {
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
  });

  it('Should have correct rating and stars', () => {
    expect(product.rating).toEqual({
        stars: 4.5,
        count: 87
    });
  });
});

describe('test suite: ClothingProduct', () => {
  let clothingProduct;

  beforeEach(() => {
    clothingProduct = new ClothingProduct({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

  it('Should display the clothing size link', () => {
    expect(clothingProduct.getClothingSize()).toContain('<a href="images/clothing-size-chart.png" target="_blank">');
  });

  it('Should display the text for size chart link', () => {
    expect(clothingProduct.getClothingSize()).toContain('Size Chart');
  });

  it('Should have the correct id', () => {
    expect(clothingProduct.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
  });

   it('Should return correct path to rating stars', () => {
    expect(clothingProduct.getRatingStars()).toEqual('images/ratings/rating-45.png');
  });

  it('Should have correct image path', () => {
    expect(clothingProduct.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
  });

  it('Should have correct rating and stars', () => {
    expect(clothingProduct.rating).toEqual({
        stars: 4.5,
        count: 56
    });
  });
});

describe('test suite: ApplianceProduct', () => {
  let applianceProduct;

  beforeEach(() => [
    applianceProduct = new ApplianceProduct({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ]
    })
  ]);

  it('Should display instructions link', () => {
    expect(applianceProduct.getInstructions()).toContain('<a href="images/appliance-instructions.png" target="_blank">');
  });

  it('Should display correct text for the instructions link', () => {
    expect(applianceProduct.getInstructions()).toContain('Instructions');
  });

  it('Should display warranty link', () => {
    expect(applianceProduct.getWarranty()).toContain('<a href="images/appliance-warranty.png" target="_blank">');
  });

  it('Should display correct text for the warranty link', () => {
    expect(applianceProduct.getWarranty()).toContain('Warranty');
  });

  it('Should have the correct id', () => {
    expect(applianceProduct.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
  });

   it('Should return correct path to rating stars', () => {
    expect(applianceProduct.getRatingStars()).toEqual('images/ratings/rating-50.png');
  });

  it('Should have correct image path', () => {
    expect(applianceProduct.image).toEqual('images/products/black-2-slot-toaster.jpg');
  });

  it('Should have correct rating and stars', () => {
    expect(applianceProduct.rating).toEqual({
        stars: 5,
        count: 2197
    });
  });
});