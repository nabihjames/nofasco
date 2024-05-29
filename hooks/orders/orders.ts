import { GET_DATA_ORDERS } from "@/graphql/orders";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const query = GET_DATA_ORDERS;
  const [email, setEmail] = useState("");

  const {
    loading: loadingOrders,
    error: errorOrders,
    data: ordersData,
    refetch,
  } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: { email },
  });

  useEffect(() => {
    if (errorOrders) {
      toast.error("Error fetching orders", {
        position: "bottom-right",
      });
    }
  }, [errorOrders]);

  const getOrdersByUser = async (email: string) => {
    try {
      setEmail(email);
      const { data } = await refetch();
      return data?.ordersByClient || [];
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw new Error("Failed to fetch user orders");
    }
  };

  return {
    getOrdersByUser,
    isLoading: loadingOrders,
  };
};
