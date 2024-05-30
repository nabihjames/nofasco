"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Menu } from "lucide-react";
import { instance } from "@/instance/axios";
import { useCartStore, useUserStore } from "@/store/zustand";
import { BUSSINESS } from "@/constants";

function Navbar() {
  const pathname = usePathname();
  const { cart, fetchCartCount } = useCartStore();
  const { user, auth, fetchUser } = useUserStore();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetchUser();
    fetchCartCount();
  }, [pathname]);

  const changeLanguage = (lang: 'en' | 'ar' | 'fr') => { // Specify the type for lang parameter
    setLanguage(lang);
    // Add your logic to change the language here
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <>
      <nav>
        <ul className="flex justify-between items-center px-12 w-full border-b-2 border-[#989898]">
          <li className="flex-1 flex justify-start">
            <a target="_blank" href="/">
              <img src="/assets/logo1.png" width={250} height={60} alt="Location" />
            </a>
          </li>
          <li className="flex-1 flex justify-center">
            <Input
              placeholder="&#xF002;  Search..."
              className={`p-4 search-navbar w-3/4 max-lg:hidden ${pathname === "/products" && "hidden"}`}
              style={{ fontFamily: "FontAwesome, Arial", fontStyle: "normal" }}
            />
          </li>
          <li className="flex-1 flex justify-end items-center gap-4">
            <div className="flex gap-2 max-md:hidden">
              <a href="/cart">
                {!BUSSINESS && (
                  <Button
                    variant="ghost"
                    className="bg-white w-16 h-12 max-lg:w-12 max-lg:h-10"
                  >
                    <div className="relative">
                      {cart > 0 && (
                        <div className="absolute font-semibold rounded-full w-4 h-6 text-primaryui left-[8px] top-[10px]">
                          {cart}
                        </div>
                      )}
                      <img
                        src="/assets/shopping-basket.svg"
                        className="w-8 h-8"
                        width={39}
                        height={39}
                        alt="Shopping Basket"
                      />
                    </div>
                  </Button>
                )}
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-center items-center gap-1">
                  <Button className="bg-white w-16 h-12 max-lg:w-12 max-lg:h-12">
                    <img
                      src="/assets/language.svg"
                      className="w-8 h-8"
                      width={39}
                      height={39}
                      alt="Language"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-gilory">
                  <DropdownMenuItem onSelect={() => changeLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => changeLanguage('ar')}>Arabic</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => changeLanguage('fr')}>French</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="/login">
                {!auth && (
                  <Button className="bg-primaryui w-32 h-12 max-lg:w-32 max-lg:h-10" variant="default">
                    Login
                  </Button>
                )}
              </a>
              {auth && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex justify-center items-center gap-1">
                    <Button className="bg-primaryui w-16 h-12 max-lg:w-12 max-lg:h-12">
                      <img
                        src="/assets/user.png"
                        className="w-8 h-8"
                        width={39}
                        height={39}
                        alt="User"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-gilory">
                    <a href="/orders">
                      <DropdownMenuItem>Orders</DropdownMenuItem>
                    </a>
                    <a href="/logout">
                      <DropdownMenuItem>
                        Logout
                        <span className="ml-2">
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/ios/50/exit--v1.png"
                            alt="exit--v1"
                          />
                        </span>
                      </DropdownMenuItem>
                    </a>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="md:hidden">
              <Menu height={32} width={32} />
            </div>
          </li>
        </ul>

        {pathname !== "/cart" && (
          <div className="flex justify-between items-center p-4">
            <div className="w-1/8"></div>
            <ul className="flex-grow flex justify-center items-center font-gilory font-semibold gap-12 p-5 max-md:hidden">
              <li className={`hover:text-black ${pathname === "/" ? "border-b-2 border-primaryui text-black" : "text-secondaryui"}`}>
                <a href="/">Home</a>
              </li>
              <li className="text-secondaryui hover:text-black">
                <a href="#promotion">Solutions</a>
              </li>
              <li className={`hover:text-black ${pathname === "/products" ? "border-b-2 border-primaryui text-black" : "text-secondaryui"}`}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex justify-center items-center gap-1">
                    Products
                    <img width={21} height={21} src="/assets/arrow-down.svg" alt="" className="hover:text-black" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-gilory">
                    <a href="/products">
                      <DropdownMenuItem>All Products</DropdownMenuItem>
                    </a>
                    <a href="/products?category=Scolaire">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                    <a href="/products?category=Bureau">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                    <a href="/products?category=Art">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                    <a href="/products?category=Informatique">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                    <a href="/products?category=Livres">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                    <a href="/products?category=Tirage">
                      <DropdownMenuItem></DropdownMenuItem>
                    </a>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li className={`hover:text-black ${pathname === "/contact" ? "border-b-2 border-primaryui text-black" : "text-secondaryui"}`}>
                <a href="/contact">Contact us</a>
              </li>
              <li className="text-secondaryui whitespace-nowrap hover:text-black">
                <a href="/about">About Us</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

export const useCartCount = () => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    console.log("fetching cart count");
    try {
      const res = await instance.get("/cart/count");
      setCartCount(res.data);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const reFetchCartCountRef = useRef(fetchCartCount);

  useEffect(() => {
    reFetchCartCountRef.current = fetchCartCount;
  }, [fetchCartCount]);

  return { cartCount, fetchCartCount: reFetchCartCountRef.current };
};
