import React, { useEffect, useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiAlignTop } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import {BiSolidBookAdd } from "react-icons/bi";
function Navbar(){
    const backgroundImageUrl = '/header-bg.png';
    const yuzuncuyilLogoUrl = '/logo-100yil.png';
    const atatürkLogoUrl = '/header-bayrak-ataturk.png';
    const meblogo = '/meblogo.png';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user="İLKNUR DONDURMA"

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const sidebarElements = [
        {
          id: 1,
          title: 'Skorlarım',
          icon: <CiAlignTop  size="20px" color='black' style={{ transform: 'rotate(180deg)' }} />,
          route:'/skor'
        },
        {
          id: 2,
          title: 'Okumalarım',
          icon: <FaBookOpenReader size="20px" color='black' />,
          route:'/okumalarim'
        },
        {
          id: 3,
          title: 'Yeni Okuma',
          icon: <BiSolidBookAdd size="20px" color='black'/>,
          route:'yeni-okuma'
        },
      ];
    return(
        <div className='w-full h-auto mb-28 flex flex-col justify-center' >
            <div className='w-full h-24 fixed top-0 left-0 z-10 justify-center rounded-lg border-b-2 mb-24' style={{backgroundImage: `url(${backgroundImageUrl})`,backgroundSize: 'cover',}}>
                <span className='flex  justify-between p-3 text-white bg font-bold md:text-sm '>
                    <span className='hover:shadow-md hover:shadow-white self-center hidden sm:block' onClick={toggleSidebar}>
                        <GiHamburgerMenu color='white' size="30px"/>
                    </span>
                    <div className='flex self-center'>
                        <span className='w-14 h-14 mx-2 sm:hidden'  style={{
                                backgroundImage: `url(${yuzuncuyilLogoUrl})`,
                                backgroundSize: 'cover',
                                }}>
                                    
                        </span>
                        <span className='w-32 h-14 sm:hidden'  style={{
                                backgroundImage: `url(${atatürkLogoUrl})`,
                                backgroundSize: 'cover',
                                }}>
                                    
                        </span>
                    </div>
                    <div className='flex justify-center'>
                        <span className='w-14 h-14 px-2'  style={{
                            backgroundImage: `url(${meblogo})`,
                            backgroundSize: 'cover',
                            }}>
                                
                        </span>
                        <span className='p-1'> T.C MİLLİ EĞİTİM <br></br> BAKANLIĞI</span>
                    </div>
                    
                    <span className='flex self-center'>
                        <span className='text-center sm:text-sm px-3'><PiStudentFill color='white' size="20px" /></span>
                        <span className='hover:underline text-center sm:text-sm md:text-sm'>{user}</span>
                    </span>
                </span>
            </div>
            <div className='hidden sm:block bg-primary fixed top-24 left-0 w-full h-auto'>
                {isSidebarOpen && (
                    sidebarElements.map((menu) => (
                        <div key={menu.id} className='flex  m-2 p-2 cursor-pointer hover:bg-primary text-white hover:text-white  rounded-md '>
                          <div className='mr-2'>{menu.icon}</div>
                          <div>{menu.title}</div>
                        </div>
                      ))
            )}
            </div>
        </div>
    );
}
export default Navbar;