import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getStandartReportById, getTextById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { Helmet } from 'react-helmet';
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { IoMdMic } from "react-icons/io";


function Okuma() {
    const [report, setReport] = useState([]);
    const [text,setText]=useState([]);
    const {id}  = useParams();

    /*********************************************** */
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
    const [play, setPlay] = useState(false);

   
    useEffect(() => {
      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        setAudio(newAudio);
      }
    }, [audioUrl]);
    
    const oynat = () => {
      setPlay(true);
      if (audio) {
        audio.play();
        audio.addEventListener('ended', () => {
          setPlay(false);
        });
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
    /**************************************************** */


    
    useEffect(() => {
        // if (token == null) {
        //   navigate('/login', { replace: true });
        // }
    
        getStandartReportById(id)
          .then((result) => {
            setReport(result?.data.data);
            console.log(report);
          })
          .catch((error) => {
            console.log(error);
            errorMessage('Bir hata oluştu1');
          });
      }, [id]);
    
      useEffect(() => {
        if (report && report.textId) {
          getTextById(report.textId)
            .then((result) => {
              setText(result?.data.data);
              console.log(result?.data);
              console.log(result?.data.data);
              console.log(text);
            })
            .catch((error) => {
              console.log(error);
              errorMessage('Bir hata oluştu2');
            });
        }
      }, [report]);
    
      const handleReadWord = (word) => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.onend = () => {
            setRead(false); // Okuma tamamlandığında "read" durumunu güncelle
          };
          window.speechSynthesis.speak(utterance);
          setRead(true); // Okuma başladığında "read" durumunu güncelle
        } else {
          alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
        }
      };
      
      const handleStopReadWord = () => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          setRead(false); // Okuma durdurulduğunda "read" durumunu güncelle
        } else {
          alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
        }
      };
      
    
    
    const textHeader=""

    const orijinalVoiceUrl=""
    const oijinalText=text.textValue
    const studentVoiceUrl=""
    const studentText="Öğrencinin okuduğu metin ..."
   
    const different = report?.repeatedWords || [];
    return (
      <div className='py-0.5 space-y-10'>
      <Helmet>
        <title>Okuma</title>
      </Helmet>
    <div className='flex flex-col justify-center'>
        <ToastContainer />

        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-xl my-3  flex justify-center'>Orijinal Metin</h1>
                <textarea className='border-2 p-8 text-xl my-5 mb-10 rounded-xl'
                
                value={oijinalText}
                rows={10} // İstersen satır sayısını belirleyebilirsin
                cols={50} // İstersen sütun sayısını belirleyebilirsin
                readOnly
                />

                
                {/* sesi okut */}
                  
                {/* sesi kaydet */}
                  <div className='flex '>
                      
                      <div className={`mr-10 ${
                              recorder && recorder.state === "recording" ? "hidden" : "block"
                          }`}>
                          <div className=" sm:flex  text-center">
                          <div
                              className="cursor-pointer rounded-full flex justify-center  border-2  sm:p-3"
                              onClick={() => {
                              startRecording();
                              }}
                          >
                              <IoMdMic size="25px" />
                          </div>
                          Kayıt Başlat
                          </div>
                      </div>
                      <div className={`mr-10  ${
                          recorder && recorder.state === "recording" ? "block" : "hidden"
                          }`}>
                      <div className="sm:flex text-center">
                          <div
                          className="cursor-pointer rounded-full flex justify-center  border-2  sm:p-3"
                          onClick={() => {
                              stopRecording();
                          }}
                          >
                          <FaStop size="25px"  />
                          </div>
                          Kayıt Durdur
                      </div>
                      </div>
                      <div className="cursor-pointer p-2 mr-2 mx-3 w-full border-2 rounded-full self-center sm:p-3 "
                            onClick={() => {read ? handleStopReadWord():handleReadWord(oijinalText)}}
                          >
                            { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
                      </div>
                      
                  </div>




            </div>
            <div  className='flex flex-col justify-center'>
                <h1 className='text-xl my-3  flex justify-center'>Okunan Metin</h1>
                <textarea className='border-2 p-8 text-xl my-5 mb-10 rounded-xl'
                
                value={studentText}
                rows={10} // İstersen satır sayısını belirleyebilirsin
                cols={50} // İstersen sütun sayısını belirleyebilirsin
                readOnly
                />



                {/* sesi okut */}
                <button disabled={audioUrl===null} className={`${audioUrl===null?"opacity-50":""}`}>
                    <div className="cursor-pointer p-2 mr-2 m-3 w-full border-2 rounded-full self-center sm:p-3 "
                        onClick={() => {oynat()}}
                      >
                        { play ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
                      </div>
                </button>
                



            </div>
        </div>
        <div className='flex justify-center'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-xl my-5 self-center'>Tekrar Edilen Kelimeler</h1>
                <div className='grid grid-cols-4 sm:grid-cols-2 gap-4'>
                    {different.map((diff,index=0)=>(
                        <div  className='self-center bg-white p-5 m-3 text-primary w-full rounded-2xl text-xl font-thin border-gray-300 border-2'>{index} - {diff}</div>
                    ))}
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Okuma
