import React, { useState, useMemo, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaRandom } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoMdMic } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import EchartsBarChart from "../../../components/charts/barChart";
import VerticalBarChart from "../../../components/charts/verticalBarChart";
import { Helmet } from "react-helmet";
import { createAttempt, createReport, createStandartReport, getAllText } from "../../../api";
import errorMessage from "../../../helper/toasts/errorMessage";
import { ToastContainer } from "react-toastify";
import succesMessage from "../../../helper/toasts/successMessage";

function Test() {
  const location = useLocation();
  const formValues = location.state;

  const [currentTest, setCurrentTest] = useState(1); 

  const changeTestComp = () => {
    setCurrentTest((prevTest) => prevTest + 1);
  };


 
  const chartComponent = useMemo(() => {
    const data = [
      ["score", "product"],
      [0, "Üçüncü Deneme"],
      [0, "İkinci Deneme"],
      [90, "İlk Deneme"],
    ];
    return (
      <div className="chart-section self-start w-full h-60">
        <EchartsBarChart data={data} />
      </div>
    );
  }, []);

  let currentTestComponent;
  // Determine which test component to render based on the state
  if (currentTest === 1) {
    currentTestComponent = <Test1 studentFullName={formValues.name+" "+formValues.surname}/>;
  } 
  else if (currentTest === 2) {
    currentTestComponent = <Test2 studentFullName={formValues.name+" "+formValues.surname}/>;
  } 
  else if (currentTest === 3) {
    currentTestComponent = <Test3 studentFullName={formValues.name+" "+formValues.surname}/>;
  } 
  else {
    currentTestComponent = <Sonuc />;
  }

  return (
    <div className="test-container my-5 sm:text-sm w-full ">
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

      <div className={`sm:hidden ${ currentTest >3 ?" hidden ":""}`}>{chartComponent}</div>
    </div>
  );
}

export default Test;


