"use client";

import { useState, useEffect } from "react";
import $http from "@/app/services/http";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Popular.scss";

export default function CurrentPlaying() {
  return (
    <div className="popular-container">
      <h1>Popular</h1>
    </div>
  );
}
