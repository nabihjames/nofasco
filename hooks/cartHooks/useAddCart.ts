import { useMutation } from "react-query";
import { instance } from "@/instance/axios";

function useAddToCart() {
  const handleAddToCart = async (cart: {
    product: string;
    option?: string;
    quantity: number;
  }) => {
    const { data }: { data: any } = await instance.post(
      `/cart/add/product`,
      cart
    );
    return data;
  };

  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: handleAddToCart,
    onSuccess: async () => {
      //await queryClient.invalidateQueries("company");
    },
  });

  return { data, error, isLoading, mutateAsync };
}

export default useAddToCart;
