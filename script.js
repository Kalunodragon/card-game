// Cards and deck building function
// creates a 52 card deck (array) with each value and suit combo
const cards = deckConstruction()

// Global variables
const deckLocation = document.getElementById('card-collection')
const handLocation = document.getElementById('hand-collection')
const handTwoLocation = document.getElementById('hand-two-collection')
const discardLocation = document.getElementById('discard-collection')
const playLocation = document.getElementById('play-collection')

// Event Listeners on golbal variables
const shuffleFaceUp = document.getElementById('shuffle-face-up')
shuffleFaceUp.addEventListener('click', () => randomDeckShuffle())

const dealFiveCardButton = document.getElementById('deal-out-hand')
dealFiveCardButton.addEventListener('click', () => dealHand())

// Deck creation
function deckConstruction() {
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"]
  const cards = []
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      const value = values[v]
      const suit = suits[s]
      const power = v + 1
      cards.push({ value, suit, power })
    } 
  }
  return cards
}

// Function used to display the cards
    // Accepts a card object and a location on the page to display the card
function displayCard(cards, location){
  const cardValue = cards.value
  const cardSuit = cards.suit
  const cardPower = cards.power

  let entity
  cardSuit === "Diamonds"
    ? (entity = "&diams;")
    : (entity = "&" + cardSuit.toLowerCase() + ";")

  const card = document.createElement("div");
  card.classList.add("card", cardSuit.toLowerCase())
  card.id = cardValue + " " + cardSuit + " " + cardPower
  if(location === discardLocation){
    card.classList.add('played')
  }

  card.innerHTML = 
  '<span class="card-value-suit top">' + cardValue + entity +"</span>" +
  '<span class="card-suit">' + entity + "</span>" +
  '<span class="card-value-suit bot">' + cardValue + entity + "</span>"

  card.addEventListener('click', (e) => handlesClickedCard(e))

  location.appendChild(card);
}

function handlesClickedCard(e){
  if(e.target.id){
    const info = e.target.id.split(" ")

    const infoObj = {
      value: info[0],
      suit: info[1],
      power: info[2]
    }
    playCard(infoObj)
    document.getElementById(e.target.id).remove()
    checkPlayedCards(infoObj)
  } else {
    const info = e.target.parentNode.id.split(" ")

    const infoObj = {
      value: info[0],
      suit: info[1],
      power: info[2]
    }
    playCard(infoObj)
    document.getElementById(e.target.parentNode.id).remove()
    checkPlayedCards(infoObj)
  }
}

// using this function to test the handleing clicking card function
function playCard(cardInfo){
  displayCard(cardInfo, playLocation)
}

// Random deck shuffle => creates random array of cards
function randomDeckShuffle(){
  if(document.querySelectorAll('div').length > 0){
    document.querySelectorAll('div').forEach(div => div.remove())
  }
  const deck = cards.sort(() => (Math.random() > .5 ? 1 : -1))
  deck.forEach(cardInDeck => displayCard(cardInDeck, deckLocation))
}

function dealHand(){
  if(document.querySelectorAll('div').length >= 5){
    document.querySelectorAll('div').forEach(div => div.remove())
  }
  const deck = cards.sort(() => (Math.random() > .5 ? 1 : -1))

  const hand = deck.slice(0,5)
  const handTwo = deck.slice(5,10)
  const newDeck = deck.slice(10, )

  hand.forEach(card => displayCard(card, handLocation))
  handTwo.forEach(card => displayCard(card, handTwoLocation))
  newDeck.forEach(deckCard => displayCard(deckCard, deckLocation))

}

/*
Function to test if cards match

needs to be able to check if cards dont match which is the highest
*/
let playedCards = []
function checkPlayedCards(info){
  const power = info.power
  const played = document.querySelectorAll('.played')
  const match = playedCards.find(play => play === power)
  
  if(match){
    console.log('A match has been found')
    console.log(playedCards)
    playedCards = []
    console.log(playedCards)

  } else {
    console.log('No match keep playing')
    console.log(playedCards)
    playedCards.push(power)
  }
  
  // played.forEach(play => {
  //   playedCards.push(play.id.split(" ")[2])
  // })


  console.log(info)


}
// use some kind of iteration to push the next index in the deck
// into the players hands. (alternating players) (*** Draw a card function)
// Have some sort of discard array
// have a draw button that adds the next index value of a card to
// the current players hand. (*** Draw a card function)