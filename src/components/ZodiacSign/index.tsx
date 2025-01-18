'use client'
import Image, { StaticImageData } from "next/image";
import chakra from '../../../public/Chakra.svg'
import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Aquaris from "../../../public/sign/Aquarius Zodiac Sign.webp"
import Aries from "../../../public/sign/Aries Zodiac Sign.webp"
import Cancer from "../../../public/sign/Cancer Zodiac Sign.webp"
import Capricon from "../../../public/sign/Capricorn Zodiac Sign.webp"
import Gemini from "../../../public/sign/Gemini Zodiac Sign.webp"
import Leo from "../../../public/sign/Leo Zodiac Sign.webp"
import Libra from "../../../public/sign/Libra Zodiac Sign.webp"
import Pisces from "../../../public/sign/Pisces Zodiac Sign.webp"
import Sagittarius from "../../../public/sign/Sagittarius Zodiac Sign.webp"
import Scorpio from "../../../public/sign/Scorpio Zodiac Sign.webp"
import Taurus from "../../../public/sign/Taurus Zodiac Sign.webp"
import Virgo from "../../../public/sign/Virgo Zodiac Sign.webp"

const signs = [
  {
    name: "Aries",
    date: "March 21 - April 19",
    image: Aries,
    description: "As the first sign of the zodiac, Aries embodies leadership, energy, and a pioneering spirit. Bold and fearless, Aries are trailblazers who excel at initiating projects and inspiring others. Their determination and confidence make them natural leaders, but their passion can sometimes lead to impatience. Aries thrive on challenges and love to take the lead."
  },
  {
    name: "Taurus",
    date: "April 20 - May 20",
    image: Taurus,
    description: "Taurus, the second sign of the zodiac, values stability, comfort, and beauty. Known for their dependability and practicality, Taureans are also deeply sensual, appreciating the finer things in life. They are hardworking, patient, and loyal, often striving to create a secure and luxurious environment for themselves and their loved ones."
  },
  {
    name: "Gemini",
    date: "May 21 - June 20",
    image: Gemini,
    description: "Gemini, the social butterfly of the zodiac, is curious, adaptable, and quick-witted. They thrive on communication and learning, making them excellent conversationalists and thinkers. Geminis love exploring new ideas and experiences, bringing energy and excitement wherever they go. Their dual nature makes them versatile but can also lead to indecisiveness."
  },
  {
    name: "Cancer",
    date: "June 21 - July 22",
    image: Cancer,
    description: "Cancer, the nurturer of the zodiac, is deeply intuitive, empathetic, and family-oriented. They are profoundly connected to their emotions and find comfort in creating a safe and loving home. While their protective and caring nature is their strength, they can be sensitive to external influences and guard their hearts carefully."
  },
  {
    name: "Leo",
    date: "July 23 - August 22",
    image: Leo,
    description: "Leo, ruled by the Sun, shines with confidence, creativity, and generosity. They love being in the spotlight and inspiring others with their charm and warmth. Natural-born leaders, Leos are driven by a desire to achieve greatness while spreading joy. Their loyalty and charisma make them unforgettable, though their pride may sometimes need balancing."
  },
  {
    name: "Virgo",
    date: "August 23 - September 22",
    image: Virgo,
    description: "Virgo, the perfectionist of the zodiac, is known for their analytical mind, attention to detail, and practical approach to life. They are dedicated problem-solvers who find joy in organization and helping others. While their meticulous nature drives excellence, Virgos thrive when they allow themselves to embrace imperfection and trust the process."
  },
  {
    name: "Libra",
    date: "September 23 - October 22",
    image: Libra,
    description: "Libra is the epitome of balance, harmony, and elegance. With a strong sense of fairness and diplomacy, Libras excel in fostering relationships and resolving conflicts. They are deeply drawn to beauty, art, and aesthetics, often seeking to create environments that reflect their love for peace and refinement."
  },
  {
    name: "Scorpio",
    date: "October 23 - November 21",
    image: Scorpio,
    description: "Scorpio, the most intense and transformative sign of the zodiac, is driven by passion, determination, and mystery. They possess immense emotional depth and an innate ability to see beyond the surface. Fiercely loyal and resourceful, Scorpios are natural investigators who embrace growth and transformation, often emerging stronger from challenges."
  },
  {
    name: "Sagittarius",
    date: "November 22 - December 21",
    image: Sagittarius,
    description: "Sagittarius is the adventurer of the zodiac, driven by a love for freedom, exploration, and knowledge. With an optimistic and philosophical outlook on life, Sagittarians are constantly seeking new experiences and wisdom. Their enthusiasm and honesty inspire those around them, though they thrive when they balance their wanderlust with grounding."
  },
  {
    name: "Capricorn",
    date: "December 22 - January 19",
    image: Capricon,
    description: "Capricorn, the ambitious and disciplined achiever, is known for their dedication to goals and mastery of practical matters. They are hardworking, resourceful, and strategic, often climbing to success with persistence. Capricorns value tradition and responsibility, finding fulfillment in their ability to build lasting legacies and lead by example."
  },
  {
    name: "Aquarius",
    date: "January 20 - February 18",
    image: Aquaris,
    description: "Aquarius is the visionary of the zodiac, known for their originality, independence, and humanitarian nature. They are innovative thinkers who value progress and often seek to improve society. Aquarians are deeply intellectual and thrive in environments where they can express their unique ideas while staying true to their ideals."
  },
  {
    name: "Pisces",
    date: "February 19 - March 20",
    image: Pisces,
    description: "Pisces, the dreamer of the zodiac, is deeply empathetic, intuitive, and connected to the spiritual realm. Known for their artistic and compassionate nature, they are often drawn to creative pursuits and helping others. Pisceans find strength in their emotional depth, creating profound connections and bringing healing wherever they go."
  }
];

