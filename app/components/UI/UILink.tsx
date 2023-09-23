"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UILink = {
  href: string;
  label: string;
  transparent?: boolean;
  onClick?: any;
};

export default function Home(props: UILink) {
  const [classes, setClasses] = useState(
    "block font-semibold text-center border-2 duration-300 px-6 py-3 w-fit rounded-[10px]"
  );

  useEffect(() => {
    if (props?.transparent) {
      setClasses(
        (prev) =>
          `${prev} border-white bg-transparent hover:bg-white hover:text-black`
      );
    } else {
      setClasses(
        (prev) =>
          `${prev} border-[#00925D] bg-[#00925D] hover:bg-[#41bb8e] hover:border-[#41bb8e]`
      );
    }
  }, [props?.transparent]);
  return (
    <Link className={classes} href={props?.href} onClick={props?.onClick}>
      {props?.label}
    </Link>
  );
}
