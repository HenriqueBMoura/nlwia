import ytdl from "ytdl-core" //LIB para fazer download de vídeo (YouTube)
import fs from "fs" //fs = File System
// import { error } from "console"

export const download = (videoId) =>
 new Promise((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" }).
    on(
      "info",
      (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        // console.log(seconds)

        if(seconds > 60) {
          throw new Error("A duração deste vídeo é maior que 60 segundos")
        }
      } 
    ).on("end", () => {
      console.log("Download realizado com sucesso")
      resolve()
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o download do vídeo. Detalhes do erro:", 
        error
      )
      reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
