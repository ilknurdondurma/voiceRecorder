import React, { useState, useMemo, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaRandom } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import EchartsBarChart from '../../../../components/charts/barChart';
import { createAttempt} from "../../../../api/index";
import succesMessage from "../../../../helper/toasts/successMessage";
import errorMessage from "../../../../helper/toasts/errorMessage";

function Test2() {
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
          if(attempt===1){
            setAttempt1(response.data.data.werScore)
            localStorage.setItem("werScore2",response.data.data.werScore||0)

          }
          if(attempt===2){
            setAttempt2(response.data.data.werScore)
            localStorage.setItem("werScore2",response.data.data.werScore||0)

          }
          if(attempt===3){
            setAttempt3(response.data.data.werScore)
            localStorage.setItem("werScore2",response.data.data.werScore||0)

          }
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
    
      //chartttttt
      const [attempt1, setAttempt1] = useState(0);
      const [attempt2, setAttempt2] = useState(0);
      const [attempt3, setAttempt3] = useState(0);
    
    
      const data = [
        ["score", "product"],
        [attempt3, "Üçüncü Deneme"],
        [attempt2, "İkinci Deneme"],
        [attempt1, "İlk Deneme"],
      ];
      const MemoizedEchartsBarChart = React.memo(EchartsBarChart);

  return (
    <>
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
                <button className={`mr-10 sm:flex ${audioUrl===null || attempt>=4 ?"opacity-50":""}`} disabled={audioUrl===null || attempt>=4} onClick={()=>{sendToAPI();}}> {/**sendToAPI();*/}
                  <div className="cursor-pointer self-center rounded-full p-5 sm:p-3">
                    <FaCheck size="25px" className="m-1" />
                  </div>
                  {loading?"Gönderiliyor":`${attempt>=4?"Hakkınız Doldu":"Kontrol Et"}`}
                </button>
          </div>
         
        </div>
      </div>
      <div className="chart-section self-start w-full h-60">
            <MemoizedEchartsBarChart data={data} />
      </div>
      </>
  )
}

export default Test2
// import React, { useState, useMemo, useEffect } from "react";
// import { FaPlay } from "react-icons/fa6";
// import { FaRandom } from "react-icons/fa";
// import { IoMdMic } from "react-icons/io";
// import { FaCheck } from "react-icons/fa";
// import { FaStop } from "react-icons/fa";
// import EchartsBarChart from '../../../../components/charts/barChart';
// import { createAttempt} from "../../../../api/index";
// import succesMessage from "../../../../helper/toasts/successMessage";
// import errorMessage from "../../../../helper/toasts/errorMessage";
// import VoiceRecordComponent from "../voiceRecordComponent";

// function Test2() {
//     const metinler = [
//         {text:"Matematikte ....... konusuna geçtik.",fullText:"Matematikte açılar konusuna geçtik.",correctWord:"açılar",otherOptions:["deyimler" , "atasözleri" ,"açılar"]},
//         {text:"Bir ....... yağsında bir şarkı çalsın.",fullText:"Bir yağmur yağsında bir şarkı çalsın.",correctWord:"yağmur",otherOptions:["yağmur" , "kar" ,"dolu"]},
//         {text:"Ceplerinde ...... saklayamazsın.",fullText:"Ceplerinde cümleler saklayamazsın.",correctWord:"cümleler",otherOptions:["poğaçalar" , "cümleler" ,"oyuncaklar"]}
//       ];
//       const [texts, setTexts] = useState(metinler);
//       const [textIndex, setTextIndex] = useState(0);
//       const [text, setText] = useState(texts[textIndex].text);
//       const [hoveredWord, setHoveredWord] = useState("Seçili Metin Yok");
    
//       //************************************************************************** */
//       const [read, setRead] = useState(false);
//       const [audioUrl, setAudioUrl] = useState(null);
//       const [seconds, setSeconds] = useState(0);
//       const [loading, setLoading] = useState(false);
//       const [attempt, setAttempt] = useState(1);
//       const [checkWrongWords, setCheckWrongWords] = useState([]);
    
    
//       const sendToAPI = async () => {
//         await setAttempt(attempt+1);
    
//         console.log("test2 göndere bastı");
//         console.log(seconds);
//         const quizId=JSON.parse(localStorage.getItem('quizId'))
//         const jsonData = {
//           "quizId":quizId,
//           "attempt":attempt,
//           "stage":2,
//           "text":texts[textIndex].fullText
//         };
      
//         const formData = new FormData();
//         formData.append("data", JSON.stringify(jsonData));
//         formData.append("audio", await fetch(audioUrl).then((res) => res.blob()), "recorded.wav");
      
