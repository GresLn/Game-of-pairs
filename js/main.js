const gameField = document.getElementById("game");
const buttonNew = document.getElementById("button");
let countPairs = 8;

function startGame(countPairs) {
    const cardsNumbersArray = [];
    let firstCard = null;
    let secondCard = null;

    // Создание массива с парами карточек
    function createNumbersArray(countPairs) {
        for (let i = 1; i <= countPairs; i++) {
            cardsNumbersArray.push(i, i)
        }
    }

    createNumbersArray(countPairs);

    // Перемешивание карточек
    function shuffle(cardsNumbersArray) {
        for (let i = 0; i < cardsNumbersArray.length; i++) {
            let randomIndexArray = Math.floor(Math.random() * cardsNumbersArray.length);
            let temp = cardsNumbersArray[i];
            cardsNumbersArray[i] = cardsNumbersArray[randomIndexArray];
            cardsNumbersArray[randomIndexArray] = temp;
        }
    }

    shuffle(cardsNumbersArray);

    for (const cardNumber of cardsNumbersArray) {
        let card = document.createElement("div");
        card.textContent = cardNumber;
        card.classList.add("card");
        console.log(card);

        card.addEventListener("click", () => {
            if (card.classList.contains("card_open") || card.classList.contains("identical")) {
                alert("Карточка уже открыта!")
                return
            }

            if (firstCard !== null && secondCard !== null) {
                firstCard.classList.remove("card_open");
                secondCard.classList.remove("card_open");
                firstCard = null;
                secondCard = null;
            }

            card.classList.add("card_open");

            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;
            }

            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.textContent;
                let secondCardNumber = secondCard.textContent;

                if (firstCardNumber === secondCardNumber) {
                    firstCard.classList.add("identical");
                    secondCard.classList.add("identical");
                }
            }

            if (cardsNumbersArray.length === document.querySelectorAll(".identical").length) {
                setTimeout(() => {
                    alert("Вы выиграли!");

                    let buttonNewGame = document.createElement("button");
                    buttonNewGame.classList.add("btn");
                    buttonNewGame.textContent = "Новая игра";
                    buttonNew.append(buttonNewGame);

                    buttonNewGame.addEventListener("click", function () {
                        gameField.innerHTML = "";
                        buttonNew.innerHTML = "";
                        startGame(countPairs);
                    })
                }, 400)
            }
        })

        gameField.append(card);
    }
}

startGame(countPairs);