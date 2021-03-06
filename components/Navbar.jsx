import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import {
  SearchIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Navbar() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cartReducer);
  console.log(cartItems.length);
  const [productsInCart, setProductsInCart] = useState(cartItems.length);

  useEffect(() => {
    setProductsInCart(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <section className="shadow-xl z-50 sticky top-0 bg-white">
        <div className="container mx-auto py-6">
          {/* Top */}
          <div className="flex justify-center sm:justify-between">
            {/* Left  */}
            <div className="hidden sm:flex relative w-32 h-10">
              <Image
                src={Logo}
                layout="fill"
                onClick={() => router.push("/")}
              />
            </div>

            {/* Middle */}
            <div>
              <div className="flex text-gray-400 border border-gray-300 rounded-full pl-5 overflow-hidden">
                <SearchIcon className="w-5" />
                <input
                  className="w-[35vw] px-3 outline-none"
                  type="text"
                  placeholder="Searching for..."
                />
                <button className="bg-primary text-white px-8 py-3 font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="hidden sm:flex space-x-5">
                <div
                  className="bg-gray-100 p-3 rounded-full text-gray-500 cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  <UserIcon className="w-6" />
                </div>
                <div className="bg-gray-100 p-3 rounded-full text-gray-500 cursor-pointer">
                  <div
                    className="relative"
                    onClick={() => router.push("/cart")}
                  >
                    <ShoppingBagIcon className="w-6" />
                    {productsInCart > 0 ? (
                      <div className="absolute -top-5 -right-4 bg-primary rounded-full px-2 text-white">
                        {productsInCart}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="hidden sm:flex pt-10">
            <ul className="flex flex-grow justify-end space-x-6 text-gray-500">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">Pages</li>
              <li className="hover:text-primary cursor-pointer">
                User Account
              </li>
              <li className="hover:text-primary cursor-pointer">
                Vendor Account
              </li>
              <li className="hover:text-primary cursor-pointer">
                Back to Demos
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
