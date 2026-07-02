// comments.js

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".comment-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const slideId = form.dataset.slideId;
      const nomeInput = form.querySelector("[name='nome']");
      const emailInput = form.querySelector("[name='email']");
      const nome = nomeInput ? nomeInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const comentario = form.querySelector("[name='comentario']").value.trim();
      const mensagem = form.querySelector(".form-message");

      if (!comentario) {
        mensagem.textContent = "Digite um comentário antes de enviar.";
        return;
      }

      try {
        await addDoc(collection(db, "comments"), {
          slideId,
          nome,
          email,
          comentario,
          criadoEm: serverTimestamp(),
          aprovado: false
        });

        form.reset();
        mensagem.textContent = "Comentário enviado com sucesso. Obrigada pela contribuição!";
      } catch (error) {
        console.error("Erro ao enviar comentário:", error);
        mensagem.textContent = "Não foi possível enviar o comentário. Tente novamente.";
      }
    });
  });
});