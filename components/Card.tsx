"use client";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import ProductModel from "./model/ProductModel";
import type { Product } from "@/types/product";
import useAddToCart from "@/hooks/cartHooks/useAddCart";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

function Card({
  _id,
  name,
  description,
  price,
  image,
  options,
  sku,
  show,
}: Product) {
  const { mutateAsync } = useAddToCart();
  const { fetchCartCount } = useCartStore();
  const router = useRouter();

  const ToastContent = () => (
    <div>
      Ajouté au panier —{" "}
      <a href="/cart" className="text-sm text-blue-700">
        Voir le panier
      </a>
    </div>
  );

  const handleAddItemToCart = async ({
    quantity,
    option,
  }: {
    quantity: number;
    option?: string;
  }) => {
    if (quantity <= 0) return;

    await mutateAsync({
      quantity,
      option,
      product: _id,
    });

    toast.success(<ToastContent />, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClick: () => {
        router.push("/cart");
      },
    });
    fetchCartCount();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        maxHeight: "580px",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="border border-gray-200 rounded-md shadow-sm"
      key={_id}>
      <div
        style={{
          height: "250px",
          width: "250px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          className="rounded-md rounded-b-none object-contain"
          src={image}
          alt="Card"
          style={{ maxWidth: "100%", maxHeight: "100%" }} // Ensures image fits within container
        />
      </div>

      <div className="flex flex-col justify-between p-2">
        <h2 className="text-center font-medium text-sm pb-2 h-full">{name}</h2>
        <p className="font-light text-center">Available Delivery</p>
      </div>

      <div>
        <div className="py-full flex flex-col justify-between items-center w-full">
          <h2 className="font-semibold text-lg pb-2">
            <span className="font-light text-sm">Starts from </span>
            {price}.00 $
          </h2>
        </div>
        <div className="flex justify-between items-end w-full p-2">
          <Button variant="ghost">
            <img
              src="/assets/icons8-heart-25.png"
              height={21}
              width={21}
              alt="Heart"
            />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primaryui font-gilory w-1/2">
                <span className="mr-2">Add to cart</span>
                <img
                  src="/assets/shopping-cart.svg"
                  width={21}
                  height={21}
                  alt="Ajouter icon"
                />
              </Button>
            </DialogTrigger>


            <DialogContent className="lg:max-w-fit min-w-2/3  max-lg:overflow-y-scroll max-h-screen">
              <ProductModel
                show={show}
                name={name}
                sku={sku}
                _id={_id}
                description={description}
                image={image}
                price={price}
                options={options}
                quantity={1}
                handleAddItemToCart={handleAddItemToCart}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
