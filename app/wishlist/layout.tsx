import { WishlistProvider } from "@/lib/wishlist/wishlistContext";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}