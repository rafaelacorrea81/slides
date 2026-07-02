// comments.js

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (form && form.classList.contains("comment-form")) {
    event.preventDefault();

    const slideId = form.dataset.slideId;
    const nomeInput = form.querySelector("[name='nome']");
    const emailInput = form.querySelector("[name='email']");
    const nome = nomeInput ? nomeInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const comentarioInput = form.querySelector("[name='comentario']");
    const comentario = comentarioInput ? comentarioInput.value.trim() : "";
    const mensagem = form.querySelector(".form-message");

    if (!comentario) {
      if (mensagem) {
        mensagem.textContent = "Digite um comentário antes de enviar.";
        mensagem.style.color = "#ef4444";
      }
      return;
    }

    try {
      if (mensagem) {
        mensagem.textContent = "Enviando comentário...";
        mensagem.style.color = "#64748b";
      }

      await addDoc(collection(db, "comments"), {
        slideId,
        nome,
        email,
        comentario,
        criadoEm: serverTimestamp(),
        aprovado: false
      });

      form.reset();
      if (mensagem) {
        mensagem.textContent = "Comentário enviado com sucesso. Obrigada pela contribuição!";
        mensagem.style.color = "#16a34a";
      }
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      if (mensagem) {
        mensagem.textContent = "Não foi possível enviar o comentário. Tente novamente.";
        mensagem.style.color = "#ef4444";
      }
    }
  }
});