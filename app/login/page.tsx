"use client";
import { PasswordInput } from "@/components/ui/PasswordInput";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { instance } from "@/instance/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import ls from "../../utils/localStorage";
import { useUserStore } from "@/store/zustand";
import { BUSSINESS } from "@/constants";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormSchema = z.object({
  email: z.string().email({
    message: "Veuillez saisir une adresse e-mail valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),
});

function page() {
  const { auth } = useUserStore();

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    await instance
      .post("user/login", data)
      .then((response) => {
        ls.setToLs("user", response.data.user);

        toast.success(`Vous avez enregistré avec succès.`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push(`/products`);
      })
      .catch((error) =>
        toast.error(`${error.response.data.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  useEffect(() => {
    if (auth) {
      router.push("/products");
    }
  }, [auth]);

  return (
    <div className="flex flex-col">
      <div className="py-16 p-6 flex justify-start items-start font-gilory font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">login</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col justify-center items-center">
        <img
          src="/login.svg"
          width={372.81}
          height={81.27}
          alt="progress bar"
        />

        <h1 className="m-2 mt-4 font-semibold font-gilory text-xl">
          Connect to your account
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center py-12 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" maxLength={150} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PasswordInput
                      placeholder="Mot de passe"
                      maxLength={150}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="my-5 bg-primaryui w-full font-gilory"
              type="submit"
              size="lg">
              Login
            </Button>
            <a href="/register">
              <Button
                variant="secondary"
                className="my-2 text-primaryui w-full font-gilory"
                type="button"
                size="lg">
                Create a new account
              </Button>
            </a>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
