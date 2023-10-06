"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import UILink from "@/app/components/UI/UILink";
import "./Header.scss";

export default function Header() {
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/" },
    { label: "Movie Releases", path: "/" },
    { label: "Forum", path: "/" },
    { label: "About", path: "/" },
  ];

  const toggleMenu = () => {
    setIsOpened((current) => !current);
  };

  const handleResize = () => setWidth(window.innerWidth);
  const handleScroll = () => setOffset(window.scrollY);

  useEffect(() => {
    handleResize();
    handleScroll();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    if (width >= 1024) {
      setIsOpened(false);
    }
    offset >= 20 ? setIsScrolled(true) : setIsScrolled(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [width, offset]);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header--left">
        <Image src={Logo} alt="Logo"></Image>
      </div>
      <div className="header--center">
        {links.map((obj, index) => (
          <Link className="link" key={index} href={obj.path}>
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
              className="link"
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