function ZodiacSign() {
  const [click, setClick] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    initializeAnimation();
  }, []);

  const initializeAnimation = () => {
    gsap.fromTo(".chakra-image", 
      { rotation: 0, scale: 0.5 }, 
      { 
        rotation: 360, 
        duration: 2, 
        ease: "power1.inOut",
        scale: 1, 
        scrollTrigger: {
          trigger: ".chakra-image",
          start: "top 80%",
          toggleActions: "play none none reverse"
        } 
      }
    );
  };

  interface ZodiacSign {
    name: string;
    date: string;
    image: StaticImageData;
    description: string;
  }

  interface DateRange {
    sign: string;
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
  }

  const getZodiacSign = (month: string, day: string): ZodiacSign | null => {
    const dates: DateRange[] = [
      { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
      { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
      { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
      { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
      { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
      { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
      { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
      { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
      { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
      { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
      { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
      { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
    ];

    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    for (const period of dates) {
      if (
        (monthNum === period.startMonth && dayNum >= period.startDay) ||
        (monthNum === period.endMonth && dayNum <= period.endDay)
      ) {
        const signIndex = signs.findIndex(sign => sign.name === period.sign);
        setCurrentSignIndex(signIndex);
        return signs.find(sign => sign.name === period.sign) || null;
      }
    }
    return null;
  };

  const navigateSign = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentSignIndex + 1) % signs.length 
      : (currentSignIndex - 1 + signs.length) % signs.length;

    setCurrentSignIndex(newIndex);
    setZodiacSign(signs[newIndex]);

  };

  
  const submit = () => {
    if (month && day) {
      const sign = getZodiacSign(month, day);
      setZodiacSign(sign);
      setClick(true);
      
      gsap.fromTo(".result-container", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
      );
    }
  };

  const reset = () => {
    setMonth("");
    setDay("");
    setYear("");
    setZodiacSign(null);
    setClick(false);
    initializeAnimation();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center border overflow-hidden bg-[#f3f3ee] z-10">
      <div className="w-[75%] md:h-[65%] h-[90%] bg-[#fdfdfb] flex justify-center items-center flex-col md:flex-row drop-shadow-sm">
        <div className="md:w-[44.3%] md:h-full w-full h-1/2 flex justify-center items-center flex-col gap-10">
          <h2 className="font-kobe md:text-3xl text-2xl text-left w-4/5">Find your zodiac sign</h2>
          <div className="flex flex-col md:gap-5 gap-3 w-4/5 h-4/5 justify-center">
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Month
              <select 
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Day
              <select 
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Year
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={2025 - i} value={2025 - i}>
                    {2025 - i}
                  </option>
                ))}
              </select>
            </label>
            <button 
              className="mt-5 w-full font-kobe text-white bg-[#3d3d3b] px-3 py-3 text-xl rounded-full hover:bg-[#2a2a29] transition-colors" 
              onClick={click ? reset : submit}
            >
              {click ? "Reset" : "Reveal my sign"}
            </button>
          </div>
        </div>
        <div className="md:w-[0.1%] w-full bg-[#dfdfda] md:h-4/5 h-[0.1%] rounded my-2"></div>
        <div className="md:w-[55.6%] md:h-full w-full h-1/2 flex justify-center items-center">
          {!click ? (
            <Image src={chakra} alt="" className="md:h-auto h-3/4 chakra-image" />
          ) : zodiacSign && (
            <div className="relative w-4/5 h-4/5 flex justify-center items-center">
              <button 
                onClick={() => {navigateSign('prev')}}
                disabled={false}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-[#3d3d3b] text-white rounded-full hover:bg-[#2a2a29] transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="result-container w-full h-4/5 flex flex-col items-center justify-center gap-6">
                <h3 className="font-kobe text-2xl md:text-3xl text-center">{zodiacSign.name}</h3>
                <p className="font-kobe2 text-lg text-center">{zodiacSign.date}</p>
                <Image src={zodiacSign.image} alt={zodiacSign.name} 
                  className="size-40  object-cover rounded-full aspect-square"/>
                <div className="relative w-full">
                  <p className={`font-kobe2 text-center px-4 text-lg transition-all duration-300`}>
                  {zodiacSign.description}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => navigateSign('next')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-[#3d3d3b] text-white rounded-full hover:bg-[#2a2a29] transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ZodiacSign;