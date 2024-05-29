import { gql } from "@apollo/client";

export const GET_DATA_ORDERS = gql`
  query GetData($email: String!) {
    ordersByClient(email: $email) {
      _id
      orderStatus
      createdAt
      cart{
        totalPrice
        subTotal
      }
      paymentType
    }
  }
`;
