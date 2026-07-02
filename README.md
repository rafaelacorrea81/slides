# Site de Slides com Comentários por Slide

Este repositório contém um site de slides publicado no GitHub Pages.

A proposta do projeto é disponibilizar uma apresentação online em formato de slides, permitindo que o leitor navegue pelo conteúdo e deixe comentários em cada slide. Os comentários podem ser utilizados para dúvidas, sugestões, registros de leitura, participação em aula ou avaliação formativa.

## Acesso ao site

O site está publicado em:

```text
https://rafaelacorrea81.github.io/slides/
```

## Objetivo do projeto

O objetivo principal é criar uma apresentação interativa, em que cada slide possa receber comentários individuais dos leitores.

Essa funcionalidade pode ser usada em contextos como:

* aulas online;
* materiais de estudo;
* apresentações acadêmicas;
* oficinas;
* formações;
* leitura orientada;
* coleta de dúvidas dos participantes;
* avaliação da compreensão do conteúdo.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (React UMD)
* Tailwind CSS
* GitHub Pages
* Firebase
* Cloud Firestore

## Por que usar Firebase?

Como o site está hospedado no GitHub Pages, ele funciona como um site estático. Isso significa que ele consegue exibir páginas, estilos e scripts, mas não possui banco de dados próprio para salvar comentários.

Por isso, o Firebase será usado como backend do projeto.

O Cloud Firestore será responsável por armazenar os comentários enviados pelos leitores.

## Funcionalidade de comentários

Cada slide terá uma área de comentário com campos como:

* nome;
* e-mail;
* comentário;
* identificação automática do slide;
* data e horário do envio;
* status de aprovação do comentário.

A estrutura sugerida para cada comentário no Firestore é:

```text
comments
 └── id-do-comentario
      ├── slideId: "slide-01"
      ├── nome: "Nome do leitor"
      ├── email: "email@exemplo.com"
      ├── comentario: "Texto do comentário"
      ├── criadoEm: data/hora
      └── aprovado: false
```

O campo `slideId` permite identificar em qual slide o comentário foi enviado.

O campo `aprovado` pode ser usado para moderação, evitando que comentários apareçam automaticamente no site sem revisão.

---

# Passos para configurar o Firebase

## 1. Criar um projeto no Firebase

Acesse o Firebase Console e crie um novo projeto.

Sugestão de nome:

```text
slides-comentarios
```

Durante a criação, o Google Analytics pode ser desativado caso o objetivo inicial seja apenas salvar comentários.

## 2. Adicionar um aplicativo Web

Dentro do projeto Firebase:

1. Clique no ícone da Web `</>`.
2. Informe um nome para o app, por exemplo:

```text
slides-web
```

3. Registre o aplicativo.
4. Copie o objeto de configuração gerado pelo Firebase.

O código será parecido com este:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

Importante: essa configuração pode aparecer no código público do site. A segurança real deve ser feita pelas regras do Firestore.

## 3. Criar o banco de dados Cloud Firestore

No painel do Firebase:

1. Acesse **Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha o modo de produção.
4. Selecione a região mais adequada.
5. Finalize a criação.

Depois disso, será possível criar a coleção `comments`.

## 4. Estrutura sugerida da coleção

Nome da coleção:

```text
comments
```

Campos sugeridos:

```text
slideId     string
nome        string
email       string
comentario  string
criadoEm    timestamp
aprovado    boolean
```

Exemplo de comentário:

```json
{
  "slideId": "slide-01",
  "nome": "Maria",
  "email": "maria@email.com",
  "comentario": "Gostei muito da explicação deste slide.",
  "criadoEm": "timestamp automático",
  "aprovado": false
}
```

## 5. Configurar as regras de segurança

No Firebase, acesse:

```text
Firestore Database > Rules
```

Uma sugestão inicial de regra para permitir apenas o envio de comentários e bloquear leitura pública é:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow create: if
        request.resource.data.keys().hasOnly([
          'slideId',
          'nome',
          'email',
          'comentario',
          'criadoEm',
          'aprovado'
        ])
        && request.resource.data.slideId is string
        && request.resource.data.nome is string
        && request.resource.data.email is string
        && request.resource.data.comentario is string
        && request.resource.data.aprovado == false
        && request.resource.data.comentario.size() > 0
        && request.resource.data.comentario.size() <= 1000;

      allow read, update, delete: if false;
    }
  }
}
```

Essa regra permite que visitantes enviem comentários, mas não permite que eles leiam, editem ou excluam comentários diretamente pelo site.

Para um painel administrativo no futuro, será necessário configurar autenticação.

## 6. Criar o arquivo de configuração do Firebase

Crie um arquivo chamado:

```text
firebase-config.js
```

Exemplo:

```javascript
// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

