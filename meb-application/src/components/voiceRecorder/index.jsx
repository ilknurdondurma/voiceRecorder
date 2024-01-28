import axios from "axios";
import React, { useState, useEffect} from "react";
import { BiSolidMicrophone, BiStop } from "react-icons/bi";
import Button from '../../components/button/index'
import { BsSendFill } from "react-icons/bs";
import { FaCaretRight } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { json, useNavigate } from "react-router-dom";
import { createReport } from "../../api";
import succesMessage from "../../helper/toasts/successMessage";
import errorMessage from "../../helper/toasts/errorMessage";
import Spin from '../spin/index'
import { ToastContainer } from "react-toastify";


const SoundRecorder = ({textId}) => {
    const [mediaStream, setMediaStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [text, setText] = useState([]);
    const [voice, setVoice] = useState([]);
    const [microphone, setMicrophone] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [listening, setListening] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [showAudio, setShowAudio] = useState(true);
    const [loading, setLoading] = useState(false)
    const formDataObject = JSON.parse(localStorage.getItem('user'));
    const user=formDataObject?.id;


    const navigate=useNavigate();

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

            const mic = context.createMediaStreamSource(stream);
            setMicrophone(mic);

            const newRecorder = new MediaRecorder(stream);
            setRecorder(newRecorder);

            const chunks = [];

            newRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            newRecorder.onstop = function () {
                const blob = new Blob(chunks, { type: 'audio/wav; codecs=opus' });
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
            console.error('Hata:', error);
        }
    };

    const pauseRecording = () => {
        if (recorder && recorder.state === 'recording') {
            recorder.pause();
            stopTimer();
        }
    };

    const resumeRecording = () => {
        if (recorder && recorder.state === 'paused') {
            recorder.resume();
            startTimer();
        }
    };

    const stopRecording = () => {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
    }

    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
    }

    if (recorder && (recorder.state === 'recording' || recorder.state === 'paused')) {
        recorder.stop();
    }

    setListening(false);
};
const sendAudioToAPI = async () => {
    console.log("göndere bastı")
    console.log(seconds)
    // JSON verisi
    const jsonData = {
      recordLength: seconds, 
      studentId: user, 
      textId: textId,
    };

    // FormData oluştur
    const formData = new FormData();

    // JSON verisini FormData'ya ekle
    formData.append("data", JSON.stringify(jsonData));

    // Ses dosyasını FormData'ya ekle
    formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");

    // Axios kullanarak API'ye gönder
    setLoading(true);
    createReport(formData)
      .then((response) => {
        console.log("API cevabı:", response.data);
        if (response?.data?.message==="Rapor hazırlandı.") {
          console.log(response.data.message);
          setText((texts) => [...texts, response.data.message]);
          setVoice((voice) => [...voice, response.data.filename]);
          
        }
        setLoading(false)
        console.log(response.data.data.id)
        navigate(`/rapor/${response.data.data.id}`)
        succesMessage("basarılı")
       
      })
      .catch((error) => {
        setLoading(false)
        console.error("API hatası:", error);
        errorMessage(`API hatası: ${error.message}`)
      })
      
  };


    // const sendAudioToAPI = (audioBlob) => {
    //   const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/asr`
    //   const formData = new FormData();
    //   formData.append("audio", audioBlob, 'recorded.wav');
    //   formData.append('token',localStorage.getItem('_token'))
    //   setLoading(true)
    //   console.log(audioBlob)
    //   axios.post(API_ENDPOINT, formData)
    //       .then(data => {
    //           console.log("API cevabı:", data);
    //           if (data?.message !== "Internal Server Error") {
    //               console.log(data.message)
    //               setText((texts) => [...texts, data.data.message]);
    //               setVoice((voice) => [...voice, data.data.filename])
    //           }
    //           setLoading(false)
    //       })
    //       .catch(error => {
    //           console.error("API hatası:", error);
    //           setLoading(false)
    //       });
    //       }
//---------------------------------------------------
      // fetch(API_ENDPOINT, {
      //     method: 'POST',
      //     body: formData
      // })
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log("API cevabı:", data);
      //         if (data?.message !== "Internal Server Error") {
      //             setText((texts) => [...texts, data.message]);
      //             setVoice((voice) => [...voice, data.filename])
      //         }
      //         setLoading(false)
      //     })
      //     .catch(error => {
      //         console.error("API hatası:", error);
      //         setLoading(false)
      //     });
  //       };
    return (
        <div className="w-full h-full flex flex-col">
            <ToastContainer />
        <div className="flex flex-col items-center justify-center gap-4 ">
            <div className="flex gap-4">
                <span className="flex justify-center border-2 border-gray-400 p-3 rounded-xl cursor-pointer" onClick={startRecording}><BiSolidMicrophone className="mr-3" />{recorder && recorder.state === 'recording' ?"Başladı..":"Başlat"}</span>
                <span className="flex justify-center border-2 border-gray-400 p-3 rounded-xl cursor-pointer bg-red-50" onClick={pauseRecording}><BiStop className="mr-3" /> {recorder && recorder.state === 'paused'? "Bekliyor..":"Beklet"}</span>
                {listening && recorder && recorder.state === 'paused' && (
                    <span className="flex justify-center border-2 border-gray-400 p-3 rounded-xl cursor-pointer" onClick={resumeRecording}><FaCaretRight className="mr-3" /> Devam </span>
                )}
                <span className="flex justify-center border-2 border-gray-400 py-3 px-4 rounded-xl cursor-pointer" onClick={stopRecording}><FaHeadphonesAlt className="mr-3"  />Bitir </span>
            </div>
            <audio src={audioUrl} controls className="w-full" />
            <div className="text-sm font-bold text-primary">{`Geçen Süre: ${seconds} saniye`}</div>

            <Button 
                className={`m-3 p-4 rounded-xl cursor-pointer ${loading ?'opacity-50':''}`}
               // disabled={showAudio}
                variant="GreenButton"
                size="large"
                onClick={sendAudioToAPI}
                >
                {loading ? <Spin /> : 'Gönder'}
            </Button>

        </div>
        
       
    </div>
    );
};

export default SoundRecorder;