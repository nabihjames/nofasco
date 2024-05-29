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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Veuillez saisir un nom valide.",
  }),
  lastName: z.string().min(2, {
    message: "Veuillez saisir un prenom valide.",
  }),
  email: z.string().email({
    message: "Veuillez saisir une adresse e-mail valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),
  confrimPassword: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Veuillez saisir un numéro de téléphone valide.",
    })
    .regex(phoneRegex, {
      message: "Veuillez saisir un numéro valide.",
    }),
});

function page() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confrimPassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confrimPassword) {
      form.setError("confrimPassword", {
        type: "manual",
        message: "Verifier le mots de passe confirmation",
      });
      return;
    }

    await instance
      .post("user/register/client", data)
      .then(() => {
        toast.success(`Vous avez enregistré avec succès.`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          router.push(`/login`);
        }, 2500);
      })
      .catch(() => {
        toast.error(`Déjà enregistré.`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push(`/login`);
        }, 2500);
      });
  };

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
              <BreadcrumbPage className="font-semibold">
                register
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="absolute">
          <h1 className="m-2 mt-4 font-semibold font-gilory text-xl">
            Créez un compte client
          </h1>

          <div className="relative left-40 bottom-2">
            <img
              src="/verctor-register.svg"
              width={157.33}
              height={16.27}
              alt="progress bar"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-12 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Nom" maxLength={150} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Prenom" maxLength={150} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input placeholder="Email" maxLength={150} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormControl>
                      <Input
                        placeholder="Téléphone"
                        maxLength={150}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="confrimPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirmer le Mot de passe"
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
              Suivant
            </Button>
            <a href="/login">
              <Button
                variant="secondary"
                className="my-2 text-primaryui w-full font-gilory"
                type="button"
                size="lg">
                Vous avez déjà un compte
              </Button>
            </a>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
