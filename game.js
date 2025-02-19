let selectedCategory = '';
let cards = [];
let flippedCards = [];
let matchedCards = [];
let timeLeft = 60;
let timerInterval;

const categories = {
    fruits: ['🍎', '🍌', '🍒', '🍇', '🍊', '🍑'],
    animals: ['🐶', '🐱', '🐯', '🦁', '🐴', '🐸'],
    vehicles: ['🚗', '🚕', '🚌', '🚎', '🚙', '🚓'],
    nature: ['🌸', '🌻', '🌲', '🌳', '🌿', '🍃'],
};

function startGame(category) {
    selectedCategory = category;
    const selectedCards = categories[category];
    
    cards = [...selectedCards, ...selectedCards]; // Double the cards for matching pairs
    shuffleCards(cards);
    renderCards(cards);
    document.querySelector('.category-selection').style.display = 'none';
    startTimer();
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function renderCards(cards) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${card}</div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(event) {
    const card = event.target.closest('.card');
    
    if (flippedCards.length < 2 && !card.classList.contains('flip') && !matchedCards.includes(card.innerText)) {
        card.classList.add('flip');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.innerText === card2.innerText) {
        matchedCards.push(card1.innerText);
        flippedCards = [];
        if (matchedCards.length === cards.length / 2) {
            clearInterval(timerInterval);  // Stop timer when game is won
            showCongratsMessage();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game Over.");
            // Reset the game or handle timeout
        }
    }, 1000);
}

function showCongratsMessage() {
    const congratsMessage = document.createElement('div');
    congratsMessage.classList.add('congrats-message');
    congratsMessage.innerHTML = `
        <h2>Congratulations, You Win!</h2>
        <p>Great job! You completed the game!</p>
    `;

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.appendChild(congratsMessage);

    // Add animation to the message
    setTimeout(() => {
        congratsMessage.classList.add('fade-in');
    }, 50);
}
