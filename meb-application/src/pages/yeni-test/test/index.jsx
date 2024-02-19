import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import EchartsBarChart from "../../../components/charts/barChart";
import VerticalBarChart from "../../../components/charts/verticalBarChart";
import { Helmet } from "react-helmet";
import Test3 from "./soru3/index";
import Test2 from "./soru2/index";
import Test1 from "./soru1/index";
import Sonuc from "./sonuc";
import { ToastContainer } from "react-toastify";
import errorMessage from "../../../helper/toasts/errorMessage";


function Test() {
  const location = useLocation();
  const formValues = location.state;
  const [currentTest, setCurrentTest] = useState(1); 
  const navigate=useNavigate()

  const changeTestComp = () => {
    setCurrentTest((prevTest) => prevTest + 1);
  };

  let currentTestComponent;
  // Determine which test component to render based on the state
  if (currentTest === 1) {
    currentTestComponent = <Test1 />;
  } 
  else if (currentTest === 2) {
    currentTestComponent = <Test2 />;
  } 
  else if (currentTest === 3) {
    currentTestComponent = <Test3/>;
  } 
  else{
   currentTestComponent=<Sonuc/>
  }
 

  return (
    <div className="test-container my-5 sm:text-sm w-full ">
      <ToastContainer/>
      <Helmet>
        <title>Yeni Test</title>
      </Helmet>
      <div className="student-section flex gap-2 sm:mx-0 mb-10 border-b-2">
        Öğrenci :<p>{formValues.name}</p>
        <p>{formValues.surname}</p>
        <p>Sınıf: {formValues.class}</p>
      </div>
      {currentTestComponent}
      <div className="flex justify-end w-full">
        <div className="w-1/6 bg-green hover:underline cursor-pointer rounded-xl" onClick={changeTestComp}>
          <div className={`flex justify-center m-1 p-1 ${ currentTest >3 ?" hidden ":""}`}>
            <GrFormNextLink size="25px" className="m-1" />
            { currentTest ===3 ?"Bitir":"Sonraki Soru"}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Test;






const ChartComponent = ({ data }) => {
  console.log("Chart Component rendering");
  return (
    <div className="chart-section self-start w-full h-60">
      <EchartsBarChart data={data} />
    </div>
  );
};
