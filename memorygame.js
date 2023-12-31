document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game");
    let firstCard = null;
    let secondCard = null;
    let cardsFlipped = 0;
    let notClicked = false;

    const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "yellow",
    ];

    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
         // Pick a random index
            let index = Math.floor(Math.random() * counter);

         // Decrease counter by 1
            counter--;

         // And swap the last element with it
         let temp = array[counter];
         array[counter] = array[index];
         array[index] = temp;
        }

        return array;
    }

    let shuffledColors = shuffle(COLORS);

 // this function loops over the array of colors
 // it creates a new div and gives it a class with the value of the color
 // it also adds an event listener for a click for each card
    function createDivsForColors(colorArray) {
         for (let color of colorArray) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(color);
            newDiv.addEventListener("click", handleCardClick);
            gameContainer.append(newDiv);
        }
    }

    function handleCardClick(event) {
     if (notClicked) return;
     if (event.target.classList.contains("flipped")) return;

        let pickedCard = event.target;
        pickedCard.style.backgroundColor = pickedCard.classList[0];


        if (!firstCard || !secondCard) {
            pickedCard.classList.add("flipped");
            firstCard = firstCard || pickedCard;
            secondCard = pickedCard === firstCard ? null : pickedCard;
        }

        if (firstCard && secondCard) {
            notClicked = true;
            // debugger
            let gif1 = firstCard.className;
            let gif2 = secondCard.className;

         if (gif1 === gif2) {
         cardsFlipped += 2;
         firstCard.removeEventListener("click", handleCardClick);
         secondCard.removeEventListener("click", handleCardClick);
         firstCard = null;
         secondCard = null;
         notClicked = false;
            } else {
                setTimeout(function() {
                 firstCard.style.backgroundColor = "";
                 secondCard.style.backgroundColor = "";
                 firstCard.classList.remove("flipped");
                 secondCard.classList.remove("flipped");
                 firstCard = null;
                 secondCard = null;
                 notClicked = false;
                }, 1000);
            }
        }

        if (cardsFlipped === COLORS.length) alert("game over!");
    }

    createDivsForColors(shuffledColors);
});