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
    currentTestComponent = <Test1 />;
  } 
  else if (currentTest === 2) {
    currentTestComponent = <Test2 />;
  } 
  else if (currentTest === 3) {
    currentTestComponent = <Test3 />;
  } 
  else {
    currentTestComponent = <Sonuc/>;
  }

  return (
    <div className="test-container my-5 sm:text-sm w-full ">
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

      <div className={`${ currentTest >3 ?" hidden ":""}`}>{chartComponent}</div>
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


  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].text);
  };

  const handleReadWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
    }
  };

  const handleReadSentence = (word) => {
    setHoveredWord(word);
  };
  return (
      <div className="test-section bg-white p-5 rounded-md border-2">
        <div className="flex ">
          <div
            className="cursor-pointer p-2 mr-2 border-2 rounded-full "
            onClick={() => handleReadWord(text)}
          >
            <FaPlay size="25px" className="m-1" />
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
                </span>{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="my-10 self-center grid grid-cols-5 gap-5">
          <div className="col-span-1 md:col-span-2 sm:col-span-3">
            {hoveredWord && (
              <div className="word-detail shadow-md bg-primary/30 rounded-xl p-5 flex flex-col">
                <span className="self-center text-xl sm:text-sm font-bold p-2 mb-2">
                  ~{hoveredWord}~
                </span>
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
            )}
          </div>
          <div className="col-span-4 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex ">
            <div className="mr-10">
              <div src={audioUrl}
                className="cursor-pointer self-center rounded-full p-5 flex flex-col relative"
                onClick={() =>{oynat()}}
              >
                <FaPlay size="25px" className="m-1" />
              </div>
              Önceki Kayıt
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "hidden" : "block"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  startRecording();
                }}
              >
                <IoMdMic size="25px" className="m-1" />
              </div>
              Kayıt Başlat
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "block" : "hidden"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  stopRecording();
                }}
              >
                <FaStop size="25px" className="m-1" />
              </div>
              Kayıt Durdur
            </div>
            <div className="mr-10">
              <div className="cursor-pointer self-center rounded-full p-5">
                <FaCheck size="25px" className="m-1" />
              </div>
              Kontrol Et
            </div>
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


  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].text);
  };

  const handleReadWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
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
            onClick={() => handleReadWord(text)}
          >
            <FaPlay size="25px" className="m-1" />
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
                    </span>{" "}
                  </span>
                ))}
          </div>
        </div>
        <div className="options-sections my-10 self-center grid grid-cols-5 gap-5">
          <div className="col-span-1 md:col-span-3 sm:col-span-2 shadow-md bg-primary/30 rounded-xl p-5 flex flex-col">
              Doğru seçenek aşağıdakilerden hangisidir ?
              {texts[textIndex].otherOptions.map((option, index) => (
              <div key={index} className="shadow-md  rounded-xl p-5 flex flex-col border-2">
                {option}
              </div>
            ))}
          </div>
          <div className=" audio-sections col-span-4 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex ">
            <div className="mr-10">
              <div src={audioUrl}
                className="cursor-pointer self-center rounded-full p-5 flex flex-col relative"
                onClick={() =>{oynat()}}
              >
                <FaPlay size="25px" className="m-1" />
              </div>
              Önceki Kayıt
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "hidden" : "block"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  startRecording();
                }}
              >
                <IoMdMic size="25px" className="m-1" />
              </div>
              Kayıt Başlat
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "block" : "hidden"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  stopRecording();
                }}
              >
                <FaStop size="25px" className="m-1" />
              </div>
              Kayıt Durdur
            </div>
            <div className="mr-10">
              <div className="cursor-pointer self-center rounded-full p-5">
                <FaCheck size="25px" className="m-1" />
              </div>
              Kontrol Et
            </div>
          </div>
         
        </div>
      </div>
  )
}
const Test3=()=>{
  const metinler = [
    {question:"Yaşamaktan zevk almak neye bağlıdır ? "},
    {question:"insanlar neden mal ?"},
    {question:"İnsan ne ile yaşar?"}
  ];
  const [texts, setTexts] = useState(metinler);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState(texts[textIndex].question);
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


  /*************************************************************************** */
  const handleChangeText = () => {
    const newIndex = (textIndex + 1) % texts.length;
    setTextIndex(newIndex);
    setText(texts[newIndex].question);
  };

  const handleReadWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
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
            onClick={() => handleReadWord(text)}
          >
            <FaPlay size="25px" className="m-1" />
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
          <div className="col-span-1 md:col-span-3 sm:col-span-2 shadow-md bg-primary/30 rounded-xl p-5 flex flex-col">
              <span className="font-bold">Yukardaki soruyu yanıtlayınız: <br/></span>
              <textarea cols={40} rows={8} value={text} readOnly className="bg-transparent border-4 rounded-xl p-2"/>
           
          </div>
          <div className=" audio-sections col-span-4 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex ">
            <div className="mr-10">
              <div src={audioUrl}
                className="cursor-pointer self-center rounded-full p-5 flex flex-col relative"
                onClick={() =>{oynat()}}
              >
                <FaPlay size="25px" className="m-1" />
              </div>
              Önceki Kayıt
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "hidden" : "block"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  startRecording();
                }}
              >
                <IoMdMic size="25px" className="m-1" />
              </div>
              Kayıt Başlat
            </div>
            <div
              className={`mr-10 ${
                recorder && recorder.state === "recording" ? "block" : "hidden"
              }`}
            >
              <div
                className="cursor-pointer self-center rounded-full p-5 border-2 "
                onClick={() => {
                  stopRecording();
                }}
              >
                <FaStop size="25px" className="m-1" />
              </div>
              Kayıt Durdur
            </div>
            <div className="mr-10">
              <div className="cursor-pointer self-center rounded-full p-5">
                <FaCheck size="25px" className="m-1" />
              </div>
              Kontrol Et
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
        <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold">65 Puan </h1>
        <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold">B2 seviye </h1>
      </div>
      <h1 className="text-xl flex justify-center my-5">CEFR SEVİYESİ : </h1>
      <div className="flex justify-center"><VerticalBarChart cefr={65}  /></div>
    </div>
  )
}