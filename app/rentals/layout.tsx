import { WishlistProvider } from "@/lib/wishlistContext";

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}