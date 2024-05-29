"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import ProductBusinessModel from "./model/ProductBusinessModel";

function BussinessCard({
  _id,
  name,
  description,
  price,
  image,
  options,
  sku,
  show,
  business,
}: Product) {
  const router = useRouter();

  const handleAddItemToCart = async () => {};

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
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>

      <div className="flex flex-col justify-between p-2">
        <h2 className="text-center font-medium text-sm pb-2 h-full">{name}</h2>
        <p className="font-light text-center">livraison disponible</p>
      </div>

      <div>
        <div className="py-full flex flex-col justify-between items-center w-full">
          <h2 className="font-semibold text-lg pb-2">
            <span className="font-light text-sm">À partir de </span>
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
                <span className="mr-2">Ajouter</span>
                <img
                  src="/assets/shopping-cart.svg"
                  width={21}
                  height={21}
                  alt="Ajouter icon"
                />
              </Button>
            </DialogTrigger>

            <DialogContent className="lg:max-w-fit max-lg:overflow-y-scroll max-h-screen">
              <ProductBusinessModel
                show={show}
                name={name}
                sku={sku}
                _id={_id}
                description={description}
                image={image}
                price={price}
                options={options}
                business={business}
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

export default BussinessCard;
