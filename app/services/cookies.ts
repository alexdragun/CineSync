import { isServer } from "@/app/utils/global";
const headers = import("next/headers");

export default function CookiesService() {
  const getCookiesClientSide = (name: string) => {
    let cookie: any = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[name];
  };

  const get = async (name: string) => {
    if (isServer) {
      return (await headers).cookies().get(name)?.value;
    }
    return getCookiesClientSide(name);
  };

  return { get };
}
