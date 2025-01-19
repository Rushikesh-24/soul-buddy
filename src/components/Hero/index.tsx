'use client'
import Image from "next/image";
import chakra from '../../../public/Chakra.svg'
import rabit from '../../../public/rabbit.png'
import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

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
    <div className="w-full h-screen flex justify-center items-center flex-col bg-[#212b2b] relative z-0">
      <div className="fixed top-0 flex justify-center items-center size-full flex-col">
          <h1 className="font-voyage text-white lg:text-[13rem]  sm:text-9xl text-7xl font-bold w-full md:px-20 md:text-left text-center">Soul Buddy</h1>
          <div className="absolute md:left-24  md:bottom-24 left-5 bottom-5 flex flex-col gap-2">

          <p className="view  text-4xl font-kobe2 text-[#646a6a] flex flex-col"><span>Explore the occult and
            </span> <span>reveal your future</span></p>
            <Link href={'/home'} className=" mt-2 bg-gradient-to-r from-[#646a6a] to-[#1a2222] text-white w-2/3 flex justify-center items-center p-2 rounded-full  hover:from-[#1a2222] hover:to-[#646a6a] transition duration-500 transform hover:scale-105 font-sans shadow-white hover:shadow-sm">Get your Kundali</Link>
          </div>
     
      <Image src={chakra} alt="chakra" className="absolute -z-10 -right-44 chakra-images "/>
      <Image src={rabit}   alt="rabit" className="absolute -z-10 -right-[43%] -top-[10%] scale-110 lg:flex hidden"/>
      </div>
    </div>
  );
}

export default Hero;
