import { useEffect } from 'react';
import './spin.css';
import { FaSpinner } from "react-icons/fa";
const  Spin =({label})=>{
  useEffect(() => {
   console.log("spin")
}, []);
  
    return(
      <div className="spinner-container">
            <div className="spinner">
            </div>
      </div>
    );
}
export default Spin;
