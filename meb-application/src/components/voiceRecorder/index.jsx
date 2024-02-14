import React, { useState, useEffect} from "react";
import { BiSolidMicrophone, BiStop } from "react-icons/bi";
import Button from '../../components/button/index'
import { FaCaretRight } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createReport } from "../../api";
import succesMessage from "../../helper/toasts/successMessage";
import errorMessage from "../../helper/toasts/errorMessage";
import Spin from '../spin/index'
import { ToastContainer } from "react-toastify";


const SoundRecorder = ({textId}) => {
    const [mediaStream, setMediaStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [listening, setListening] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [loading, setLoading] = useState(false)
    const formDataObject = JSON.parse(localStorage.getItem('user'));   // NOT: burda user ıd vermeye gerek kalmadı tek bir adminle yapılcak flaan ya onu düzenlemek lazım
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

    const jsonData = {
      recordLenght: seconds, 
      studentId: user, 
      textId: textId,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(jsonData));
    formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");

    //API'ye gönder
    setLoading(true);
    createReport(formData)
      .then((response) => {
        console.log("API cevabı:", response.data);
        setLoading(false)
        console.log(response.data.data.id)
        navigate(`/rapor/${response.data.data.id}`)
        succesMessage("Oluşturma Başarılı")
       
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

            <Button 
                className={`m-3 p-4 border-2 rounded-xl cursor-pointer bg-primary ${loading ?'opacity-50':''}`}
               // disabled={showAudio}
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