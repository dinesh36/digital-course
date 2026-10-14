const getPurchasedProductsQuery = `
  query GetPurchasedProducts($skus: [String!]!) {
    purchasedProducts(skus: $skus) {
      sku
      purchased
    }
  }
`;

export default getPurchasedProductsQuery;
