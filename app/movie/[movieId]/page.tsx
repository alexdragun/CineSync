"use client";
import { useEffect } from "react";
import $http from "@/app/api/http";
import { useParams } from "next/navigation";

export default function SingleMovie() {
  const routeParams = useParams();
  useEffect(() => {
    $http()
      .get(`movie/${routeParams?.movieId}`)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  return <div>This is movie</div>;
}
