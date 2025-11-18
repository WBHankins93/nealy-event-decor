import { WishlistProvider } from "@/lib/wishlist/wishlistContext";

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}