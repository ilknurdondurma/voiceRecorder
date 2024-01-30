import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import React from "react";
export default function  RoundProgressBar ({ progress , star , color="#f1f1f1" }){
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
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute top-8 left-8 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">
          {progress}%
        </div>
      </div>
      {star===true 
      ?(
        <div className="flex mt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index}>{index < starCount ? <FaStar className="text-white" /> : <FaRegStar className="text-gray-300" />}</span>
        ))}
      </div>
      )
      :(<div></div>)}
    </div>
    );
  };
  