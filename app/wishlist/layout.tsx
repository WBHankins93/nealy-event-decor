import { WishlistProvider } from "@/lib/wishlistContext";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}