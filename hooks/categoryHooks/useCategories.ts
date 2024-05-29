import { GET_DATA_CATEGORIES } from "@/graphql/categories";
import { useQuery } from "@apollo/client";

const useCategories = () => {
  const { data, error, loading } = useQuery(GET_DATA_CATEGORIES);

  return { categories: data?.categories, error, loading };
};
export default useCategories;