//         // API'ye gönder
//         setLoading(true);
//         try {
//           const response = await createAttempt(formData);
//           setLoading(false);
//           if(attempt===1){
//             setAttempt1(response.data.data.werScore)
//           }
//           if(attempt===2){
//             setAttempt2(response.data.data.werScore)
//           }
//           if(attempt===3){
//             setAttempt3(response.data.data.werScore)
//           }
//           console.log("API cevabı:", response.data);
//           setCheckWrongWords(response.data.data.wrongWords);
//           console.log("wrooong :"+checkWrongWords)
//           succesMessage("başarılı işler söz konusu ");
//         } catch (error) {
//           setLoading(false);
//           console.error("API hatası:", error);
//           errorMessage(`API hatası: ${error.message}`);
//         }
//       };
    
    
//       /*************************************************************************** */
//       const handleChangeText = () => {
//         const newIndex = (textIndex + 1) % texts.length;
//         setTextIndex(newIndex);
//         setText(texts[newIndex].text);
//       };
    
//       const handleReadWord = (word) => {
//         setRead(true)
//         if ("speechSynthesis" in window) {
//           const utterance = new SpeechSynthesisUtterance(word);
//           window.speechSynthesis.speak(utterance);
//         } else {
//           alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
//         }
//       };
//       const handleStopReadWord = () => {
//         setRead(false)
//         if ("speechSynthesis" in window) {
//           window.speechSynthesis.cancel();
//         } else {
//           alert("Üzgünüz, tarayıcınız bu özelliği desteklemiyor.");
//         }
//       };
    
//       const handleReadSentence = (word) => {
//         setHoveredWord(word);
//       };
    
//       //chartttttt
//       const [attempt1, setAttempt1] = useState(0);
//       const [attempt2, setAttempt2] = useState(0);
//       const [attempt3, setAttempt3] = useState(0);
    
    
//       const data = [
//         ["score", "product"],
//         [attempt3, "Üçüncü Deneme"],
//         [attempt2, "İkinci Deneme"],
//         [attempt1, "İlk Deneme"],
//       ];
//       const MemoizedEchartsBarChart = React.memo(EchartsBarChart);

//   return (
//     <>
//       <div className="test-section bg-white p-5 rounded-md border-2">
//         <div className="text flex ">
//             <div
//                   className="cursor-pointer p-2 mr-2 border-2 rounded-full "
//                   onClick={() => {read ? handleStopReadWord():handleReadWord(text)}}
//                 >
//                   { read ? <FaStop size="25px" className="m-1" />:<FaPlay size="25px" className="m-1" />}
//               </div>
//           <div
//             className="cursor-pointer p-3 mr-2 flex border-2 rounded-full"
//             onClick={handleChangeText}
//           >
//             <FaRandom size="25px" />
//           </div>
//           <div className="gap-5">
//               {text.split(" ").map((word, index) => (
//                   <span key={index}>
//                     <span
//                       className={`underline p-3 m-3 my-5 hover:font-bold cursor-pointer text-2xl sm:text-sm  underline-offset-8 sm:my-10 ${
//                         word === hoveredWord ? "font-bold" : ""
//                       } `}
//                       onClick={() => {
//                         handleReadSentence(word);
//                       }}
//                     >
//                       {word}
//                     </span>
//                   </span>
//                 ))}
//           </div>
//         </div>
//         <div className="options-sections my-10 self-center grid grid-cols-5 gap-5">
//         <div className="col-span-2 md:col-span-3 sm:col-span-3 shadow-md bg-primary/30 rounded-xl p-5 flex flex-col">
//           Doğru seçenek aşağıdakilerden hangisidir ?
//           { console.log(checkWrongWords)}
//           {texts[textIndex].otherOptions.map((option, index) => {
//             let backgroundColor = "";
//             if (checkWrongWords.includes(texts[textIndex].correctWord)) {
//               backgroundColor = option === texts[textIndex].correctWord ? "bg-green" : ""; // Doğru cevap yeşil, diğerleri default
//             } else if (checkWrongWords.includes(option)) {
//               backgroundColor = "bg-red-300"; // Yanlış cevap kırmızı
//             }

//             return (
//               <div key={index} className={`shadow-md rounded-xl p-5 flex flex-col border-2 ${backgroundColor}`}>
//                 {option}
//               </div>
//             );
//           })}
//         </div>





//           <div className="col-span-3 md:col-span-3 sm:col-span-2 record-section self-center my-10 mr-10 flex sm:flex-col ">
//           <VoiceRecordComponent 
//               sendToAPI={sendToAPI} // () parantezleri olmadan fonksiyon geçirildi
//               audioUrl={audioUrl}
//               setAudioUrl={setAudioUrl}
//               seconds={seconds}
//               setSeconds={setSeconds}
//               loading={loading}
//               setLoading={setLoading}
//               attempt={attempt}
//               setAttempt={setAttempt}
//             />
//           </div>
         
//         </div>
//       </div>
//       <div className="chart-section self-start w-full h-60">
//             <MemoizedEchartsBarChart data={data} />
//       </div>
//       </>
//   )
// }

// export default Test2
