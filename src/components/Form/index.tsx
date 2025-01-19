'use client'
import React, { useState } from 'react';
import { ChevronRight, Loader } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BirthDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    month: '',
    day: '',
    year: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    state: '',
    city: '',
  });

  // Sample Indian states - you should expand this list
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Sample cities object - you should populate this based on selected state
  const citiesByState: { [key: string]: string[] } = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry", "Kadapa"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila", "Pasighat", "Roing", "Aalo", "Tezu"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur", "Nagaon", "Tinsukia", "Bongaigaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Rajnandgaon", "Jagdalpur", "Raigarh"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Sonipat", "Yamunanagar", "Rohtak"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Una", "Kullu", "Bilaspur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Davanagere", "Bellary", "Tumkur"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Kannur", "Alappuzha", "Palakkad"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati"],
    "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul", "Senapati", "Tamenglong", "Chandel"],
    "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Cherrapunjee", "Mairang"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Mamit", "Saiha"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Balasore", "Puri", "Jeypore"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Moga"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bharatpur"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Ravangla", "Pelling", "Jorethang", "Singtam"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Adilabad"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa", "Belonia", "Khowai", "Sonamura"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Meerut", "Bareilly", "Aligarh"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Haldwani", "Almora", "Pithoragarh", "Kashipur"],
    "West Bengal": ["Kolkata", "Asansol", "Durgapur", "Siliguri", "Howrah", "Darjeeling", "Kharagpur", "Malda"],
    "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Rangat", "Mayabunder", "Car Nicobar", "Campbell Bay"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Amli"],
    "Delhi": ["New Delhi", "Delhi", "Dwarka", "Rohini"],
    "Ladakh": ["Leh", "Kargil", "Nubra Valley", "Zanskar"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Androth"],
    "Puducherry": ["Pondicherry", "Karaikal", "Mahe", "Yanam"],
  };

interface FormData {
    name: string;
    gender: string;
    month: string;
    day: string;
    year: string;
    hour: string;
    minute: string;
    ampm: string;
    state: string;
    city: string;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}
const { push } = useRouter()
const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};
//@ts-ignore
const getGemData = async(birth, lat, long, hour, min, month, year, gender, name) => {
  const gemsR = await fetch('https://workers.vedicrishi.in/vedicrishi',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "apiName": "basic_gem_suggestion",
          "userData":{
              "birth": birth,
              "country": "India",
              "day": 1,
              "gender": gender,
              "hour": hour,
              "language": "english",
              "lat": lat,
              "lon": long,
              "min": min,
              "month": month,
              "nameu": name,
              "tzone": 5.5,
              "year": year
          }
      }) 
  })
  const gemsData = await gemsR.json();
  let sGems:any = []
  Object.keys(gemsData.response).forEach(function(key,index) {
      
      sGems.push({type: key, ...gemsData.response[key]});
  });
  localStorage.setItem('gems', JSON.stringify(sGems));
  push("/kundali")
  setLoading(false)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission - you can add your logic here
    console.log('Form Data:', formData);
    //post request to a route
    const getData = async() =>{

        try {
            const response = await fetch('/api/planet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dob: `${formData.year}-${formData.month}-${formData.day}`,
                tob: `${formData.hour}:${formData.minute}`,
                tobFormat: formData.ampm === 'PM' && formData.hour !== '12' ? 
                      `${parseInt(formData.hour) + 12}:${formData.minute}` : 
                      formData.ampm === 'AM' && formData.hour === '12' ? 
                      `00:${formData.minute}` : 
                      `${formData.hour}:${formData.minute}`,
                place: `${formData.state} , India`,
                name: `${formData.name}`,
                gender: `${formData.gender}`,
                address: `${formData.city}, ${formData.state} India`
            }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${response.status} - ${errorData.error}`);
            }

            const data = await response.json();
            let lat = JSON.parse(data.data2.outputs[0].outputs[0].artifacts.message).data.latitude
            let long = JSON.parse(data.data2.outputs[0].outputs[0].artifacts.message).data.longitude
            const birthChart = (JSON.parse(data.data2.outputs[0].outputs[0].artifacts.message).birth_chart);
            
            let houses:any = []
            Object.keys(birthChart).forEach(function(key,index) {
                houses.push({number: key, planets: birthChart[key].planets});
            });
            localStorage.setItem('houses', JSON.stringify(houses));
            const response2 = await fetch('/api/insights', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: formData.name,
              }),
              });
  
              if (!response2.ok) {
                  const errorData = await response2.json();
                  throw new Error(`Network response was not ok: ${response2.status} - ${errorData.error}`);
              }
              else{
                  const data2 = await response2.json();
                  localStorage.setItem('astrouser', formData.name);
                  localStorage.setItem('insights', data2.outputs[0].outputs[0].artifacts.message.replace(/\\n/g, '').replace(/\\/g, ''));
                  console.log(data2)
              }

              getGemData(`${formData.city}, ${formData.state}`, lat, long, formData.hour, formData.minute, formData.month, formData.year, formData.gender, formData.name);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    }
    getData()
    // Navigate to next page or handle data as needed
};

  return (
    <div className="w-full h-screen flex justify-center items-center border overflow-hidden bg-[#f3f3ee] z-10">
      {
        loading &&
        <div className="w-screen h-screen fixed flex-col top-0 left-0 backdrop-blur-lg flex items-center justify-center bg-[#fdfdfb] z-20">
          <Loader color="black" size="50" className=" animate-spin" />
          <h2 className="font-kobe text-3xl mb-8 text-center">Making your kundali...</h2>
        </div>
      }
      <div className="w-[75%] md:h-[85%] h-[90%] bg-[#fdfdfb] flex justify-center drop-shadow-md items-center flex-col p-8">
        <h2 className="font-kobe text-3xl mb-8">Birth Details</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Details */}
          <div className="md:col-span-2">
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              />
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Month
              <select 
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Day
              <select 
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              Year
              <select 
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={2025 - i} value={2025 - i}>{2025 - i}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Time of Birth */}
          <div className="flex gap-2">
            <label className="flex flex-col font-kobe2 font-semibold text-xl flex-1">
              Hour
              <select
                name="hour"
                value={formData.hour}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Hour</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{(i + 1).toString().padStart(2, '0')}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col font-kobe2 font-semibold text-xl flex-1">
              Minute
              <select
                name="minute"
                value={formData.minute}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Minute</option>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col font-kobe2 font-semibold text-xl flex-1">
              AM/PM
              <select
                name="ampm"
                value={formData.ampm}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </label>
          </div>

          {/* Place of Birth */}
          <div>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              State
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="flex flex-col font-kobe2 font-semibold text-xl">
              City
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="p-3 mt-1 text-lg font-normal border-[#767522] border focus:outline-none rounded-2xl"
                required
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {formData.state && citiesByState[formData.state]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button 
              type="submit"
              className="w-full font-kobe text-white bg-[#3d3d3b] px-3 py-3 text-xl rounded-full hover:bg-[#2a2a29] transition-colors flex items-center justify-center gap-2"
            >
              Submit Details
              <ChevronRight size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthDetailsForm;