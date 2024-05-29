"use client";
import { useState } from "react";

function InputQuantityMain({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex items-center justify-center w-fit my-2">
      <button
        onClick={decrement}
        className=" text-white bg-primaryui h-6 w-6 rounded-l cursor-pointer outline-none  mr-1 rounded-r-sm">
        -
      </button>
      <input
        type="number"
        className="border px-2 rounded-sm w-9 h-9 text-center font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
        name="custom-input-number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
      <button
        onClick={increment}
        className=" text-white bg-primaryui h-6 w-6 rounded-r cursor-pointer ml-1 rounded-l-sm">
        +
      </button>
    </div>
  );
}

export default InputQuantityMain;
