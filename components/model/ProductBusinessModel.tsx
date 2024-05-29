"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import InputQuantityMain from "../ui/InputQuantityMain";
import { Product } from "@/types/product";
import { capitalize } from "lodash";
import { DialogFooter } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductBusinessModel({
  _id,
  name,
  description,
  price,
  image,
  options,
  sku,
  business,
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
    <div className="flex md:flex-row flex-col justify-around w-fit">
      <div>
        <div
          style={{
            height: "110px",
            width: "250px",
            position: "relative",
          }}
          className="m-5">
          <img
            className="rounded-md rounded-b-none object-contain"
            src={image}
            alt="Card"
            sizes="80vw"
          />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 gap-1 p-2 mt-12">
          {/* {options} */}
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <Button variant="outline" className="h-full p-1">
                <img
                  className="rounded-md rounded-b-none object-contain"
                  src={option.image}
                  alt="Card"
                  width={50}
                  height={50}
                  sizes="100vw"
                />
              </Button>
            ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="w-full p-2 flex flex-col justify-center items-start flex-grow min-w-56">
          <h2 className="text-left font-medium text-xl pb-2">{name}</h2>
          <span className="flex text-xs bg-[#EBEBEB] rounded-full p-2 font-light">
            SKU : {sku}
          </span>

          <p className="text-left text-sm py-4">{description}</p>

          <div className="py-2">
            <label className="text-left text-sm font-semibold text-secondaryui">
              Collisage
            </label>
            <div className="py-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Collisage" />
                </SelectTrigger>
                <SelectContent>
                  {business?.map(
                    (
                      item: { price: number; unit: number; name: string },
                      index
                    ) => (
                      <SelectItem key={index} value={item.name}>
                        {item.name} / {item.price} $ / {item.unit} units
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="py-2">
            <label className="text-left text-sm font-semibold text-secondaryui">
              Quantité
            </label>
            <InputQuantityMain quantity={quantity} setQuantity={setQuantity} />
          </div>

          {options && options.length > 0 && (
            <div className="py-2 mb-4">
              <label className="text-left text-sm font-semibold text-secondaryui">
                Autre options
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 py-2 gap-2">
                {options.map((option) => (
                  <Button
                    type="submit"
                    variant={
                      selectedOption.name === option.name
                        ? "secondary"
                        : "ghost"
                    }
                    onClick={() => {
                      setSelectedOption(option);
                      setPriceSelected(option.price);
                    }}
                    className="border border-gray-200 rounded-sm">
                    {capitalize(option.name)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <DialogFooter>
            {/* <DialogClose asChild> */}
            <Button
              type="submit"
              className="bg-primaryui font-gilory"
              onClick={() =>
                handleAddItemToCart({
                  quantity,
                  option: selectedOption.name,
                })
              }>
              <span className="mr-2">Acheter</span>
              <img
                src="/assets/shopping-cart.svg"
                width={21}
                height={21}
                alt="Ajouter icon"
              />
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </div>
      </div>
    </div>
  );
}

export default ProductBusinessModel;
