import { minimalProductFields } from '@/ecom-base/services/product';

export * from '@/ecom-base/services/cart/cart-details.graphql';

export const cartItemsFields = `
  id
  quantity
  errors {
    code
    message
  }
  is_available
  ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
  product {
    ${minimalProductFields}
    categories {
      uid
      name
    }
    custom_attributesV2(filters: { is_visible_on_front: true }) {
      items {
        code
        ... on AttributeValue {
          value
        }
      }
    }
  }
  prices {
    price {
      value
    }
    row_total {
      value
    }
    original_row_total {
      value
    }
  }
`;

export const cartFields = `
  id
  email
  items {
    ${cartItemsFields}
  }
  prices {
    grand_total {
      value
      currency
    }
    discounts {
      label
      amount {
        value
        currency
      }
      coupon {
        code
      }
    }
    subtotal_including_tax {
      value
      currency
    }
    subtotal_excluding_tax {
      value
      currency
    }
    applied_taxes {
      amount {
        value
        currency
      }
      label
    }
  }
  billing_address {
    firstname
    lastname
    city
    postcode
    street
    telephone
  }
  shipping_addresses {
    id
    firstname
    lastname
    city
    company
    postcode
    street
    telephone
    region {
      region_id
      code
      label
    }
    selected_shipping_method {
      carrier_code
      carrier_title
      amount {
        value
        currency
      }
    }
  }
  selected_payment_method {
    code
    title
  }
`;

export const setShippingAddressOnCartMutation = (isGuest: boolean) => `
  mutation ${isGuest ? 'SetGuestShippingAddress' : 'setShippingAddress'}
  ($cartId: String!, ${isGuest ? '$address: CartAddressInput!' : '$addressId: Int!'}) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cartId
        shipping_addresses: [
          { ${isGuest ? 'address: $address' : 'customer_address_id: $addressId'} }
        ]
      }
    ) {
      cart {
       ${cartFields}
      }
    }
  }
`;

export const setGuestEmailOnCartMutation = `
  mutation setGuestEmailOnCart($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ${cartFields}
      }
    }
  }
`;
