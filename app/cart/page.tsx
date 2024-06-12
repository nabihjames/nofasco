"use client";
import HorizontalCard from "@/components/HorizontalCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCart from "@/hooks/cartHooks/useCart";
import { instance } from "@/instance/axios";
import { Product } from "@/types/product";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function page() {
  const { data, refetch, isLoading } = useCart();
  const [products, setProducts] = useState<Product[]>();
  const [productsData, setProductsData] = useState<Product[]>();
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);

  const [coupon, setCoupon] = useState<string>("");

  const handleValidateCoupon = async () => {
    await instance
      .post("/cart/add/coupon", { code: coupon })
      .then((res) => {
        toast.success(
          `Votre code promo a été validé avec succès, et vous bénéficiez d'une réduction de ${res.data.discountedPrice} $ sur votre commande.`,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        refetch();
      })
      .catch((err) => {
        setCoupon("");
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const [note, setNote] = useState<string>("");

  const handleAddNote = async () => {
    await instance
      .post("/cart/add/note", { note })
      .then((res) => {
        toast.success(`Note client ajoutée`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setNote("");
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    if (!data) return;
    setProducts(data.products);
    setProductsData(data.productsData);
    setSubTotal(data.subTotal);
    setTotal(data.totalPrice);
    setDiscountedPrice(data.discountedPrice);
  }, [data]);

  return (
    <div className="flex flex-col px-4">
      <div className="py-16 p-6 flex justify-start items-start font-gilory font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {isLoading ? (
        <div className="flex justify-between">
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex space-y-3 mb-5">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                <div className="flex flex-col justify-start items-start m-2">
                  <Skeleton className="h-4 w-[480px] mb-2" />
                  <Skeleton className="h-4 w-[50px] mb-2" />

                  <Skeleton className="h-4 w-[190px]" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-start items-start m-2">
            <Skeleton className="h-[225px] w-[350px] rounded-xl" />
            <Skeleton className="h-4 w-[170px] m-2" />
            <Skeleton className="h-4 w-[120px] m-2" />
          </div>
        </div>
      ) : (
        <>
          {products && products.length > 0 ? (
            <div className="flex lg:flex-row flex-col justify-between">
              <div className="flex flex-col gap-3 lg:w-2/3">
                {productsData ? (
                  products?.map((_, index) => {
                    const data = productsData?.find((p) => {
                      return p._id == _.product;
                    });
                    return (
                      <>
                        {data && (
                          <div key={index}>
                            {_.quantity > 0 && (
                              <HorizontalCard
                                _id={data._id}
                                key={index.toString()}
                                title={data.name}
                                description={data.description}
                                price={data.price}
                                image={data.image}
                                quantity={_.quantity}
                                refetch={refetch}
                              />
                            )}
                            {_.options?.length > 0 &&
                              _.options.map((option, index) => {
                                const dataOption = data?.options.find(
                                  (o) => o.name === option.name
                                );

                                return (
                                  <>
                                    {dataOption && (
                                      <div className="mb-2">
                                        {option.quantity > 0 && (
                                          <HorizontalCard
                                            _id={data._id}
                                            key={index.toString()}
                                            title={
                                              data.name +
                                              " " +
                                              capitalize(option.name)
                                            }
                                            description={""}
                                            price={dataOption.price}
                                            image={dataOption.image}
                                            quantity={option.quantity}
                                            option={option.name}
                                            isOption
                                            refetch={refetch}
                                          />
                                        )}
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                      </>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center font-semibold text-lg text-gray-700">
                    Your Cart is empty
                  </div>
                )}
              </div>

              <div className="p-7 font-gilory xl:w-1/3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order Summary
                  </h2>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-secondaryui">
                    Sub-total
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {subTotal}$
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-secondaryui">
                    Promo Code
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {discountedPrice} $
                  </span>
                </div>
                <div className="border-t-2 mx-3"></div>
                <div className="flex justify-between items-center mb-6 py-2">
                  <span className="text-sm font-semibold text-secondaryui">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-primaryui">
                    {total}$
                  </span>
                </div>

                <div className="flex flex-col justify-start items-start pb-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className=" hover:underline text-sm font-semibold pl-0">
                        <img
                          src="/assets/coupon-percent.svg"
                          width={20}
                          height={20}
                          alt="Secure"
                          className="mr-2"
                        />
                        Add a Promo Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Write a promo code</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex justify-between items-center gap-1">
                          <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Entrez votre code promo ici..."
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                          />
                          <DialogFooter className="col-span-1 ml-2">
                            <DialogClose>
                              <Button
                                className="bg-primaryui"
                                type="submit"
                                onClick={() => {
                                  handleValidateCoupon();
                                }}>
                                Validate
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className=" hover:underline text-sm font-semibold pl-0">
                        <img
                          src="/assets/comment-01.svg"
                          width={20}
                          height={20}
                          alt="Secure"
                          className="mr-2"
                        />
                        Add a note
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter une note</DialogTitle>
                        <DialogDescription>
                          Add a personalised touch to your order
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-between items-center gap-1">
                        <Input
                          id="name"
                          placeholder="Votre message ici..."
                          className="col-span-3 "
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                        <DialogFooter className="col-span-1 ml-2">
                          <DialogClose>
                            <Button
                              className="bg-primaryui"
                              type="submit"
                              onClick={() => {
                                handleAddNote();
                              }}>
                              Validate
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-gray-700 text-sm">
                    <img
                      src="/assets/secure.svg"
                      width={20}
                      height={20}
                      alt="Secure"
                      className="mr-2"
                    />
                    Secured payment
                  </span>
                  <a href="/payment">
                    <Button
                      className="bg-primaryui text-white font-medium text-sm px-6 py-3 rounded "
                      type="button">
                      Payment
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-4 w-full">
              <div className="flex flex-col justify-center items-center w-fit">
                <img
                  src="ec-contactless-payment.svg"
                  width={282.23}
                  height={320}
                  alt="Non items"
                />
              </div>
              <h1 className="m-3 font-medium text-2xl text-gray-800">
                The cart is empty
              </h1>
              <a href="/products">
                <Button className="bg-primaryui max-w-[282.23px] w-full m-2">
                  Continue to browse the website
                </Button>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default page;
