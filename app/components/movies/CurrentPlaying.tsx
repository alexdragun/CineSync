"use client";

import { useState, useEffect } from "react";
import $http from "@/app/api/http";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { NowPlaying, Genre } from "@/app/types/movies";
import UILink from "@/app/components/UI/UILink";
import "swiper/css";
import "swiper/css/pagination";
import "./CurrentPlaying.scss";

export default function CurrentPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const getMoviesGenres = async () => {
    try {
      const response = await $http().get("api/genre/movie/list");

      setGenres(response.genres);
    } catch (e) {
      setGenres([]);
    }
  };

  const showGenre = (genreId: number) =>
    genres.find((obj) => obj.id === genreId)?.name;

  useEffect(() => {
    $http()
      .get("api/movie/now_playing")
      .then((res) => {
        setNowPlaying(res.results);
        getMoviesGenres();
      })
      .catch(() => {
        setNowPlaying([]);
      });
  }, []);

  return (
    <div className="movie-container">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {nowPlaying?.map((obj) => (
          <SwiperSlide key={obj.id}>
            <Image
              className="movie-image"
              src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`}
              alt={obj.title}
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="movie-info">
              <div className="movie-info__inner">
                <h1 className="font-semibold mb-3">{obj.title}</h1>
                <div className="flex text-[#9CA4AB]">
                  <p className="vote">{obj.vote_average}</p>
                  <p className="ml-2">
                    • {new Date(obj.release_date).getFullYear()}
                  </p>
                  {obj.genre_ids.map((genreId) => (
                    <p className="ml-2" key={genreId}>
                      • {showGenre(genreId)}
                    </p>
                  ))}
                </div>
                <p className="max-w-3xl mt-4 mb-6">{obj.overview}</p>
                <UILink href={`movie/${obj.id}`} label="Read more" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
