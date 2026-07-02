// comments.js

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Função para ser usada programaticamente (por exemplo, no React)
export async function sendComment(slideId, nome, email, comentario) {
  if (!comentario || !comentario.trim()) {
    throw new Error("O comentário não pode estar vazio.");
  }
  
  return await addDoc(collection(db, "comments"), {
    slideId,
    nome: nome.trim() || "Anônimo",
    email: email.trim() || "",
    comentario: comentario.trim(),
    criadoEm: serverTimestamp(),
    aprovado: false
  });
}

// Exposição global para o React/Babel acessar facilmente
window.sendComment = sendComment;

// Ouvinte global de submissão (usando delegação de eventos)
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!form || !form.classList.contains("comment-form")) return;

    event.preventDefault();

    const slideId = form.dataset.slideId;
    const nome = form.querySelector("[name='nome']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const comentario = form.querySelector("[name='comentario']").value.trim();
    const mensagem = form.querySelector(".form-message");

    if (!comentario) {
      if (mensagem) {
        mensagem.textContent = "Digite um comentário antes de enviar.";
        mensagem.className = "form-message text-red-500 font-medium mt-2";
      }
      return;
    }

    try {
      if (mensagem) {
        mensagem.textContent = "Enviando...";
        mensagem.className = "form-message text-slate-500 font-medium mt-2";
      }

      await sendComment(slideId, nome, email, comentario);

      form.reset();
      if (mensagem) {
        mensagem.textContent = "Comentário enviado com sucesso. Obrigada pela contribuição!";
        mensagem.className = "form-message text-green-600 font-medium mt-2";
      }
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      if (mensagem) {
        mensagem.textContent = "Não foi possível enviar o comentário. Tente novamente.";
        mensagem.className = "form-message text-red-600 font-medium mt-2";
      }
    }
  });
});
