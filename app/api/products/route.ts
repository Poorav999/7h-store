import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, category, stock, image } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        category,
        stock: Number(stock),
        images: [image],
        isSoldOut: false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}