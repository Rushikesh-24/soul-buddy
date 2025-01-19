import ZodiacSign from "@/components/ZodiacSign";
import Hero from "../components/Hero";
import Kundali from "@/components/Kundali";
import Footer from '@/components/Footer/index'
export default function Home() {
  const string = 'Hello World ';
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Hero />
      <ZodiacSign/>
      <Kundali />
      <Footer/>
    </div>
  );
}
