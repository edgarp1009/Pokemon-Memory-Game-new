const API = "https://pokeapi.co/api/v2/pokemon/"
const memoryContainer = document.querySelector(".memory-container");

//CONFIGURACION DE BOTONES

const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {shuffle(cardsToShuffle)});
reset.addEventListener("click", () => {
    reset.classList.add("hidden");
    let ganaste = document.querySelector(".ganaste");
    ganaste.classList.add("hidden");
});

const facil = document.querySelector(".facil");
const normal = document.querySelector(".medio");
const dificil = document.querySelector(".dificil");
const play = document.querySelector(".play");

play.addEventListener("click", ()=> {
    shuffle(cardsToShuffle); 
    console.log("shuffle");
    const logo = document.querySelector(".main-logo");
    logo.classList.add("hidden");
    const buttons = document.querySelector(".game-buttons");
    buttons.classList.add("hidden");
    memoryContainer.classList.toggle("hidden");
});

facil.addEventListener("click", ()=> {
    normal.classList.toggle("hidden");
    dificil.classList.toggle("hidden");
    play.classList.toggle("hidden");
});
normal.addEventListener("click", ()=> {
    facil.classList.toggle("hidden");
    dificil.classList.toggle("hidden");
    play.classList.toggle("hidden");
});
dificil.addEventListener("click", ()=> {
    normal.classList.toggle("hidden");
    facil.classList.toggle("hidden");
    play.classList.toggle("hidden");
});

//CONFIGURACION DEL JUEGO

let firstPokemonMemory = 1;
let lastPokemonMemory = 5;

async function obtenerPokemon(first, last) { 
    for (let i = first; i <= last; i++) {
    try{
        const response = await fetch(`${API}/${i}`);
        const data = await response.json();
        createMemoryCards(data);
    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
    }
        
    }
};

let cardsToShuffle = [];

function createMemoryCards(pokemon) {
    const memoryCard = document.createElement("div");
    memoryCard.classList.add("memory-card");
    memoryCard.addEventListener("click", () => {memoryCard.classList.toggle("flipped"); console.log("flipped")});
    memoryCard.addEventListener("click", flippedCardsDetector);

    const memoryCardFront = document.createElement("div");
    memoryCardFront.classList.add("memory-card-front");
    memoryCardFront.innerHTML = `
    <figure>
        <img class="imagen-pokemon" id="foto" src="${pokemon.sprites.other["official-artwork"]["front_default"]}" alt="${pokemon.name}">
    </figure>`;

    const memoryCardBack = document.createElement("div");
    memoryCardBack.classList.add("memory-card-back");

    memoryCard.append(memoryCardFront, memoryCardBack);

    cardsToShuffle.push(memoryCard);
}

obtenerPokemon(firstPokemonMemory,lastPokemonMemory);
obtenerPokemon(firstPokemonMemory,lastPokemonMemory);


function shuffle (cardsToShuffle) {

    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()* (i + 1));
        [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]];
    } 
    cardsToShuffle.forEach((card)=>{memoryContainer.append(card);});
}


let foundCardsCounter = 0;

let flippedCards;


function flippedCardsDetector () {
    flippedCards = document.querySelectorAll(".flipped");

    flippedCards.length == 2 ? compareCards(flippedCards) : null;
    console.log(flippedCards.length);
};

function compareCards(data) {

    if (flippedCards[0].children[0].children[0].children[0].alt == flippedCards[1].children[0].children[0].children[0].alt) {
        console.log ("SIII, SON IGUALES");
        foundCardsCounter += 2;
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.add("transparent"));}, 1200)
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));}, 1200);
        if(foundCardsCounter == cardsToShuffle.length){
            setTimeout(()=> {
                const ganaste = document.querySelector(".ganaste");
                const toDelete = document.querySelectorAll(".memory-card");
                ganaste.classList.remove("hidden");
                cardsToShuffle = [];
                foundCardsCounter = 0;
                toDelete.forEach(delet => delet.remove())
                obtenerPokemon(firstPokemonMemory,lastPokemonMemory);
                obtenerPokemon(firstPokemonMemory,lastPokemonMemory);
            }, 1000)

            setTimeout(()=> {
                
                reset.classList.remove("hidden");
                
            }, 3000)
        }

    } else {
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));}, 1200);
        
    }
};



// const logo = document.querySelector(".main-logo");
// logo.addEventListener("click", () => {
//     shuffle(cardsToShuffle); 
//     console.log("shuffle");
//     const logo = document.querySelector(".main-logo");
//     logo.classList.add("hidden");
// });



// function flippedCardsVerification () {
//     const card = document.querySelectorAll("flipped");

//     card.length = 2 ? {
//         card.forEach((item) => flippedCards.push(item.children[0].children[0].children[0]));
//     } : {}
// }
