"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        <a href="/products?category=Scolaire">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img
              height={60}
              width={60}
              src="/assets/1.png"
              alt="backpack"
            />
            <span className="text-sm text-center font-medium">Agricultural machinery</span>
          </motion.div>
        </a>

        <a href="/products?category=Bureau">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img height={60} width={60} src="/assets/3.png" alt="desk" />
            <span className="text-sm text-center font-medium">Construction machinery</span>
          </motion.div>
        </a>

        <a href="/products?category=Art">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img
              height={60}
              width={60}
              src="/assets/9.png"
              alt="paint"
            />

            <span className="text-sm text-center font-medium">
              Mining Machines
            </span>
          </motion.div>
        </a>

        <a href="/products?category=Informatique">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img
              height={60}
              width={60}
              src="/assets/7.png"
              alt="paint"
            />
            <span className="text-sm text-center font-medium">
              Medical industries 
            </span>
          </motion.div>
        </a>

        <a href="/products?category=Livres">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img height={60} width={60} src="/assets/14.png" alt="paint" />
            <span className="text-sm text-center font-medium">
              Production Lines 
            </span>
          </motion.div>
        </a>

        <a href="/products?category=Informatique">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border border-primaryui rounded-sm space-y-2 hover:cursor-pointer">
            <img height={60} width={60} src="/assets/4.png" alt="paint" />
            <span className="text-sm text-center font-medium">
              Food Preparation
            </span>
          </motion.div>
        </a>
      </div>
      <div className="flex justify-center">
        <a href="/products">
          <Button className="mt-4 bg-gray" variant="ghost">
            <span className="text-lg text-center font-bold">
              Explore all Products
            </span>
            <ChevronDown className="font-light" />
          </Button>
        </a>
      </div>
    </div>
  );
}
