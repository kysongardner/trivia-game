class Game {
    constructor() {
        this.game = "";// set this equal to the game object
        this.points = document.getElementById("points").innerHTML
        this.questionNumber = document.querySelector("#question-number").value
        this.question = document.querySelector("#gameplay-question").value
        this.answerOne = document.querySelector("#answer-one-div").value
        this.answerTwo = document.querySelector("#answer-two-div").value
        this.answerThree = document.querySelector("#answer-three-div").value
        this.answerFour = document.querySelector("#answer-four-div").value
        this.correctAnswer = 0 // This would point to the correct answer in the json object
        this.answerChosen = ""
        this.category = document.querySelector("#start-game-topics")
        this.difficulty = ""
    }
    convertToJson(res) {
        if (res.ok) {
            return res.json()
        } else {
            let jsonResponse = res.json()
            throw {
                name: "servicesError",
                message: jsonResponse
            }
        }
    }
    async getDifficulty() {
        let radios = document.getElementsByName("difficulty")
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                this.category = radios[i].checked
                console.log(radios[i].value)
                break
            }
        }
    }
    async getCategory() {
        let theCategories = document.querySelector("#start-game-topics")
        this.category = theCategories.value
        console.log(this.category)
    }
    async sendStartGameData() {
        // send this.topic and this.category
        fetch("https://trivia-api-cse-341.herokuapp.com/api/startGame", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    difficulty: this.difficulty,
                    category: this.category
                })
            })
            .then((response) => {
                this.getGame(response)
            })
    }
    async getGame(gameObject) {
        console.log(gameObject)
        // set different properties to the gameObject properties.
    }

    async getQuestion() {
        // get game object
        // load first question
        // set an incrementor to increment to next question
        this.questionNumber = this.game.question2
        this.question = this.game.question2.question
    }
    async submitAnswer(answer) {
        console.log(answer.target.id)
        this.answerChosen = answer.target.id
        if (answer.target.id == "answer-one-div") {
            this.answerChosen = 1
        } else if (answer.target.id == "answer-two-div") {
            this.answerChosen = 2
        } else if (answer.target.id == "answer-three-div") {
            this.answerChosen = 3
        } else if (answer.target.id == "answer-four-div") {
            this.answerChosen = 4
        }
        // json game object answer 1 = this.answer1
        // json game object answer 2 = this.answer2
        // json game object answer 3 = this.answer3
        // json game object answer 4 = this.answer4
        // SEND ALERT SO IT STOPS THE GAME UNTIL THEY CLICK CONTINUE
        // if this.answerchosen == gameobject.correctAnswer == true
        // Add 100 points & call the update points function
        // else
        // increment the questionnumber and then call get question again.
    }
    async updatePoints(){
        this.points += 100
    }
    async updateQuestionNumber(){
        this.questionNumber = gameobjectquestionnumber + "/10"
    }


    // Send the userId, and score to user database table
    async postScore(e) {
        e.preventDefault()
        e.target
        // convert e.target to form data
        const formData = new FormData(e.target)
        const postScore = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const response = await fetch("https://trivia-api-cse-341.herokuapp.com/api/saveGame", postScore).then(convertToJson)
        console.log(response)
        return response

    }
}

let game = new Game()
document.querySelector("#start-game-button").addEventListener("submit", game.getDifficulty)
document.querySelector("#start-game-button").addEventListener("submit", game.getCategory)
game.sendStartGameData()
game.getGame()


// let answerOne = document.querySelector("#answer-one-div").addEventListener("click", game.submitAnswer)
// let answerTwo = document.querySelector("#answer-two-div").addEventListener("click", game.submitAnswer)
// let answerThree = document.querySelector("#answer-three-div").addEventListener("click", game.submitAnswer)
// let answerFour = document.querySelector("#answer-four-div").addEventListener("click", game.submitAnswer)