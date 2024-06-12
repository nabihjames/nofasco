"use client";
import BussinessCard from "@/components/BussinessCard";
import Card from "@/components/Card";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { BUSSINESS } from "@/constants";
import useCategories from "@/hooks/categoryHooks/useCategories";
import { useProductsClient } from "@/hooks/productsHooks/products";
import { CardTypes } from "@/types/card";
import { Product } from "@/types/product";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";

function page() {
  const [selectedSort, setSelectedSort] = useState("date");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isLoading,
    products: data,
    refetch,
  } = useProductsClient({
    sortBy: selectedSort,
    selectedCategoryId:
      selectedCategories?.length > 0 ? selectedCategories.join(",") : "",
    searchQuery,
  });

  const { categories } = useCategories();

  const handleSort = (value: string) => {
    setSelectedSort(value);
    if (!products) return;

    let sortedProducts = [...products];
    switch (value) {
      case "price":
        sortedProducts.sort((a: any, b: any) => a.price - b.price);
        break;
      case "price-down":
        sortedProducts.sort((a: any, b: any) => b.price - a.price);
        break;
      case "nom":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nom-a":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setProducts(sortedProducts);
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    refetch(1);
    handleSort(selectedSort);
  }, [selectedSort, searchQuery]);

  return (
    <section className="flex max-lg:flex-col justify-between items-start w-full pb-12">
      <div className="flex flex-col justify-between h-full m-2">
        <h1 className="text-3xl font-semibold tracking-tight text">
          Filter & <span className="lg:block">Order</span>
        </h1>
        <div>
          <RadioGroup className="mt-6" defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={selectedSort === "date"}
                value="date"
                onClick={() => handleSort("date")}
                id="date"
              />
              <Label htmlFor="date">Most recent</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem
                checked={selectedSort === "price"}
                onClick={() => handleSort("price")}
                value="price"
                id="price"
              />
              <Label htmlFor="price">Price(low to high)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem
                checked={selectedSort === "price-down"}
                value="price-down"
                onClick={() => handleSort("price-down")}
                id="price-down"
              />
              <Label htmlFor="price-down">Price(high to low)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem
                checked={selectedSort === "nom"}
                value="nom"
                onClick={() => handleSort("nom")}
                id="nom"
              />
              <Label htmlFor="nom">Name (A to Z)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem
                checked={selectedSort === "nom-a"}
                value="nom-a"
                onClick={() => handleSort("nom-a")}
                id="nom-a"
              />
              <Label htmlFor="nom-a">Name (Z to A)</Label>
            </div>
          </RadioGroup>

          <div className="h-[1px] w-32 bg-gray-300 my-5"></div>

          <div className="flex flex-col gap-4">
            {categories?.length > 0 ? (
              categories.map((category: any) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    value={category._id}
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category._id)
                          ? prev.filter((id) => id !== category._id)
                          : [...prev, category._id]
                      )
                    }
                  />
                  <Label htmlFor="nom-a">{capitalize(category.name)}</Label>
                </div>
              ))
            ) : (
              <Skeleton className="w-full h-8" />
            )}
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="&#xF002;  Search..."
              className="p-3 search-navbar lg:hidden"
              style={{
                fontFamily: "FontAwesome, Arial",
                fontStyle: "normal",
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-0 grid gap-4 md:gap-8 w-5/6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1 w-full">
            <div className="flex justify-start items-end w-full">
              <div className="flex justify-start items-end w-full">
                <h1 className="text-3xl font-semibold tracking-tight text">
                  {BUSSINESS ? "Produit business" : "Nos Produits"}
                </h1>
                <div className="bg-gray-200 h-[2px] w-1/3 m-1 rounded-2xl ml-3"></div>
              </div>
              <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="&#xF002;  Search..."
                className="p-3 search-navbar w-1/6 max-lg:hidden"
                style={{
                  fontFamily: "FontAwesome, Arial",
                  fontStyle: "normal",
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[767px]:grid-cols-2 sm:grid-cols-1 gap-8">
          {!BUSSINESS &&
            products?.length > 0 &&
            products.map((card: CardTypes) => {
              if (!card.show) return null;
              return (
                <div className="grid gap-4 relative group">
                  <Card {...card} />
                </div>
              );
            })}

          {BUSSINESS &&
            products?.length > 0 &&
            products.map((card: CardTypes) => {
              if (!card.show || (!card.business || card.business.length === 0)) {
                return null;
              }

              return (
                <div className="grid gap-4 relative group">
                  <BussinessCard {...card} />
                </div>
              );
            })}

          {products?.length == 0 &&
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-96" />
            ))}
        </div>
      </div>
    </section>
  );
}

export default page;