const Test1=()=>{
  const metinler = [
    {text:"Matematikte açılar konusuna geçtik."},
    {text:"Bir yağmur yağsında bir şarkı çalsın."},
    {text:"Ceplerinde cümleler saklayamazsın."},
  ];
  const [texts, setTexts] = useState(metinler);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState(texts[textIndex].text);
  const [hoveredWord, setHoveredWord] = useState("Seçili Metin Yok");

  //************************************************************************** */
  const [mediaStream, setMediaStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(false);
  const [attempt, setAttempt] = useState(1);



  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
    }
  }, [audioUrl]);
  
  const oynat = () => {
    if (audio) {
      audio.play();
    }
  };


  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          console.log("Seconds changed:", prevSeconds + 1);
          return prevSeconds + 1;
        });
      }, 1000); // Her saniye bir artır
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Komponent temizlendiğinde interval'i temizle
  }, [isActive]);

  const startRecording = async () => {
    setListening(true);
    startTimer();
    setSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      const context = new AudioContext();
      setAudioContext(context);
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);
      const chunks = [];
      newRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      newRecorder.onstop = function () {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        chunks.length = 0;
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setListening(false);
        stopTimer();
        console.log("stoped");
      };

      newRecorder.start();
    } catch (error) {
      setListening(false);
      stopTimer();
      console.error("Hata:", error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
    }

    if (
      recorder &&
      (recorder.state === "recording" || recorder.state === "paused")
    ) {
      recorder.stop();
    }

    setListening(false);
  };

  const sendToAPI = async () => {
    await setAttempt(attempt+1);

    console.log("test1 göndere bastı");
    console.log(seconds);
    const quizId=JSON.parse(localStorage.getItem('quizId'))
    const jsonData = {
      "quizId":quizId,
      "attempt":attempt,
      "stage":1,
      "text":text
    };
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData));
    formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");
  
    // API'ye gönder
    setLoading(true);
    try {
      const response = await createAttempt(formData);
      setLoading(false);
      console.log("API cevabı:", response.data);
      succesMessage("başarılı işler söz konusu ");
    } catch (error) {
      setLoading(false);
      console.error("API hatası:", error);
      errorMessage(`API hatası: ${error.message}`);
    }
  };
  


  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].text);
  };

  const handleReadWord = (word) => {
    setRead(true)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };
  const handleStopReadWord = () => {
    setRead(false)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };


  const handleReadSentence = (word) => {
    setHoveredWord(word);
  };
  return (
      <div className="test-section bg-white p-5 rounded-md border-2 w-full">
        <ToastContainer/>
        <div className="flex sm:flex-col">
          <div className="flex">
              <div
                  className="cursor-pointer p-2 mr-2 border-2 rounded-full "
                  onClick={() => {read ? handleStopReadWord():handleReadWord(text)}}
                >
                  { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
              </div>
              <div
                className="cursor-pointer p-3 mr-2 flex border-2 rounded-full"
                onClick={handleChangeText}
              >
                <FaRandom size="25px" />
              </div>
          </div>
          <div className="gap-5">
            {text.split(" ").map((word, index) => (
              <span key={index}>
                <span
                  className={`underline p-3 m-3 my-5 hover:font-bold cursor-pointer text-2xl sm:text-sm  underline-offset-8 sm:my-10 ${
                    word === hoveredWord ? "font-bold" : ""
                  } `}
                  onClick={() => {
                    handleReadSentence(word);
                  }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="my-10 self-center grid grid-cols-5 gap-5">
            <div className="col-span-1 md:col-span-3 sm:col-span-3 bg-primary/30 rounded-xl">
              {hoveredWord && (
                <div className="word-detail shadow-md   p-5 flex flex-col">
                  <span className="self-center text-xl sm:text-sm font-bold p-2 mb-2">
                    ~{hoveredWord}~
                  </span>
                  <div className="grid grid-rows-2">
                    <span className="flex justify-between">
                      Örnek Okuma :
                      <div
                        className="cursor-pointer p-2 mb-2 border-2 rounded-full text-center"
                        onClick={() => handleReadWord(hoveredWord)}
                      >
                        <FaPlay size="25px" className="m-1" />
                      </div>
                    </span>
                    <span className="flex justify-between">
                      Öğrencinin Sesi :
                      <div
                        className="cursor-pointer p-2 mb-2 border-2 rounded-full text-center"
                        onClick={() => handleReadWord(hoveredWord)}
                      >
                        <FaPlay size="25px" className="m-1" />
                      </div>
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-4 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex sm:flex-col ">
                <div className="mr-10 sm:flex">
                  <div src={audioUrl}
                    className="cursor-pointer self-center rounded-full p-5 flex flex-col relative sm:p-3"
                    onClick={() =>{oynat()}}
                  >
                    <FaPlay size="25px" className="m-1" />
                  </div>
                  Önceki Kayıt
                </div>
                <div className={`mr-10 ${
                        recorder && recorder.state === "recording" ? "hidden" : "block"
                      }`}>
                    <div className=" sm:flex">
                      <div
                        className="cursor-pointer rounded-full p-5 border-2 flex justify-center sm:p-3"
                        onClick={() => {
                          startRecording();
                        }}
                      >
                        <IoMdMic size="25px" className="m-1 size-fit" />
                      </div>
                      Kayıt Başlat
                    </div>
                </div>
                <div className={`mr-10  ${
                      recorder && recorder.state === "recording" ? "block" : "hidden"
                    }`}>
                  <div className="sm:flex">
                    <div
                      className="cursor-pointer self-center rounded-full p-5 border-2 sm:p-3 "
                      onClick={() => {
                        stopRecording();
                      }}
                    >
                      <FaStop size="25px" className="m-1" />
                    </div>
                    Kayıt Durdur
                  </div>
                </div>
                <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=3 ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=3} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
                  <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
                    <FaCheck size="25px" className="m-1" />
                  </div>
                  {loading?"Gönderiliyor":`${attempt>=3?"Hakkınız Doldu":"Kontrol Et"}`}
                </button>
            </div>
          
        </div>
      </div>
  )
}
const Test2=()=>{
  const metinler = [
    {text:"Matematikte ....... konusuna geçtik.",correctWord:"açılar",otherOptions:["deyimler" , "atasözleri" ,"açılar"]},
    {text:"Bir ....... yağsında bir şarkı çalsın.",correctWord:"yağmur",otherOptions:["yağmur" , "kar" ,"dolu"]},
    {text:"Ceplerinde ...... saklayamazsın.",correctWord:"cümleler",otherOptions:["poğaçalar" , "cümleler" ,"oyuncaklar"]}
  ];
  const [texts, setTexts] = useState(metinler);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState(texts[textIndex].text);
  const [hoveredWord, setHoveredWord] = useState("Seçili Metin Yok");

  //************************************************************************** */
  const [mediaStream, setMediaStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(false);
  const [attempt, setAttempt] = useState(1);
  const [checkWrongWords, setCheckWrongWords] = useState([]);




  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
    }
  }, [audioUrl]);
  
  const oynat = () => {
    if (audio) {
      audio.play();
    }
  };
  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          console.log("Seconds changed:", prevSeconds + 1);
          return prevSeconds + 1;
        });
      }, 1000); // Her saniye bir artır
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Komponent temizlendiğinde interval'i temizle
  }, [isActive]);

  const startRecording = async () => {
    setListening(true);
    startTimer();
    setSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      const context = new AudioContext();
      setAudioContext(context);
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);
      const chunks = [];
      newRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      newRecorder.onstop = function () {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        chunks.length = 0;
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setListening(false);
        stopTimer();
        console.log("stoped");
      };

      newRecorder.start();
    } catch (error) {
      setListening(false);
      stopTimer();
      console.error("Hata:", error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
    }

    if (
      recorder &&
      (recorder.state === "recording" || recorder.state === "paused")
    ) {
      recorder.stop();
    }

    setListening(false);
  };
  const sendToAPI = async () => {
    await setAttempt(attempt+1);

    console.log("test2 göndere bastı");
    console.log(seconds);
    const quizId=JSON.parse(localStorage.getItem('quizId'))
    const jsonData = {
      "quizId":quizId,
      "attempt":attempt,
      "stage":2,
      "text":text
    };
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData));
    formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");
  
    // API'ye gönder
    setLoading(true);
    try {
      const response = await createAttempt(formData);
      setLoading(false);
      console.log("API cevabı:", response.data);
      setCheckWrongWords(response.data.data.wrongWords);
      console.log("wrooong :"+checkWrongWords)
      succesMessage("başarılı işler söz konusu ");
    } catch (error) {
      setLoading(false);
      console.error("API hatası:", error);
      errorMessage(`API hatası: ${error.message}`);
    }
  };


  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].text);
  };

  const handleReadWord = (word) => {
    setRead(true)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };
  const handleStopReadWord = () => {
    setRead(false)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };

  const handleReadSentence = (word) => {
    setHoveredWord(word);
  };
  return (
      <div className="test-section bg-white p-5 rounded-md border-2">
        <div className="text flex ">
            <div
                  className="cursor-pointer p-2 mr-2 border-2 rounded-full "
                  onClick={() => {read ? handleStopReadWord():handleReadWord(text)}}
                >
                  { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
              </div>
          <div
            className="cursor-pointer p-3 mr-2 flex border-2 rounded-full"
            onClick={handleChangeText}
          >
            <FaRandom size="25px" />
          </div>
          <div className="gap-5">
              {text.split(" ").map((word, index) => (
                  <span key={index}>
                    <span
                      className={`underline p-3 m-3 my-5 hover:font-bold cursor-pointer text-2xl sm:text-sm  underline-offset-8 sm:my-10 ${
                        word === hoveredWord ? "font-bold" : ""
                      } `}
                      onClick={() => {
                        handleReadSentence(word);
                      }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
          </div>
        </div>
        <div className="options-sections my-10 self-center grid grid-cols-5 gap-5">
        <div className="col-span-2 md:col-span-3 sm:col-span-3 shadow-md bg-primary/30 rounded-xl p-5 flex flex-col">
          Doğru seçenek aşağıdakilerden hangisidir ?
          { console.log(checkWrongWords)}
          {texts[textIndex].otherOptions.map((option, index) => {
            let backgroundColor = "";
            if (checkWrongWords.includes(texts[textIndex].correctWord)) {
              backgroundColor = option === texts[textIndex].correctWord ? "bg-green" : ""; // Doğru cevap yeşil, diğerleri default
            } else if (checkWrongWords.includes(option)) {
              backgroundColor = "bg-red-300"; // Yanlış cevap kırmızı
            }

            return (
              <div key={index} className={`shadow-md rounded-xl p-5 flex flex-col border-2 ${backgroundColor}`}>
                {option}
              </div>
            );
          })}
        </div>





          <div className="col-span-3 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex sm:flex-col ">
              <div className="mr-10 sm:flex">
                      <div src={audioUrl}
                        className="cursor-pointer self-center rounded-full p-5 flex flex-col relative sm:p-3"
                        onClick={() =>{oynat()}}
                      >
                        <FaPlay size="25px" className="m-1" />
                      </div>
                      Önceki Kayıt
              </div>
                <div className={`mr-10 ${recorder && recorder.state === "recording" ? "hidden" : "block"}`}>
                    <div className=" sm:flex">
                      <div
                        className="cursor-pointer rounded-full p-5 border-2 flex justify-center sm:p-3"
                        onClick={() => {
                          startRecording();
                        }}
                      >
                        <IoMdMic size="25px" className="m-1 size-fit" />
                      </div>
                      Kayıt Başlat
                    </div>
                </div>
                <div className={`mr-10  ${
                      recorder && recorder.state === "recording" ? "block" : "hidden"
                    }`}>
                  <div className="sm:flex">
                    <div
                      className="cursor-pointer self-center rounded-full p-5 border-2 sm:p-3 "
                      onClick={() => {
                        stopRecording();
                      }}
                    >
                      <FaStop size="25px" className="m-1" />
                    </div>
                    Kayıt Durdur
                  </div>
                </div>
                <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=3 ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=3} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
                  <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
                    <FaCheck size="25px" className="m-1" />
                  </div>
                  {loading?"Gönderiliyor":`${attempt>=3?"Hakkınız Doldu":"Kontrol Et"}`}
                </button>
          </div>
         
        </div>
      </div>
  )
}
const Test3=()=>{

  const [texts, setTexts] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [hoveredWord, setHoveredWord] = useState();

  //************************************************************************** */
  const [mediaStream, setMediaStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(false);
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    getAllText()
    .then((result) => {
      setTexts(result?.data.data);
      console.log(texts);
      // Once texts are fetched, set the initial text
      if (result?.data.data && result.data.data.length > 0) {
        setText(result.data.data[0].textValue);
      }
    })
    .catch((error) => {
      console.log(error);
      errorMessage("Bir hata oluştu");
    });
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
    }
  }, [audioUrl]);
  
  const oynat = () => {
    if (audio) {
      audio.play();
    }
  };
  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          console.log("Seconds changed:", prevSeconds + 1);
          return prevSeconds + 1;
        });
      }, 1000); // Her saniye bir artır
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Komponent temizlendiğinde interval'i temizle
  }, [isActive]);

  const startRecording = async () => {
    setListening(true);
    startTimer();
    setSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      const context = new AudioContext();
      setAudioContext(context);
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);
      const chunks = [];
      newRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      newRecorder.onstop = function () {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        chunks.length = 0;
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setListening(false);
        stopTimer();
        console.log("stoped");
      };

      newRecorder.start();
    } catch (error) {
      setListening(false);
      stopTimer();
      console.error("Hata:", error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
    }

    if (
      recorder &&
      (recorder.state === "recording" || recorder.state === "paused")
    ) {
      recorder.stop();
    }

    setListening(false);
  };
  const sendToAPI = async () => {
    await setAttempt(attempt+1);

    console.log("test1 göndere bastı");
    console.log(seconds);
    const quizId=JSON.parse(localStorage.getItem('quizId'))
    const jsonData = {
      "quizId":quizId,
      "attempt":attempt,
      "stage":3,
      "text":text
    };
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData));
    formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");
  
    // API'ye gönder
    setLoading(true);
    try {
      const response = await createAttempt(formData);
      setLoading(false);
      console.log("API cevabı:", response.data);
      succesMessage("başarılı işler söz konusu ");
    } catch (error) {
      setLoading(false);
      console.error("API hatası:", error);
      errorMessage(`API hatası: ${error.message}`);
    }
  };

  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].textValue);
  };

  const handleReadWord = (word) => {
    setRead(true)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };
  const handleStopReadWord = () => {
    setRead(false)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };

  return (
      <div className="test-section bg-white p-5 rounded-md border-2">
        <div className="text flex justify-center">
            <div
              className="cursor-pointer p-2 mr-2 border-2 rounded-full "
              onClick={() => {read ? handleStopReadWord():handleReadWord(text)}}
              >
                { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
            </div>
            <div
              className="cursor-pointer p-3 mr-2 flex border-2 rounded-full"
              onClick={handleChangeText}
            >
              <FaRandom size="25px" />
            </div>
        </div>
        <div className="grid grid-cols-5">
            <div className="col-span-4 flex justify-center">
              <textarea
                className='border-2 p-10 text-xl my-5 mx-10 mb-10 rounded-xl w-full bg-primary/20'
                value={text}
                rows={10}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
              <div className="mr-10 flex flex-col justify-center items-center">
                <div className="mr-10">
                  <div
                    src={audioUrl}
                    className="cursor-pointer self-center rounded-full p-5 flex flex-col relative"
                    onClick={() => { oynat() }}
                  >
                    <FaPlay size="25px" className="m-1" />
                  </div>
                  <span>Önceki Kayıt</span>
                </div>
                <div
                  className={`mr-10 ${
                    recorder && recorder.state === "recording" ? "hidden" : "block"
                  }`}
                >
                  <div
                    className="cursor-pointer self-center rounded-full p-5 border-2"
                    onClick={() => { startRecording() }}
                  >
                    <IoMdMic size="25px" className="m-1" />
                  </div>
                  <span>Kayıt Başlat</span>
                </div>
                <div
                  className={`mr-10 ${
                    recorder && recorder.state === "recording" ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="cursor-pointer self-center rounded-full p-5 border-2"
                    onClick={() => { stopRecording() }}
                  >
                    <FaStop size="25px" className="m-1" />
                  </div>
                  <span>Kayıt Durdur</span>
                </div>
                <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=3 ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=3} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
                  <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
                    <FaCheck size="25px" className="m-1" />
                  </div>
                  {loading?"Gönderiliyor":`${attempt>=3?"Hakkınız Doldu":"Kontrol Et"}`}
                </button>
              </div>
            </div>
        </div>

      </div>
  )
}
const Sonuc=()=>{
  return (
    <div>
      <h1 className="text-xl flex justify-center">TEST SONUCUNUZ : </h1>
      <div className="flex justify-center">
        <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold">B2 seviye </h1>
      </div>
      <h1 className="text-xl flex justify-center my-5"> SEVİYESİ : </h1>
      <div className="flex justify-center"><VerticalBarChart cefr={"B2"}  /></div>
    </div>
  )
}