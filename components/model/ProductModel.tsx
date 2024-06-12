"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import InputQuantityMain from "../ui/InputQuantityMain";
import { Product } from "@/types/product";
import { capitalize } from "lodash";
import { DialogFooter } from "../ui/dialog";

function ProductModel({
  _id,
  name,
  description,
  price,
  image,
  options,
  sku,
  handleAddItemToCart,
}: Product & {
  handleAddItemToCart: ({
    quantity,
    option,
  }: {
    quantity: number;
    option: string;
  }) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(options[0] || {});
  const [priceSelected, setPriceSelected] = useState<number>(price);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-[1400px] mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex flex-col items-center w-full md:w-1/2">
        <div className="relative w-full h-[500px] m-5">
          <img
            className="rounded-md object-contain w-full h-full"
            src={image}
            alt={name}
            sizes="80vw"
          />
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-3 gap-4 p-2 mt-6">
          {options &&
            options.length > 0 &&
            options.map((option, index) => (
              <Button
                variant="outline"
                className="h-full p-1"
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setPriceSelected(option.price);
                }}
              >
                <img
                  className="rounded-md object-contain w-full h-full"
                  src={option.image}
                  alt={`Option ${index}`}
                  width={50}
                  height={50}
                  sizes="80vw"
                />
              </Button>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 p-6">
        <div className="w-full flex flex-col justify-center items-start">
          <h2 className="text-left font-bold text-3xl pb-2">{name}</h2>
          <span className="flex text-xs bg-gray-200 rounded-full px-4 py-1 font-light mb-4">
            SKU: {sku}
          </span>
          <p className="text-left text-sm py-4">{description}</p>
          <div className="py-2 w-full">
            <label className="text-left text-sm font-semibold text-gray-700">
              Quantité
            </label>
            <InputQuantityMain quantity={quantity} setQuantity={setQuantity} />
          </div>
          {options && options.length > 0 && (
            <div className="py-2 mb-4 w-full">
              <label className="text-left text-sm font-semibold text-gray-700">
                Autre options
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 py-2 gap-4">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={
                      selectedOption.name === option.name
                        ? "secondary"
                        : "ghost"
                    }
                    onClick={() => {
                      setSelectedOption(option);
                      setPriceSelected(option.price);
                    }}
                    className="border border-gray-200 rounded-sm"
                  >
                    {capitalize(option.name)}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <h2 className="font-semibold text-xl text-left pb-2 text-gray-800">
            {priceSelected}.00 $
          </h2>
        </div>
        <div className="w-full mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Features:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Specifications:</h3>
          <table className="table-auto text-sm text-gray-600 mb-4 w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-4">Dimension:</td>
                <td className="py-1">15 x 10 x 5 cm</td>
              </tr>
              <tr>
                <td className="py-1 pr-4">Weight:</td>
                <td className="py-1">500g</td>
              </tr>
              <tr>
                <td className="py-1 pr-4">Material:</td>
                <td className="py-1">Aluminum</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end w-full p-4">
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primaryui font-bold text-white"
              onClick={() =>
                handleAddItemToCart({
                  quantity,
                  option: selectedOption.name,
                })
              }
            >
              <span className="mr-2">Add to Cart</span>
              <img
                src="/assets/shopping-cart.svg"
                width={21}
                height={21}
                alt="Add to Cart"
              />
            </Button>
          </DialogFooter>
        </div>
      </div>
    </div>
  );
}

export default ProductModel;