Substitua os dados do exemplo pelas informações reais do seu projeto Firebase.

## 7. Criar o arquivo para salvar comentários

Crie um arquivo chamado:

```text
comments.js
```

Exemplo:

```javascript
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
      const nome = form.querySelector("[name='nome']").value.trim();
      const email = form.querySelector("[name='email']").value.trim();
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
```

## 8. Adicionar formulário em cada slide

Em cada slide, adicione um formulário semelhante a este:

```html
<div class="comentarios-slide">
  <h3>Comentários sobre este slide</h3>

  <form class="comment-form" data-slide-id="slide-01">
    <label>
      Nome:
      <input type="text" name="nome" placeholder="Digite seu nome">
    </label>

    <label>
      E-mail:
      <input type="email" name="email" placeholder="Digite seu e-mail">
    </label>

    <label>
      Comentário:
      <textarea name="comentario" required placeholder="Escreva seu comentário sobre este slide"></textarea>
    </label>

    <button type="submit">Enviar comentário</button>

    <p class="form-message"></p>
  </form>
</div>
```

Para cada slide, altere o valor de `data-slide-id`.

Exemplos:

```html
<form class="comment-form" data-slide-id="slide-01">
```

```html
<form class="comment-form" data-slide-id="slide-02">
```

```html
<form class="comment-form" data-slide-id="slide-03">
```

## 9. Importar os scripts no HTML

Antes do fechamento da tag `</body>`, adicione:

```html
<script type="module" src="./firebase-config.js"></script>
<script type="module" src="./comments.js"></script>
```

## 10. Estilo sugerido para os comentários

Adicione ao CSS:

```css
.comentarios-slide {
  margin-top: 32px;
  padding: 20px;
  border-radius: 12px;
  background: #f7f7f7;
  border: 1px solid #ddd;
}

.comentarios-slide h3 {
  margin-bottom: 16px;
  font-size: 1.1rem;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-form label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 6px;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #bbb;
  border-radius: 8px;
}

.comment-form textarea {
  min-height: 100px;
  resize: vertical;
}

.comment-form button {
  align-self: flex-start;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
}

.form-message {
  font-size: 0.95rem;
  font-weight: 600;
}
```

## 11. Testar localmente

Como os arquivos usam `type="module"`, o ideal é testar com um servidor local.

Uma opção simples é usar a extensão **Live Server** no VS Code.

Depois:

1. Abra o site localmente.
2. Vá até um slide.
3. Envie um comentário de teste.
4. Acesse o Firebase.
5. Verifique se o comentário apareceu na coleção `comments`.

## 12. Publicar no GitHub Pages

Depois de testar:

```bash
git add .
git commit -m "Adiciona comentários por slide com Firebase"
git push
```

Após o push, o GitHub Pages atualizará o site publicado.

## 13. Cuidados importantes

Não colete dados desnecessários.

Se o e-mail não for realmente necessário, remova esse campo.

Informe ao usuário que o comentário será enviado e armazenado.

Evite exibir comentários automaticamente sem moderação.

Use regras de segurança no Firestore.

Não deixe permissões abertas como:

```javascript
allow read, write: if true;
```

Essa regra não deve ser usada em produção.

## Melhorias futuras

Algumas melhorias possíveis para o projeto:

* criar painel administrativo para visualizar comentários;
* permitir aprovação manual de comentários;
* exibir apenas comentários aprovados;
* adicionar autenticação para administradora;
* exportar comentários em CSV;
* filtrar comentários por slide;
* enviar notificação por e-mail quando houver novo comentário;
* criar dashboard com quantidade de comentários por slide.

## Status do projeto

Em desenvolvimento.

Funcionalidade planejada:

* comentários individuais por slide;
* armazenamento dos comentários no Firebase;
* moderação dos comentários;
* futura visualização administrativa.