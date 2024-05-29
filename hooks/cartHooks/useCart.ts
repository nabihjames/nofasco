import { instance } from "@/instance/axios";
import { useQuery } from "react-query";

function useCart() {
  const fetch = async () => {
    const { data }: { data: any } = await instance.get(`/cart/`);
    return data.cart;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: fetch,
  });

  return { data, error, isLoading, refetch };
}

export default useCart;
