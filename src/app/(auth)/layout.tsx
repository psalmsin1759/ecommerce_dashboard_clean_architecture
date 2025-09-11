import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import "../globals.css";
import AuthLayout from "./AuthLayout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function AuthMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={antonio.className}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
