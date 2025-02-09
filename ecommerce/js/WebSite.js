const URLphone = "https://dummyjson.com/products/category/smartphones";
const cardProdotto = document.querySelector("#cardProdotto");

function telefoni(telefono) {
  fetch(URLphone)
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      const prodotti = response.products;
      console.log(prodotti);
      prodotti.forEach((prodotto) => {
        let card = `
          <div class="swiper-slide" id="cardPro${prodotto.id}">
              <div class="card">
                  <img src="${prodotto.images[0]}" class="card-img-top" id="card-img" alt="${prodotto.title}">
                  <div class="card-body">
                      <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
                      <p class="card-text" id="card-text">${prodotto.description}</p>
                      <p class="card-price" id="card-price">${prodotto.price}€</p>
                      <button class="aggiungi-carrello btn btn-primary" data-id="${prodotto.id}">Aggiungi al carrello</button>
                  </div>
              </div>
          </div>
        `;
        cardProdotto.innerHTML += card;
      });

      // Aggiungi event listener per "Aggiungi al carrello" su tutti i bottoni
      document.querySelectorAll(".aggiungi-carrello").forEach((btn) => {
        btn.addEventListener("click", function () {
          // Ottieni l'ID del prodotto dalla data attributo del bottone
          const prodottoId = this.getAttribute("data-id");
          // Esegui la logica per aggiungere il prodotto al carrello
          aggiungiProdottoAlCarrello(prodottoId);
        });
      });
    });
}

function aggiungiProdottoAlCarrello(prodottoId) {
  // Recupera il carrello dell'utente dal localStorage
  let utente = JSON.parse(localStorage.getItem("utente")) || { carrello: [] };
  // Aggiungi l'ID del prodotto al carrello dell'utente
  fetch("https://dummyjson.com/products/" + prodottoId)
    .then((response) => response.json())
    .then((prodotto) => {
      utente.carrello.push(prodotto);

      // Salva l'aggiornamento del carrello dell'utente nel localStorage
      localStorage.setItem("utente", JSON.stringify(utente));
      // Esegui eventuali altre operazioni, come aggiornare l'interfaccia utente
      console.log(prodotto);
      //richiama la funzione 
      // showCarrello();
    });
}

// Chiamata per ottenere e visualizzare i prodotti
telefoni(URLphone);

let utente = JSON.parse(localStorage.getItem("utente"));

let welcame = document.querySelector("#welcome");
let utenteBenvenuto = document.querySelector("#utenteBenvenuto");

let btnLogout = document.querySelector("#btnLogout");

const URLJSON = "http://localhost:3000/utenti";

btnLogout.addEventListener("click", function () {
  fetch(URLJSON, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      utente,
    }),
  });
  localStorage.removeItem(utente);
  localStorage.clear();
});

let loginProva = document.getElementById("loginProva");

function funzione() {
  console.log(localStorage.getItem("utente"));
  if (localStorage.getItem("utente") != null) {
    console.log("connesso");
    loginProva.style = "display:none";
    welcame.innerHTML = `<i class=""></i><span>  ${utente.username}! <br> Solo per Oggi!</span>`;
    utenteBenvenuto.innerHTML = `<i class=""></i><span> Benvenuto ${utente.username}!</span>`;
    // TODO con boIcon su class aggiungi icona
  } else {
    console.log("non connesso");
    btnLogout.style = "display:none";
    loginProva.style = "display:";

    // window.location.href = "http://127.0.0.1:5500/ecommerce/index.html";
  }
}
loginProva.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/ecommerce/index.html";
});
funzione();



let elencoCarrelloPieno = document.getElementById("elencoCarrelloPieno");

let checkout = document.getElementById("checkout");
checkout.addEventListener('click',showCarrello);


/* -------------------------------------------------------------------------- */
/*                                showCarrello                                */
/* -------------------------------------------------------------------------- */
function showCarrello() {
  elencoCarrelloPieno.innerHTML = "";
  let carrelloPieno = localStorage.getItem("utente", "carrello");
  let JsonCarrelloPieno = JSON.parse(carrelloPieno);
  console.log(JsonCarrelloPieno);

  JsonCarrelloPieno.carrello.forEach((prodotto) => {
    console.log(prodotto);
    let prodottoCard = `
    <div class="swiper-slide" id="cardCarrello${prodotto.id}">
    <div class="card">
    <img src="${prodotto.images[0]}" class="card-img-top" id="card-img" alt="${prodotto.title}">
    <div class="card-body">
    <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
    <p class="card-text" id="card-text">${prodotto.description}</p>
    <p class="card-price btn btn-danger" id="card-price">${prodotto.price}€</p>
    <p><button class="rimuovi-prodotto btn btn-danger rimuovi-${prodotto.id}">Rimuovi</button></p>
    </div>
    </div>
    </div>
    `;

    elencoCarrelloPieno.innerHTML += prodottoCard;
    // Aggiungi un listener per "Rimuovi" su tutti i pulsanti

    let bottoni = document.querySelectorAll(`.rimuovi-${prodotto.id}`);
    bottoni.forEach(bottone=>{
      bottone.addEventListener("click", function () {
        // Ottieni l'ID del prodotto dal data attributo del pulsante
        // const prodottoId = this.getAttribute("id").split("-")[1];
        // Rimuovi la carta corrispondente dall'HTML
        let cardToRemove = document.getElementById(
          `cardCarrello${prodotto.id}`
        );
        if (cardToRemove) {
          cardToRemove.remove();
          rimuoviProdottoDalCarrelloStorage(prodotto.id);
          // Rimuovi il prodotto dal carrello nell'localStorage
          // showCarrello();
        }
      });
    });
    
  });

  

  function rimuoviProdottoDalCarrelloStorage(prodottoId) {
    // Recupera il carrello dell'utente dall'localStorage
    let utente = JSON.parse(localStorage.getItem("utente")) || {
      carrello: [],
    };
    // Rimuovi il prodotto dal carrello dell'utente
    utente.carrello = utente.carrello.filter(
      (prodotto) => prodotto.id !== prodottoId
    );
    // Aggiorna il carrello dell'utente nell'localStorage
    localStorage.setItem("utente", JSON.stringify(utente));
  }

  // let cardDelete = document.getElementById("cardDelete");
  // cardDelete.addEventListener('click',function(){
  // JSON.parse(localStorage.getItem("utente"));
  // localStorage.removeItem('utente','carrello');
  // console.log("rimosso");
  // elencoCarrelloPieno.innerHTML="";
  // })
}
