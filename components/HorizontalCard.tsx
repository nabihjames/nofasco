import React, { useState } from "react";
import { Button } from "./ui/button";
import InputQuantity from "./ui/InputQuantity";
import { instance } from "@/instance/axios";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/zustand";

function HorizontalCard({
  _id,
  title,
  description,
  price,
  image,
  quantity,
  isOption,
  option,
  key,
  refetch,
}: {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  isOption?: boolean;
  option?: string;
  key: string;
  refetch: () => void;
}) {
  const [quantitySelected, setQuantity] = useState(quantity);
  const { fetchCartCount } = useCartStore();

  const increment = async () => {
    await instance.post(
      "/cart/add/product",
      {
        product: _id,
        ...(isOption && { option }),
        quantity: 1,
      },
      {
        withCredentials: true,
      }
    );

    fetchCartCount();
    refetch();

    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = async () => {
    await instance.post(
      "/cart/remove/product",
      {
        product: _id,
        ...(isOption && { option }),
        quantity: 1,
      },
      {
        withCredentials: true,
      }
    );

    fetchCartCount();
    refetch();

    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleDeleteItem = async () => {
    try {
      await instance.post(
        "/cart/remove/product",
        {
          product: _id,
          ...(isOption && { option }),
        },
        {
          withCredentials: true,
        }
      );
      toast.error("Produit supprimé", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) { }

    fetchCartCount();
    refetch();
  };

  return (
    <div
      key={key}
      style={{
        maxHeight: "600px", // Increase height
        maxWidth: "100%",
        padding: "20px", // Increase padding for more space
      }}
      className="border border-gray-200 rounded-md">
      <div className="flex">
        <div>
          <a href={`/product/${_id}`}>
            <img
              className="rounded-md object-contain h-60 mr-5" // Increase image size
              src={image}
              alt="Card"
            />
          </a>
        </div>

        <div className="p-2 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-left font-medium text-lg pb-2">{title}</h2>
            <Button
              onClick={handleDeleteItem}
              variant="ghost"
              className="bg-white ml-2">
              <div className="h-6 w-6">
                <img
                  src="/assets/eraser-01.svg"
                  height={32}
                  width={32}
                  alt="Eraser"
                />
              </div>
            </Button>
          </div>

          <div className="text-left text-sm mb-4">
            {description}
          </div>

          <InputQuantity
            increment={increment}
            decrement={decrement}
            setQuantity={setQuantity}
            quantity={quantitySelected}
          />

          <h2 className="font-semibold text-xl text-left pb-2 text-primaryui">
            {price}.00 $
          </h2>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
