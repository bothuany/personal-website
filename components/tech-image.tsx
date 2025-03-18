"use client";

import Image from "next/image";

export default function TechImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg?height=40&width=40";
      }}
    />
  );
}
