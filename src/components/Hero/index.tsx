'use client'
import Image from "next/image";
import chakra from '../../../public/Chakra.svg'
import rabit from '../../../public/rabbit.png'
import { useEffect } from "react";
import gsap from "gsap";

function Hero() {
  useEffect(()=>{
    gsap.fromTo(".chakra-images",{
      scale:2
    },{
      rotate: 360,
      duration: 35,
      repeat: -1,
      scale:2
    })
  },[])
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-[#212b2b] relative">
      <div className="fixed top-0 flex justify-center items-center size-full flex-col">
          <h1 className="font-voyage text-white lg:text-[13rem]  sm:text-9xl text-7xl font-bold w-full md:px-20 md:text-left text-center">Soul Buddy</h1>
          <p className="view absolute md:left-24  md:bottom-24 left-5 bottom-5 text-4xl font-kobe2 text-[#646a6a] flex flex-col"><span>Explore the occult and
            </span> <span>reveal your future</span></p>
      <Image src={chakra} alt="chakra" className="absolute -z-10 -right-44 chakra-images "/>
      <Image src={rabit}   alt="rabit" className="absolute -z-10 -right-[43%] -top-[10%] scale-110 lg:flex hidden"/>
      </div>
    </div>
  );
}

export default Hero;
