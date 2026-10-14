import { productItemFields } from '@/ecom/services/product';

export {
  orderDetailFields, getPaymentMethodsQuery, getCustomerOrderDetailsQuery,
} from '@/ecom-base/services/account/customerOrder/customerOrders.graphql';

export const getCustomerOrderList = `
  query GetCustomerOrders(
    $pageSize: Int!
    $currentPage: Int!
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      orders(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
        items {
          order_number
          order_date
          status
          grand_total
          items {
            product_sku
            status
            quantity_ordered
            quantity_invoiced
            product {
                ${productItemFields}
            }
            prices {
                original_price {
                    currency
                    value
                }
                price {
                    value
                    currency
                }
                row_total {
                    value
                    currency
                }
            }
          }
        }
        total_count
      }
    }
  }
`;
