import CurrentPlaying from "@/app/components/movies/CurrentPlaying/CurrentPlaying";
import Upcoming from "@/app/components/movies/Upcoming/Upcoming";
import Popular from "@/app/components/movies/Popular/Popular";

export default function Home() {
  return (
    <div>
      <CurrentPlaying />
      <Upcoming />
      <Popular />
    </div>
  );
}
