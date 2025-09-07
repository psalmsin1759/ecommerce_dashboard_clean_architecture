"use client";

import { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {overviewItems, managementItems, systemItems, MenuItem} from "@/constants/data"

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}



export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const renderMenu = (title: string, items: MenuItem[]) => (
    <div className="mb-6">
      <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-500 text-white font-semibold" : "hover:bg-blue-600 text-blue-100"
              }`}
            >
              <item.icon
                className={`text-xl ${isActive ? "text-white" : "text-blue-200"}`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 md:static md:translate-x-0 bg-primary w-64 h-full p-5 shadow-md transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden text-white">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {renderMenu("Overview", overviewItems)}
          {renderMenu("Management", managementItems)}
          {renderMenu("System", systemItems)}
        </div>
      </aside>
    </>
  );
}
