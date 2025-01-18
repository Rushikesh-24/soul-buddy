//@ts-nocheck
'use client'
import HTMLFlipBook from 'react-pageflip';
import Ganesh from '../../../public/ganesh.svg'
import Image from 'next/image';
function Kundali() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-carpet'>
        <p className='text-red-500 text-5xl mb-5 text-center'>Kundali</p>
        <HTMLFlipBook  width={500} height={600}>
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
            <div className="demoPage bg-white border-2 p-5 border-l-0 border-red-500">Page 2</div>
            <div className="demoPage bg-white border-2 p-5 border-r-2 border-red-500">Page 3</div>
            <div className="demoPage bg-white border-2 p-5 border-l-0 border-red-500">Page 4</div>
        </HTMLFlipBook>
    </div>
  )
}

export default Kundali