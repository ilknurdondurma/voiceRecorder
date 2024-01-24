import React, { useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiAlignTop } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import {BiSolidBookAdd } from "react-icons/bi";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
function Navbar(){
    const backgroundImageUrl = '/header-bg.png';
    const yuzuncuyilLogoUrl = '/turkiye-yuzyili.png';
    const atatürkLogoUrl = '/header-bayrak-ataturk.png';
    const meblogo = '/meblogo.png';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const formDataObject = JSON.parse(localStorage.getItem('formData'));
    const user=formDataObject?.name;
    const navigate=useNavigate();

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleUser=()=>{
        setUserMenuOpen(!userMenuOpen);
    }
    const goHomeHandle =()=>{
        navigate('/')
    }
    const logoutHandle=()=>{
        localStorage.removeItem('formData');
        navigate('/login',{replace:false})
    }
    const sidebarElements = [
        {
          id: 1,
          title: 'Skorlarım',
          icon: <CiAlignTop  size="20px" color='white' style={{ transform: 'rotate(180deg)' }} />,
          route:'skorlarim'
        },
        {
          id: 2,
          title: 'Okumalarım',
          icon: <FaBookOpenReader size="20px" color='white' />,
          route:'okumalarim'
        },
        {
          id: 3,
          title: 'Yeni Okuma',
          icon: <BiSolidBookAdd size="20px" color='white'/>,
          route:'yeni-okuma'
        },
      ];
    return(
        <div className='w-full h-auto mb-28 flex flex-col justify-center' >
            <div className='w-full h-24 fixed top-0 left-0 z-10 justify-center rounded-lg border-b-2 mb-24' style={{backgroundImage: `url(${backgroundImageUrl})`,backgroundSize: 'cover',}}>
                <span className='flex  justify-between p-3 text-white bg font-bold md:text-sm '>
                    <span className='hover:shadow-md hover:shadow-white self-center hidden sm:block sm:mx-3' onClick={toggleSidebar}>
                        <GiHamburgerMenu color='white' size="30px"/>
                    </span>
                    <div className='flex self-center'>
                        <span className='w-32 h-16 mx-2 sm:hidden'  style={{
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
                        <span 
                            className='w-14 h-14 px-2 sm:mx-3'
                            style={{
                                backgroundImage: `url(${meblogo})`,
                                backgroundSize: 'cover',
                                }}
                            onClick={goHomeHandle}    
                                >
                                
                        </span>
                        <span className='p-1'> T.C MİLLİ EĞİTİM <br></br> BAKANLIĞI</span>
                    </div>
                    
                    <span className='flex self-center cursor-pointer bg-tertiary md:bg-transparent sm:bg-transparent lg:bg-transparent xl:text-black 2xl:text-black'onClick={toggleUser}>
                        <span className='text-center sm:text-sm px-2'><PiStudentFill color='black' size="20px" /></span>
                        <span className='hover:underline text-center sm:text-sm md:text-sm' >{user}</span>
                    </span>
                </span>
            </div>

            {/** sm sidebar menu */}
            <div className='hidden sm:block bg-primary fixed top-24 left-0 z-10 w-full h-auto'>
                {isSidebarOpen && (
                    sidebarElements.map((menu) => (
                        <NavLink key={menu.id} to={`/${menu.route}`} activeClassName="bg-primary text-white">
                        <div key={menu.id} className='flex  m-2 p-2 cursor-pointer hover:bg-primary text-white hover:text-white  rounded-md '>
                          <div className='mr-2'>{menu.icon}</div>
                          <div>{menu.title}</div>
                        </div>
                         </NavLink>
                      ))
            )}
            </div>

            {/** user menu */}
            <div className=' bg-primary fixed top-24 right-0 z-10  h-auto'>
                {userMenuOpen && (
                    <NavLink  to={'/login'} activeClassName="bg-primary text-white">
                    <div className='flex  m-2 p-2 cursor-pointer hover:bg-primary text-white hover:text-white  rounded-md ' onClick={logoutHandle}>
                      <div className='mr-2'><IoMdLogOut size="20px" color='white'/></div>
                      <div>Çıkış Yap</div>
                    </div>
                     </NavLink>
            )}
            </div>
        </div>
    );
}
export default Navbar;