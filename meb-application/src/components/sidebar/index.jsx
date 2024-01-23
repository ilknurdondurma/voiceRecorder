import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { CiAlignTop } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import {BiSolidBookAdd } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
function Sidebar() {
  const sidebarElements = [
    {
      id: 1,
      title: 'Skorlarım',
      icon: <CiAlignTop  size="20px" color='black' style={{ transform: 'rotate(180deg)' }} />,
      route:'skorlarim'
    },
    {
      id: 2,
      title: 'Okumalarım',
      icon: <FaBookOpenReader size="20px" color='black' />,
      route:'okumalarim'
    },
    {
      id: 3,
      title: 'Yeni Okuma',
      icon: <BiSolidBookAdd size="20px" color='black'/>,
      route:'yeni-okuma'
    },
  ];
  const navigate=useNavigate();
  const goReportHandle =()=>{
    navigate('/rapor/1')
}
  const progressValue = 39;
  return (
    <div className=' fixed w-1/6 md:w-1/4 border-primary bg-white border-2 rounded-xl p-1 m-4 h-4/5  '>
      <div className='h-full text-black text-lg sm:text-sm pt-5  flex flex-col justify-between'>
        <div className='self-start w-full pl-4 lg:pl-2'>
          {sidebarElements.map((menu) => (
            <NavLink key={menu.id} to={`/${menu.route}`} activeClassName="bg-primary text-white">
              <div key={menu.id} className='flex  m-2 p-2 cursor-pointer hover:bg-primary hover:text-white  rounded-md'>
                <div className='mr-2'>{menu.icon}</div>
                <div>{menu.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className=' w-3/4 h-1/3 self-center my-10 bg-primary/90 text-white p-10 rounded-3xl text-center flex flex-col justify-center border-black border-2'>
          <span className='text-sm font-bold p-1 self-center'>Son<br></br>Okuma <br></br>Performansım</span>
          <span className='self-center p-1' onClick={goReportHandle}><RoundProgressBar progress={progressValue} /></span>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;


 function  RoundProgressBar ({ progress }){
  const radius = 30; // yuvarlak çubuğun yarı çapı
  const circumference = 2 * Math.PI * radius; // yuvarlak çubuğun çevresi
  const strokeDashoffset = circumference - (progress / 100) * circumference; // çizgi boyunca boşluk

  let starCount;

  if (progress >= 70) {
    starCount = 3;
  } else if (progress >= 40) {
    starCount = 2;
  } else {
    starCount = 1;
  }

  return (
    <div className="relative flex items-center flex-col">
    <div className="relative">
      <circle className="text-gray-300 absolute top-0 left-0" size={radius * 2} style={{ transform: 'rotate(-90deg)' }} />
      <svg className="w-16 h-16">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="#f1f1f1"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute top-8 left-8 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
        {progress}%
      </div>
    </div>
    <div className="flex mt-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <span key={index}>{index < starCount ? <FaStar className="text-white" /> : <FaRegStar className="text-gray-300" />}</span>
      ))}
    </div>
  </div>
  );
};

