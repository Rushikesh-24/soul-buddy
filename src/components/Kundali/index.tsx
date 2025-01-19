//@ts-nocheck
'use client'
import HTMLFlipBook from 'react-pageflip';
import Ganesh from '../../../public/ganesh.svg'
import Chart from '../../../public/chart.webp'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ReactTyped } from "react-typed";
const planetAbbr = {
    "Mercury": "Me",
    "Venus": "Ve",
    "Sun": "Su",
    "Moon": "Mo",
    "Mars": "Ma",
    "Jupiter": "Ju",
    "Saturn": "Sa",
    "Uranus": "Ur",
    "Neptune": "Ne",
    "Pluto": "Pl"
  }

function Kundali() {
  const [gems, setGems] = useState([]);

  const getGemData = async(data) => {
    const gemsR = await fetch('https://workers.vedicrishi.in/vedicrishi',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "apiName": "basic_gem_suggestion",
            "userData":{
                "birth": "Patna, Bihar",
                "country": "India",
                "day": 1,
                "gender": "male",
                "hour": 11,
                "language": "english",
                "lat": "25.5940947",
                "lon": "85.13756450000005",
                "min": 11,
                "month": 1,
                "nameu": "Rushijesh",
                "tzone": 5.5,
                "year": 1990
            }
        }) 
    })
    const gemsData = await gemsR.json();
    Object.keys(gemsData.response).forEach(function(key,index) {
        
        setGems((prev)=>[...prev, {type: key, ...gemsData.response[key]}]);
    });
  }

  useEffect(()=>{
    getGemData();
  },[])

  
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-carpet'>
    
        <HTMLFlipBook  width={600} height={700}>
            <div className="demoPage flex items-center relative justify-center h-full w-full bg-white border-2 p-5 py-20 border-r-2 border-red-500">
                <div className='w-fit mx-auto'>
                    <Image src={Ganesh.src} alt="kundali" width={70} height={60} />
                </div>
                <p className='text-red-500 mt-2 text-lg text-center'>|| Om Ganeshay Namah ||</p>
                <div className='absolute bottom-10 text-center left-0 w-full pointer-events-none'>
                    <p className='text-red-500 font-bold mb-5 text-xl text-center'>Janm Kundali</p>
                    <p className=' underline underline-offset-4'>Rushikesh Bhikaro Gaonkar</p>
                    <p className=' underline underline-offset-4 decoration-black w-full text-white'>Rushikesh Bhikaro Gaonkar</p>
                    <p className=' underline underline-offset-4 decoration-black w-full text-white'>Rushikesh Bhikaro Gaonkar</p>
                </div>
            </div>
            <div className="demoPage bg-white border-2 p-5 border-l-0 border-red-500"><HouseChart /></div>
            <div className="demoPage bg-white border-2 p-5 border-r-2 border-red-500">
                <p className='text-2xl font-semibold mb-2'>Gems</p>
                <div className="grid grid-cols-1">
                {
                    gems?.map((gem, index)=>{
                        return( 
                          <div key={index} className='border border-black mb-5 p-3 '>
                         
                           
                           
                              
                                <p className='font-semibold'><ReactTyped strings={[`${gem.type}` ]} typeSpeed={80}  /></p>
                                <p>Name: {gem.name}</p>
                                <p>Deity: {gem.gem_deity}</p>
                                <p>Wear Day: {gem.wear_day}</p>
                                <p>Semi Gem: {gem.semi_gem}</p>
                </div>
                        )
                    })
                }
                </div>
            </div>
            <div className="demoPage bg-white border-2 p-5 border-l-0 border-red-500">Page 4





              
            </div>
        </HTMLFlipBook>
    </div>
  )
}


function HouseChart(){

    const [data, setData] = useState(null)
    const [houses, setHouses] = useState([]);
    useEffect(()=>{
        setHouses(JSON.parse(localStorage.getItem('houses')));
      },[])
    
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/planet',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dob: '1990-01-01',
          tob: '10:45',
          place: 'New Delhi',
          gender: 'Male',
          name: 'Rushikesh',
        })
      });
      const data = await response.json();
      const jsonMatch = data.data2.outputs[0].outputs[0].artifacts.message.match(/```json([\s\S]*?)```/);
      const jsonString = jsonMatch[1].trim();
        console.log(jsonString); // The extracted JSON object as a string
        const jsonObject = JSON.parse(jsonString); // Parsed JSON object
        console.log(jsonObject); // The parsed JSON object
      setData(jsonObject);
    };
    //fetchData();
  }, []);

    return (
        <div>
            <p className='text-xl text-center mb-5'>Birth Chart</p>
            <div className="flex flex-col items-center justify-center  h-1/2 absolute">
                <Image src={Chart.src} alt="Chart" className='w-full h-full ' width={190} height={180} />
                {
                    houses &&
                    <>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[40%] text-xs'>1</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[16%] left-[24%] text-xs'>2</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[25%] left-[3%] text-xs'>3</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[47%] left-[42%] text-xs'>4</span>

                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[72%] left-[3%] text-xs'>5</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[79%] left-[23.5%] text-xs'>6</span>

                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[54%] left-[48%] text-xs'>7</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[79%] left-[73%] text-xs'>8</span>

                
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[16%] right-[24%] text-xs'>12</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[25%] right-[3%] text-xs'>11</span>
                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[47%] right-[42%] text-xs'>10</span>

                <span className='bg-black absolute h-5 rounded-full text-white flex justify-center items-center w-5 top-[72%] right-[3%] text-xs'>9</span>

                <span id="1" className=' absolute flex justify-center items-center  top-[20%] text-sm'>{houses[1]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="2" className=' absolute flex justify-center items-center  top-[6%] left-[24%] text-sm'>{houses[2]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="3" className=' absolute flex justify-center items-center  top-[25%] left-[10%] text-sm'>{houses[3]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="4" className=' absolute flex justify-center items-center  top-[47%] left-[20%] text-sm'>{houses[4]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="5" className=' absolute flex justify-center items-center  top-[72%] left-[10%] text-sm'>{houses[5]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="6" className=' absolute flex justify-center items-center  top-[89%] left-[23.5%] text-sm'>{houses[6]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="7" className=' absolute flex justify-center items-center  top-[74%] left-[48%] text-sm'>{houses[7]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="8" className=' absolute flex justify-center items-center  top-[89%] left-[73%] text-sm'>{houses[8]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="12" className=' absolute flex justify-center items-center  top-[5%] right-[24%] text-sm'>{houses[12]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="11" className=' absolute flex justify-center items-center  top-[25%] right-[15%] text-sm'>{houses[11]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="10" className=' absolute flex justify-center items-center  top-[47%] right-[22%] text-sm'>{houses[10]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                <span id="9" className=' absolute flex justify-center items-center  top-[72%] right-[10%] text-sm'>{houses[9]?.planets.map((planet)=>{return planetAbbr[planet.name]+" "})}</span>
                </>
                }
            </div>
        </div>
    );
}
export default Kundali