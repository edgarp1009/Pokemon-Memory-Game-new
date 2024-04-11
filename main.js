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
const load = document.querySelector(".loader");

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
    restartCards = 5;
    startGame(lastPokemonMemoryFacil);
    load.classList.remove("hidden");
});
normal.addEventListener("click", ()=> {
    facil.classList.toggle("hidden");
    dificil.classList.toggle("hidden");
    play.classList.toggle("hidden");
    restartCards = 8;
    startGame(lastPokemonMemoryNormal);
    load.classList.remove("hidden");
});
dificil.addEventListener("click", ()=> {
    normal.classList.toggle("hidden");
    facil.classList.toggle("hidden");
    play.classList.toggle("hidden");
    startGame(lastPokemonMemoryDificil)
    restartCards = 11;
    load.classList.remove("hidden");
});

//CONFIGURACION DEL JUEGO

// let firstPokemonMemory = Math.floor(Math.random()*135) + 1;
// let lastPokemonMemory = firstPokemonMemory + 5;

const firstPokemonMemory = Math.floor(Math.random()*135) + 1;
const lastPokemonMemoryFacil = firstPokemonMemory + 5;
const lastPokemonMemoryNormal = firstPokemonMemory + 8;
const lastPokemonMemoryDificil = firstPokemonMemory + 11;
let restartCards = 0;


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
    memoryCard.addEventListener("click", () => {memoryCard.classList.toggle("flipped")});
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

    flippedCards.length == 2 ? compareCards(flippedCards) : null
};

function compareCards(data) {
    const blocker = document.querySelector(".blocker");
    blocker.classList.remove("hidden");

    if (flippedCards[0].children[0].children[0].children[0].alt == flippedCards[1].children[0].children[0].children[0].alt) {
        console.log ("SIII, SON IGUALES");
        foundCardsCounter += 2;
        setTimeout(() => {
            blocker.classList.add("hidden")}, 2200)

        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.add("transparent"));}, 1200);
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));}, 1200);
        if(foundCardsCounter == cardsToShuffle.length){
            setTimeout(()=> {
                let firstPokemonMemory = Math.floor(Math.random()*135) + 1;
                const lastPokemonMemory = firstPokemonMemory + restartCards;
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
            flippedCards.forEach((card) => card.classList.remove("flipped"));}, 1100);
        setTimeout(() => {
            blocker.classList.add("hidden")}, 2200)
    }
};


function startGame (last) {
    obtenerPokemon(firstPokemonMemory,last);
    obtenerPokemon(firstPokemonMemory,last);
};
