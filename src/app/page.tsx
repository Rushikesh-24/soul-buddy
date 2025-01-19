import ZodiacSign from "@/components/ZodiacSign";
import Hero from "../components/Hero";
import Kundali from "@/components/Kundali";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Hero />
      <ZodiacSign/>
    </div>
  );
}
