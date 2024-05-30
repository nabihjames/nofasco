"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useOrders } from "@/hooks/orders/orders";
import { useUserStore } from "@/store/zustand";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";

function Page() {
  const { fetchUser, user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const { getOrdersByUser } = useOrders();

  useEffect(() => {
    if (user) {
      const fetchUserOrders = async () => {
        const userOrders = await getOrdersByUser(user.email);
        setOrders(userOrders);
      };

      fetchUserOrders();
    }
  }, [user]);

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
              <BreadcrumbPage className="font-semibold">Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-between mt-9 p-2">
        <h1 className="text-sm">Your Orders</h1>
        <table className="table-auto mt-5">
          <thead>
            <tr className="border-b-[1px]">
              <th className="text-xs p-4 text-left font-work font-medium">
                Order
              </th>
              <th className="text-xs p-4 text-center font-work font-medium">
                Date
              </th>
              <th className="text-xs p-4 text-center font-work font-medium">
                subTotal
              </th>
              <th className="text-xs p-4 text-center font-work font-medium">
                Total
              </th>
              <th className="text-xs p-4 text-center font-work font-medium">
                Method
              </th>
              <th className="text-xs p-4 text-center font-work font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any, index) => {
                const createdAt = new Date(order.createdAt);
                const months = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ];
                const day = createdAt.getDate();
                const monthName = months[createdAt.getMonth()];
                const year = createdAt.getFullYear();
                const formattedCreatedAt = `${day} ${monthName}, ${year}`;
                return (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="text-xs p-4 text-left font-work font-medium">
                      {order._id.slice(-8)}
                    </td>
                    <td className="text-xs p-4 text-center font-work font-medium">
                      {formattedCreatedAt}
                    </td>
                    <td className="text-xs p-4 text-center font-work font-medium">
                      {order.cart.subTotal} $
                    </td>

                    <td className="text-xs p-4 text-center font-work font-medium">
                      {order.cart.totalPrice} $
                    </td>

                    <td className="text-xs p-4 text-center font-work font-medium">
                      {order.paymentType}
                    </td>

                    <td className="flex justify-center text-xs p-4 text-center font-work font-medium">
                      <div className="bg-gray-100 text-blue-300 w-1/2 rounded-2xl">
                        {order.orderStatus}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="hover:bg-gray-100">
                <th className="text-xs p-4 text-center font-work font-medium">
                  No Data
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
