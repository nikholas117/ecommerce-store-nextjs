"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300  container mx-auto px-4 mb-7 mt-4  ">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="flex items-center justify-center min-h-[650px]">
          <div className="relative w-[575px] h-[650px]">
            <Image
              src={currentProduct.images[0]}
              alt={currentProduct.name}
              layout="fill"
              objectFit="cover"
              className="object-center transition-opacity duration-500 ease-in-out "
            />
          </div>
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 ">
        <div className="bg-black p-2 rounded-2xl">
          <CardTitle className="text-5xl font-bold text-white  mb-2">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-2xl font-semibold text-white ">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
