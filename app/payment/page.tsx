"use client";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCart from "@/hooks/cartHooks/useCart";
import { instance } from "@/instance/axios";
import { Product } from "@/types/product";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import wilayas from "../../public/wilayas.json";
import { useUserStore } from "@/store/zustand";

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
    <div className="flex flex-col pb-16">
      <div className="p-6 flex justify-start items-start font-gilory font-semibold">
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
        <div className="flex lg:flex-row flex-col justify-between">
          <div className="flex flex-col gap-3 lg:w-2/3">
            <InputForm />
          </div>

          <div className="p-7 font-gilory xl:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Résumé de la commande
              </h2>
          
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-secondaryui">
                Sous-total
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {subTotal}$
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-secondaryui">
                Code promo
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
                    Saisir un code promo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Saisir un code promo</DialogTitle>
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
                            Valider
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
                    Ajouter une note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter une note</DialogTitle>
                    <DialogDescription>
                      Ajoutez une touche personnelle à votre commande.
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
                          Valider
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Button
              className="bg-primaryui text-white font-medium text-sm px-6 rounded"
              form="form"
              type="submit">
              Paiment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Entrez une adresse e-mail valide.",
  }),

  address: z.object({
    address: z.string().min(1, {
      message: "Entrez une adresse valide.",
    }),
    willaya: z.string().min(1, {
      message: "Entrez une willaya valide.",
    }),
    commun: z.string().min(1, {
      message: "Entrez une commune valide.",
    }),
    phone: z.string().min(10, {
      message: "Entrez un numéro de téléphone valide.",
    }),
  }),
  stopDesk: z.string().min(1, {
    message: "Entrez un lieu valide.",
  }),
  paymentType: z.string().optional(),
});

function InputForm() {
  const [communs, setCommuns] = useState([]);

  const { user={
    email: ""
  }, auth } = useUserStore();

  const [values, setValues] = useState({
    paymentType: undefined,
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: {
      address: "",
      willaya: "hidden",
      commun: "",
      phone: "",
    },
    stopDesk: "",
  });

  const fetchDefaultValues = async () => {
    try {
      const response = await instance.get("/client/address");
      setValues(response.data.client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDefaultValues();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: undefined,
      firstName: "",
      lastName: "",
      email: "",
      address: {
        address: "",
        willaya: "",
        commun: "",
        phone: "",
      },
      stopDesk: "",
    },
    values,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await instance
      .post("/order/client/create", {
        paymentType: values.paymentType,
        client: values,
        isStopDesk: values.stopDesk === "au maison" ? true : false,
      })
      .then((res) => {
        toast.success("Votre commande a été passée avec succès.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.reset();
        window.location.href = res.data.url || "/success";
      })
      .catch((err) => {
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
  }

  const fetchCommuns = async (wilaya: string, stopDesk: boolean) => {
    const wilayaId = wilayas.find((c) => c.name == wilaya);
    if (!wilayaId) return;
    const response = await instance.post(`/order/communes/`, {
      willayaID: wilayaId.id,
      stopDesk,
    });
    setCommuns(response.data.communs);
  };

  useEffect(() => {
    if (!form.watch("address.willaya") || !form.watch("stopDesk")) return;
    //set commun in form "address.commun"
    form.setValue("address.commun", "");
    fetchCommuns(
      form.watch("address.willaya"),
      form.watch("stopDesk") !== "au maison"
    );
  }, [form.watch("address.willaya"), form.watch("stopDesk")]);

  return (
    <Form {...form}>
      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-4">
          <FormLabel className="text-2xl text-primaryui font-medium">
            Informations Personelles
          </FormLabel>
          <FormDescription className="text-gray-400 font-medium">
            Entrez vos informations personnelles : Commencez le processus de
            paiement en fournissant vos détails pour une expérience fluide
          </FormDescription>

          <div className="py-5 pb-2 grid grid-cols-2 gap-2 max-w-2xl">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pb-5 grid sm:grid-cols-2 gap-2 max-w-2xl">
            {!auth && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="max-w-96">
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="address.phone"
              render={({ field }) => (
                <FormItem className="max-w-72">
                  <FormControl>
                    <Input placeholder="N de telephone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormLabel className="text-2xl text-primaryui font-medium">
            Adresse et Livraison
          </FormLabel>
          <FormDescription className="text-gray-400 font-medium">
            Informations de livraison et adresse : Renseignez les détails
            essentiels pour une livraison précise et sans encombre
          </FormDescription>

          <FormField
            control={form.control}
            name="stopDesk"
            render={({ field }) => (
              <FormItem className="my-5">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="space-x-4 flex">
                    <div className="flex max-md:flex-col justify-center items-center">
                      <div className="flex">
                        <FormItem className="flex items-center justify-center space-x-2 mr-2">
                          <FormControl>
                            <RadioGroupItem
                              value="au bureau"
                              className="bg-white border-gray-400 text-primaryui mx-1"
                            />
                          </FormControl>
                          <FormLabel className="text-primaryui" htmlFor="r1">
                            Au bureau
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 ml-2">
                          <FormControl>
                            <RadioGroupItem
                              className="bg-white border-gray-400 text-primaryui mx-1"
                              value="au maison"
                            />
                          </FormControl>
                          <FormLabel className="text-primaryui" htmlFor="r1">
                            Au maison
                          </FormLabel>
                        </FormItem>
                      </div>

                      <FormDescription className="text-xs ml-2 my-2">
                        (Le prix au bureau est moins cher.)
                      </FormDescription>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-2 max-w-2xl my-2">
              <FormField
                control={form.control}
                name="address.address"
                render={({ field }) => (
                  <FormItem className="max-w-96">
                    <FormControl>
                      <Input placeholder="Adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="address.willaya"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          {wilayas?.map(
                            (wilaya: { id: number; name: string }) => (
                              <SelectItem key={wilaya.id} value={wilaya.name}>
                                {wilaya.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              
            </div>

            <div>
              {communs && communs.length > 0 && (
                <FormField
                  control={form.control}
                  name="address.commun"
                  render={({ field }) => (
                    <FormItem className="max-w-72 my-2">
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="commun" />
                          </SelectTrigger>
                          <SelectContent>
                            {communs.map(
                              (commun: { id: number; name: string }) => (
                                <SelectItem key={commun.id} value={commun.name}>
                                  {commun.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <FormLabel className="text-2xl text-primaryui font-medium">
            Paiement
          </FormLabel>
          <FormDescription className="text-gray-400 font-medium">
           We offer an exclusive payment methods where ever your location is
          </FormDescription>

          <div className="flex flex-col gap-1">
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem className="max-w-fit min-w-24">
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Moyen de paiement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormMessage />
        </div>
      </form>
    </Form>
  );
}

export default page;
