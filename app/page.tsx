import CurrentPlaying from "@/app/components/movies/CurrentPlaying/CurrentPlaying";
import Upcoming from "@/app/components/movies/Upcoming/Upcoming";

export default function Home() {
  return (
    <div>
      <CurrentPlaying />
      <Upcoming />
    </div>
  );
}
