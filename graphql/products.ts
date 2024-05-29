import { gql } from "@apollo/client";

export const GET_DATA_PRODUCTS_BY_CATEGORY = gql`
  query GetData(
    $selectedCategoryId: String!
    $sortBy: String!
    $page: Float!
    $searchQuery: String!
  ) {
    productsByCategory(
      categoryId: $selectedCategoryId
      sortBy: $sortBy
      page: $page
      searchQuery: $searchQuery
    ) {
      _id
      name
      description
      image
      categories {
        name
      }
      sku
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      business {
        price
        unit
        name
      }
      price
      quantity
      inStock
      track
      show
    }
  }
`;

export const GET_DATA_PRODUCTS_BY_CATEGORIESID = gql`
  query GetData(
    $selectedCategoryId: String!
    $sortBy: String!
    $page: Float!
    $searchQuery: String!
  ) {
    productsByCategories(
      categoryId: $selectedCategoryId
      sortBy: $sortBy
      page: $page
      searchQuery: $searchQuery
    ) {
      _id
      name
      description
      image
      categories {
        name
      }
      sku
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      price
      quantity
      inStock
      track
      show
    }
  }
`;

export const GET_DATA_PRODUCTS_BUSSINESS_BY_CATEGORIESID = gql`
  query GetData(
    $selectedCategoryId: String!
    $sortBy: String!
    $page: Float!
    $searchQuery: String!
  ) {
    productsBussinessByCategories(
      categoryId: $selectedCategoryId
      sortBy: $sortBy
      page: $page
      searchQuery: $searchQuery
    ) {
      _id
      name
      description
      image
      categories {
        name
      }
      sku
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      business {
        price
        unit
        name
      }
      price
      quantity
      inStock
      track
      show
    }
  }
`;

export const GET_DATA_PRODUCTS = gql`
  query GetData($sortBy: String!, $page: Float!, $searchQuery: String!) {
    products(sortBy: $sortBy, page: $page, searchQuery: $searchQuery) {
      _id
      description
      name
      image
      categories {
        name
      }
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      sku
      price
      quantity
      inStock
      track
      show
    }
  }
`;

export const GET_DATA_PRODUCTS_BUSSINESS = gql`
  query GetData($sortBy: String!, $page: Float!, $searchQuery: String!) {
    products(sortBy: $sortBy, page: $page, searchQuery: $searchQuery) {
      _id
      description
      name
      image
      categories {
        name
      }
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      business {
        price
        unit
        name
      }
      sku
      price
      quantity
      inStock
      track
      show
    }
  }
`;

export const GET_DATA_PRODUCTS_RELEVANT = gql`
  query GetData {
    relevantProducts {
      _id
      description
      name
      image
      show
      categories {
        name
      }
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      sku
      price
      quantity
      inStock
      track
    }
  }
`;

export const GET_DATA_PRODUCTS_NEW = gql`
  query GetData {
    newerProducts {
      _id
      description
      name
      image
      show
      categories {
        name
      }
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      sku
      price
      quantity
      inStock
      track
    }
  }
`;

export const GET_DATA_PRODUCT = gql`
  query GetData($productId: String!) {
    product(id: $productId) {
      _id
      name
      description
      image
      categories {
        _id
        name
      }
      business
      unit
      weight
      sku
      price
      quantity
      inStock
      options {
        name
        image
        track
        quantity
        inStock
        price
      }
      show
      promote
      track
    }
  }
`;

// export const GET_DATA_PRODUCT_BUSSINESS = gql`
//   query GetData($sortBy: String!, $page: Float!, $searchQuery: String!) {
//     products_bussiness(sortBy: $sortBy, page: $page, searchQuery: $searchQuery) {
//       _id
//       name
//       description
//       image
//       categories {
//         _id
//         name
//       }
//       business {
//         price
//         unit
//         name
//       }
//       unit
//       weight
//       sku
//       price
//       quantity
//       inStock
//       options {
//         name
//         image
//         track
//         quantity
//         inStock
//         price
//       }
//       show
//       promote
//       track
//     }
//   }
// `;
