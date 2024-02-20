import React, { useState, useMemo, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaRandom } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import EchartsBarChart from '../../../../components/charts/barChart';
import { createAttempt , getAllText} from "../../../../api/index";
import errorMessage from "../../../../helper/toasts/errorMessage";
import succesMessage from "../../../../helper/toasts/successMessage";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Test3() {
    
  const [texts, setTexts] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
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
  const [cefrLevel,setCefrLevel]=useState("")
    //chartttttt
  const [attempt1, setAttempt1] = useState(0);
  const [attempt2, setAttempt2] = useState(0);
  const [attempt3, setAttempt3] = useState(0);
  const checkQuizId=localStorage.getItem('quizId');
  const navigate=useNavigate();

    useEffect(() => {
      if (checkQuizId===null) {
        navigate('/yeni-test')
      }
    }, [checkQuizId]);

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
      function cefrConverter(level) {
        switch (level) {
          case 'A1':
            return 'T1';
          case 'A2':
            return 'T2';
          case 'B1':
            return 'R1';
          case 'B2':
            return 'R2';
          case 'C1':
            return 'TR1';
          case 'C2':
            return 'TR2';
          default:
            return 'Geçersiz Seviye';
        }
      }
      
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
          if(attempt===1){
            await setAttempt1(response.data.data.werScore||0)
            console.log("attemteki wer:", attempt1);
            console.log("API dönen", response.data.data.werScore);
            await setCefrLevel(cefrConverter(response.data.data.cefrLevel))
            localStorage.setItem("cefrLevel",cefrConverter(response.data.data.cefrLevel)||0)
            localStorage.setItem("werScore3",response.data.data.werScore||0)

          }
          if(attempt===2){
            await setAttempt2(response.data.data.werScore||0)
            console.log("attemteki wer:", attempt2);
            console.log("API dönen", response.data.data.werScore)
            await setCefrLevel(cefrConverter(response.data.data.cefrLevel))
            localStorage.setItem("cefrLevel",cefrConverter(response.data.data.cefrLevel)||0)
            localStorage.setItem("werScore3",response.data.data.werScore||0)

          }
          if(attempt===3){
            await setAttempt3(response.data.data.werScore||0)
            console.log("attemteki wer:", attempt3);
            console.log("API dönen", response.data.data.werScore)
            await setCefrLevel(cefrConverter(response.data.data.cefrLevel))
            localStorage.setItem("cefrLevel",cefrConverter(response.data.data.cefrLevel)||0)
            localStorage.setItem("werScore3",response.data.data.werScore||0)

          }
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


      



      const data = [
        ["score", "product"],
        [attempt3, "Üçüncü Deneme"],
        [attempt2, "İkinci Deneme"],
        [attempt1, "İlk Deneme"],
      ];
      const MemoizedEchartsBarChart = React.memo(EchartsBarChart);

  return (
    <>
    <ToastContainer/>
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
                <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=4 ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=4} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
                  <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
                    <FaCheck size="25px" className="m-1" />
                  </div>
                  {loading?"Gönderiliyor":`${attempt>=4?"Hakkınız Doldu":"Kontrol Et"}`}
                </button>
              </div>
            </div>
        </div>

      </div>
      <div className="chart-section self-start w-full h-60">
         <MemoizedEchartsBarChart data={data} />
      </div>
      <div className="flex justify-center">
         <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold flex justify-center">{cefrLevel} </h1>
      </div>
      </>
  )
}

export default Test3// import React, { useState, useMemo, useEffect } from "react";
// import { FaPlay } from "react-icons/fa6";
// import { FaRandom } from "react-icons/fa";
// import { FaStop } from "react-icons/fa";
// import EchartsBarChart from '../../../../components/charts/barChart';
// import { createAttempt , getAllText} from "../../../../api/index";
// import errorMessage from "../../../../helper/toasts/errorMessage";
// import succesMessage from "../../../../helper/toasts/successMessage";
// import VoiceRecordComponent from "../voiceRecordComponent";

// function Test3() {
    
//   const [texts, setTexts] = useState([]);
//   const [textIndex, setTextIndex] = useState(0);
//   const [text, setText] = useState("");

//   const [read, setRead] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [seconds, setSeconds] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [attempt, setAttempt] = useState(1);
//   const [cefrLevel,setCefrLevel]=useState("")

