import React from "react";
import { IoIosMore } from "react-icons/io";
import {  MdShoppingCart } from "react-icons/md";

interface Props {
  count: string;
  range: string;
}

export default function TotalCount({ count, range }: Props) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2 bg-white shadow">
      <div className="flex justify-between items-center">
        <div className="rounded-full p-2 bg-secondary">
          <MdShoppingCart className="text-xl text-primary" />
        </div>
        <IoIosMore />
      </div>

      <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
      <p className="text-2xl font-bold text-gray-900">
        {count.toLocaleString()}
      </p>

      <span className="text-xs text-gray-400">For this {range}</span>
    </div>
  );
}
