// make deck
const suits = ["H", "D", "C", "S"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
let started = false;
let true_last_card = null;
let made_move = false;

let deck = [];

for (let suit of suits) {
	for (let rank of ranks) {
		deck.push({
			type: "card",
			suit: suit,
			rank: rank,
		});
	}
}

deck.push({ type: "Joker" }, { type: "Joker" });

function shuffleDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

let shuffledDeck = shuffleDeck(deck);
console.log(shuffledDeck);

// make player and computer cards

let computer_cards = [];
let player_cards = [];

for (let i = 0; i < 4; i++) {
	computer_cards.push(shuffledDeck.pop());
	player_cards.push(shuffledDeck.pop());
}

console.log(computer_cards);
console.log(player_cards);

console.log(shuffledDeck);

// start and stop buttons
const start_btn = document.getElementById("start_btn");
const stop_btn = document.getElementById("stop_btn");
const last_card_c = document.getElementById("last_card");
const last_c = document.getElementById("last_c");

function start() {
	start_btn.style.display = "none";
	stop_btn.style.display = "inline-block";

	last_card_c.style.display = "none";
	placeCard(shuffledDeck.length - 1);

	showTwoCards();

	started = true;
	console.log(true_last_card);
	setTimeout(() => {
		playGame();
	}, 5000);
}

// function openModal() {
// 	document.getElementById("modal").classList.remove("hidden");
// }

// function closeModal() {
// 	document.getElementById("modal").classList.add("hidden");
// }

// assign cards
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const c4 = document.getElementById("c4");

const ci1 = document.getElementById("ci1");
const ci2 = document.getElementById("ci2");
const ci3 = document.getElementById("ci3");
const ci4 = document.getElementById("ci4");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");

let c_card1 = computer_cards[0];
let c_card2 = computer_cards[1];
let c_card3 = computer_cards[2];
let c_card4 = computer_cards[3];

let p_card1 = player_cards[0];
let p_card2 = player_cards[1];
let p_card3 = player_cards[2];
let p_card4 = player_cards[3];

// show first two cards
function showTwoCards() {
	if (p_card3.type === "card") {
		p3.src = `./cards/${p_card3.rank}${p_card3.suit}.svg`;
	} else {
		p3.src = "./cards/Joker.svg";
	}

	if (p_card4.type === "card") {
		p4.src = `./cards/${p_card4.rank}${p_card4.suit}.svg`;
	} else {
		p4.src = "./cards/Joker.svg";
	}

	p3.style.position = "relative";
	p3.style.zIndex = "10000";
	p4.style.position = "relative";
	p4.style.zIndex = "10000";
	p3.classList.add("card-highlight");
	p4.classList.add("card-highlight");

	startCountdown(5);

	setTimeout(() => {
		closeTwoCards();
		p3.style.position = "";
		p3.style.zIndex = "";
		p4.style.position = "";
		p4.style.zIndex = "";
		p3.classList.remove("card-highlight");
		p4.classList.remove("card-highlight");
	}, 5000);
}

// close them
function closeTwoCards() {
	p3.src = "./cards/back.svg";
	p4.src = "./cards/back.svg";
}

//countdown modal
let countdownInterval;

function startCountdown(seconds) {
	let timeLeft = seconds;

	document.getElementById("countdown_modal").classList.remove("hidden");
	document.getElementById("countdown_text").innerText = timeLeft;

	countdownInterval = setInterval(() => {
		timeLeft--;

		document.getElementById("countdown_text").innerText = timeLeft;

		if (timeLeft <= 0) {
			clearInterval(countdownInterval);
			document.getElementById("countdown_modal").classList.add("hidden");
		}
	}, 1000);
}

const last_card = document.createElement("img");

function placeCard(card_index) {
	// write if statement for if it is not from deck but other player
	let the_card = shuffledDeck[card_index];

	if (the_card.type === "card") {
		last_card.src = `./cards/${the_card.rank}${the_card.suit}.svg`;
	} else {
		last_card.src = "./cards/Joker.svg";
	}

	last_c.prepend(last_card);
	true_last_card = shuffledDeck.pop();
}

console.log(shuffledDeck);
console.log(true_last_card);

function playGame() {
	if (started) {
		if (c_card3.rank === true_last_card.rank && c_card3.type != "Joker") {
			putCard(c_card3);
			deleteCard(c3, ci3);
		} else if (c_card4.rank === true_last_card.rank && c_card4.type != "Joker") {
			putCard(c_card4);
			deleteCard(c4, ci4);
		}
	}
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function putCard(card) {
	await sleep(3000);

	if (!made_move) {
		true_last_card = { ...card };
		last_card.src = `./cards/${true_last_card.rank}${true_last_card.suit}.svg`;
	}
}

async function deleteCard(card, invisible) {
	await sleep(3000);

	if (!made_move) {
		card.style.display = "none";
		invisible.style.display = "block";
	}
}
