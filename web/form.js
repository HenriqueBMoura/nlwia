import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  // console.log("URL do VIDEO:", videoURL)

  if(!videoURL.includes("shorts")) {
    return (content.textContent = "Este vídeo não é um short.")
    // console.log("É um SHORT")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")
  // console.log(videoId)

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId) // Requisição nesta rota, passando o ID do vídeo para receber a transcrição do áudio

  content.textContent = "Realizando o resumo..." // Aviso que avançou de etapa

  const summary = await server.post("/summary", { //Envio da transcrição do áudio no corpo da requisição através da propriedade "text" o resultado da transcrição
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})