"use client";
import { useState } from "react";

function InputQuantity({
  increment,
  decrement,
  setQuantity,
  quantity,
}: {
  increment: () => void;
  decrement: () => void;
  setQuantity: (value: number) => void;
  quantity: number;
}) {
  return (
    <div className="flex items-center justify-center border rounded-sm w-fit my-3 mb-8">
      <button
        onClick={decrement}
        className=" text-gray-600 h-6 w-6 rounded-l cursor-pointer outline-none">
        -
      </button>
      <input
        type="number"
        className="w-8 text-center font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
        name="custom-input-number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        readOnly></input>
      <button
        onClick={increment}
        className=" text-gray-600 h-6 w-6 rounded-r cursor-pointer">
        +
      </button>
    </div>
  );
}

export default InputQuantity;