//   useEffect(() => {
//     getAllText()
//     .then((result) => {
//       setTexts(result?.data.data);
//       console.log(texts);
//       // Once texts are fetched, set the initial text
//       if (result?.data.data && result.data.data.length > 0) {
//         setText(result.data.data[0].textValue);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       errorMessage("Bir hata oluştu");
//     });
//   }, []);

//   const sendToAPI = async () => {
//     await setAttempt(attempt+1);

//     console.log("test1 göndere bastı");
//     console.log(seconds);
//     const quizId=JSON.parse(localStorage.getItem('quizId'))
//     const jsonData = {
//       "quizId":quizId,
//       "attempt":attempt,
//       "stage":3,
//       "text":text
//     };
  
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(jsonData));
//     formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");
  
//     // API'ye gönder
//     setLoading(true);
//     try {
//       const response = await createAttempt(formData);
//       if(attempt===1){
//         setAttempt1(response.data.data.werScore)
//         setCefrLevel(response.data.data.cefrLevel)
//       }
//       if(attempt===2){
//         setAttempt2(response.data.data.werScore)
//         setCefrLevel(response.data.data.cefrLevel)

//       }
//       if(attempt===3){
//         setAttempt3(response.data.data.werScore)
//         setCefrLevel(response.data.data.cefrLevel)
//       }
//       setLoading(false);
//       console.log("API cevabı:", response.data);
//       succesMessage("başarılı işler söz konusu ");
//     } catch (error) {
//       setLoading(false);
//       console.error("API hatası:", error);
//       errorMessage(`API hatası: ${error.message}`);
//     }
//   };

//   /*************************************************************************** */
//   const handleChangeText = () => {
//     const newIndex = (textIndex + 1) % texts.length;
//     setTextIndex(newIndex);
//     setText(texts[newIndex].textValue);
//   };

//   const handleReadWord = (word) => {
//     setRead(true)
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(word);
//       window.speechSynthesis.speak(utterance);
//     } else {
//       alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
//     }
//   };
//   const handleStopReadWord = () => {
//     setRead(false)
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel();
//     } else {
//       alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
//     }
//   };


//   //chartttttt
//   const [attempt1, setAttempt1] = useState(0);
//   const [attempt2, setAttempt2] = useState(0);
//   const [attempt3, setAttempt3] = useState(0);


//   const data = [
//     ["score", "product"],
//     [attempt3, "Üçüncü Deneme"],
//     [attempt2, "İkinci Deneme"],
//     [attempt1, "İlk Deneme"],
//   ];
//   const MemoizedEchartsBarChart = React.memo(EchartsBarChart);

//   return (
//     <>
//       <div className="test-section bg-white p-5 rounded-md border-2">
//         <div className="text flex justify-center">
//             <div
//               className="cursor-pointer p-2 mr-2 border-2 rounded-full "
//               onClick={() => {read ? handleStopReadWord():handleReadWord(text)}}
//               >
//                 { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
//             </div>
//             <div
//               className="cursor-pointer p-3 mr-2 flex border-2 rounded-full"
//               onClick={handleChangeText}
//             >
//               <FaRandom size="25px" />
//             </div>
//         </div>
//         <div className="grid grid-cols-5">
//             <div className="col-span-4 flex justify-center">
//               <textarea
//                 className='border-2 p-10 text-xl my-5 mx-10 mb-10 rounded-xl w-full bg-primary/20'
//                 value={text}
//                 rows={10}
//                 readOnly
//               />
//             </div>
//             <div className="col-span-1 flex flex-col justify-center items-center">
//               <div className="mr-10 flex flex-col justify-center items-center">
//               <VoiceRecordComponent 
//                   sendToAPI={sendToAPI} // () parantezleri olmadan fonksiyon geçirildi
//                   audioUrl={audioUrl}
//                   setAudioUrl={setAudioUrl}
//                   seconds={seconds}
//                   setSeconds={setSeconds}
//                   loading={loading}
//                   setLoading={setLoading}
//                   attempt={attempt}
//                   setAttempt={setAttempt}
//                 />
//               </div>
//             </div>
//         </div>

//       </div>
//       <div className="chart-section self-start w-full h-60">
//          <MemoizedEchartsBarChart data={data} />
//       </div>
//       <div className="flex justify-center">
//           <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold">{cefrLevel} seviye </h1>
//         </div>
//       </>
//   )
// }

// export default Test3
