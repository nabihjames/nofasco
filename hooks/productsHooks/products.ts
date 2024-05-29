import { BUSSINESS } from "@/constants";
import {
  GET_DATA_PRODUCTS,
  GET_DATA_PRODUCTS_BY_CATEGORIESID,
  GET_DATA_PRODUCTS_BY_CATEGORY,
  GET_DATA_PRODUCTS_RELEVANT,
  GET_DATA_PRODUCTS_NEW,
  GET_DATA_PRODUCTS_BUSSINESS_BY_CATEGORIESID,
  GET_DATA_PRODUCTS_BUSSINESS,
} from "@/graphql/products";
import { useQuery } from "@apollo/client";

import { useState } from "react";
import { toast } from "react-toastify";

const getSortValue = (sortBy: string) => {
  switch (sortBy) {
    case "date":
      return "date";
    case "stock":
      return "stock";
    default:
      return "all";
  }
};

export const useProducts = ({
  sortBy,
  selectedCategoryId,
}: {
  sortBy: string;
  selectedCategoryId?: string;
}) => {
  const [page, setPage] = useState(1);

  const isCategorySort = Boolean(selectedCategoryId);

  const query = isCategorySort
    ? GET_DATA_PRODUCTS_BY_CATEGORY
    : GET_DATA_PRODUCTS;

  const variables = {
    sortBy: getSortValue(sortBy),
    page: page.toString(),
    ...(isCategorySort && { selectedCategoryId }),
  };

  const {
    loading: loadingProducts,
    error: errorProducts,
    data: products,
    refetch,
  } = useQuery(query, {
    variables,
    fetchPolicy: "network-only",
  });

  if (errorProducts)
    toast.error("Error fetching products", {
      position: "bottom-right",
    });

  const refetchProducts = (pagination: number) => {
    setPage(pagination);
    refetch();
  };

  return {
    refetch: refetchProducts,
    products: products?.products || products?.productsByCategory,
    isLoading: loadingProducts,
  };
};

export const useProductsClient = ({
  sortBy,
  selectedCategoryId,
  searchQuery,
}: {
  sortBy: string;
  selectedCategoryId?: string;
  searchQuery: string;
}) => {
  const [page, setPage] = useState(1);

  const isCategorySort = Boolean(selectedCategoryId);

  const queryBussiness = isCategorySort
    ? GET_DATA_PRODUCTS_BUSSINESS_BY_CATEGORIESID
    : GET_DATA_PRODUCTS_BUSSINESS;

  const query = isCategorySort
    ? GET_DATA_PRODUCTS_BY_CATEGORIESID
    : GET_DATA_PRODUCTS;

  const variables = {
    sortBy: getSortValue(sortBy),
    page,
    ...(isCategorySort && {
      selectedCategoryId,
    }),
    searchQuery,
  };

  const {
    loading: loadingProducts,
    error: errorProducts,
    data: products,
    refetch,
  } = useQuery(BUSSINESS ? queryBussiness : query, {
    variables,
    fetchPolicy: "network-only",
  });

  if (errorProducts)
    toast.error("Error fetching products", {
      position: "bottom-right",
    });

  const refetchProducts = (pagination: number) => {
    setPage(pagination);
    refetch();
  };

  return {
    refetch: refetchProducts,
    products:
      products?.products ||
      products?.productsByCategories ||
      products?.productsBussinessByCategories ||
      products?.productsBussiness,
    isLoading: loadingProducts,
  };
};

export const useRelevantProducts = () => {
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: products,
    refetch,
  } = useQuery(GET_DATA_PRODUCTS_RELEVANT);

  if (errorProducts) {
    toast.error("Error fetching products", {
      position: "bottom-right",
    });
  }

  const refetchProducts = (pagination: number) => {
    refetch();
  };

  return {
    refetch: refetchProducts,
    products: products?.relevantProducts,
    isLoading: loadingProducts,
  };
};

export const useNewProducts = () => {
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: products,
    refetch,
  } = useQuery(GET_DATA_PRODUCTS_NEW);

  if (errorProducts) {
    toast.error("Error fetching products", {
      position: "bottom-right",
    });
  }

  const refetchProducts = (pagination: number) => {
    refetch();
  };

  return {
    refetch: refetchProducts,
    products: products?.newerProducts,
    isLoading: loadingProducts,
  };
};
