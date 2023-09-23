"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import UILink from "@/app/components/UI/UILink";
import "./Header.scss";

export default function Header() {
  const [width, setWidth] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const links = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/movie/123" },
    { label: "Movie Releases", path: "/" },
    { label: "Forum", path: "/" },
    { label: "About", path: "/" },
  ];

  const toggleMenu = () => {
    setIsOpened((current) => !current);
  };

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    if (width >= 1024) {
      setIsOpened(false);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <header className="header">
      <div className="header--left">
        <Image src={Logo} alt="Logo"></Image>
      </div>
      <div className="header--center">
        {links.map((obj, index) => (
          <Link key={index} href={obj.path}>
            {obj.label}
          </Link>
        ))}
      </div>
      <div className="header--right">
        <UILink transparent href="/" label="Sign up" />
        <UILink href="/" label="Login" />
      </div>
      <div
        className={isOpened ? "hamburger hamburger-active" : "hamburger"}
        onClick={() => toggleMenu()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={
          isOpened ? "header--mobile header--mobile--active" : "header--mobile"
        }
      >
        <div className="header--mobile__inner">
          {links.map((obj, index) => (
            <Link
              key={index}
              href={obj.path}
              onClick={() => setIsOpened(false)}
            >
              {obj.label}
            </Link>
          ))}
          <div className="auth-buttons">
            <UILink
              transparent
              href="/"
              label="Sign up"
              onClick={() => setIsOpened(false)}
            />
            <UILink href="/" label="Login" onClick={() => setIsOpened(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
