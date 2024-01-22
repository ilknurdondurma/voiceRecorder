import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BiSolidMicrophone, BiStop } from "react-icons/bi";

const SoundRecorder = () => {
    const [mediaStream, setMediaStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [microphone, setMicrophone] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [listening, setListening] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState([]);
    const [voice, setVoice] = useState([]);


    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000); // Her saniye bir artır
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Komponent temizlendiğinde interval'i temizle
    }, [isActive]);

    const startRecording = async () => {
        if (seconds >= 60) {
            return false;
        }

        setListening(true);
        startTimer();

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);

            const context = new AudioContext();
            setAudioContext(context);

            const mic = context.createMediaStreamSource(stream);
            setMicrophone(mic);

            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = function () {
                const blob = new Blob(chunks, { type: 'audio/wav; codecs=opus' });
                chunks.length = 0;
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                sendAudioToAPI(blob)
                setListening(false);
                stopTimer();
                console.log("stoped")
            };

            recorder.start();
        } catch (error) {
            setListening(false);
            stopTimer();
            console.error('Hata:', error);
        }
    };

    const stopRecording = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        if (audioContext) {
            audioContext.close();
        }
        setListening(false);
    };
    const sendAudioToAPI = (audioBlob) => {
      const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/asr`
      const formData = new FormData();
      formData.append("audio", audioBlob, 'recorded.wav');
      formData.append('token',localStorage.getItem('_token'))
      setLoading(true)
      console.log(audioBlob)
      axios.post(API_ENDPOINT, formData)
          .then(data => {
              console.log("API cevabı:", data);
              if (data?.message !== "Internal Server Error") {
                  console.log(data.message)
                  setText((texts) => [...texts, data.data.message]);
                  setVoice((voice) => [...voice, data.data.filename])
              }
              setLoading(false)
          })
          .catch(error => {
              console.error("API hatası:", error);
              setLoading(false)
          });

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
  };
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex md:flex-row flex-col items-center justify-center md:space-x-2 space-x-0 space-y-5 md:space-y-0 mt-1">
                <button
                    onClick={() => {
                        if (listening === true) {
                            stopRecording();
                        } else {
                            startRecording();
                        }
                    }}
                >
                    {listening ? <BiStop className="mr-3" /> : <BiSolidMicrophone className="mr-3" />}
                    {listening ? 'Dinlemeyi Durdur' : 'Dinlemeyi Başlat'}
                </button>
            </div>
            <audio src={audioUrl} controls className="w-full" />

            {listening && seconds >= 60 && (
                <div className="text-red-500 mt-2">Maksimum kayıt süresi (60 saniye) aşıldı.</div>
            )}
        </div>
    );
};

export default SoundRecorder;