import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/carousel";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaShoppingCart,
} from "react-icons/fa";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  console.log(products);
  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12  container mx-auto">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce Store
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            src={products.data[0].images[0]}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>

      {/* Footer */}
      <footer className="bg-neutral-100 text-center py-6 border-t border-gray-300">
        <p className="text-sm text-neutral-600 mb-4 ">
          &copy; {new Date().getFullYear()} My Ecommerce Store. All rights
          reserved.
        </p>

        {/* Social Media Links with Text */}
        <div className="mb-4">
          <a
            href="#"
            className="text-neutral-600 hover:text-blue-500 mx-4 inline-block"
          >
            <FaFacebookF size={20} className="inline mr-2" />
            Facebook
          </a>
          <a
            href="#"
            className="text-neutral-600 hover:text-blue-500 mx-4 inline-block"
          >
            <FaTwitter size={20} className="inline mr-2" />
            Twitter
          </a>
          <a
            href="#"
            className="text-neutral-600 hover:text-blue-500 mx-4 inline-block"
          >
            <FaInstagram size={20} className="inline mr-2" />
            Instagram
          </a>
          <a
            href="/checkout"
            className="text-neutral-600 hover:text-blue-500 mx-4 inline-block"
          >
            <FaShoppingCart size={20} className="inline mr-2" />
            Cart
          </a>
        </div>

        {/* Privacy Policy Link */}
        <div>
          <a href="#" className="text-sm text-neutral-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
