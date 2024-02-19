import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa6";
import { IoMdMic } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
function VoiceRecordComponent({sendToAPI,audioUrl,setAudioUrl,seconds, setSeconds,loading, setLoading,attempt, setAttempt}) {
    const [mediaStream, setMediaStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [listening, setListening] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [audio, setAudio] = useState(null);
    const attemptCount=4;
  
  
  
    useEffect(() => {
      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        setAudio(newAudio);
      }
    }, []);
    
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
  return (
    <>
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
        <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=attemptCount ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=attemptCount} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
        <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
            <FaCheck size="25px" className="m-1" />
        </div>
        {loading?"Gönderiliyor":`${attempt>=attemptCount?"Hakkınız Doldu":"Kontrol Et"}`}
        </button>
    </>


  )
}

export default VoiceRecordComponent
