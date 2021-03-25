class Game {
    constructor() {
        this.game = 0
        this.points = document.querySelector("#points")
        this.questionNumber = document.querySelector("#question-number")
        this.question = document.querySelector("#gameplay-question")
        this.answerOne = document.querySelector("#answer-one-div")
        this.answerTwo = document.querySelector("#answer-two-div")
        this.answerThree = document.querySelector("#answer-three-div")
        this.answerFour = document.querySelector("#answer-four-div")
        this.correctAnswer = 0 // This would point to the correct answer in the json object
        this.answerChosen = ""
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

    submitAnswer(answer) {
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
        // if json object answer == this.answerChosen
        // then add 100 points and render new question
        // if the answer chosen isn't the json object answer 
        // then don't add points and render next question
    }

    async getGame() {
        this.game = await fetch("https://trivia-api-cse-341.herokuapp.com/api/getGame", this.getGame).then(this.convertToJson)
        console.log(game)
    }

    getQuestion() {
        // get game object
        // load first question
        // set an incrementor to increment to next question
        this.questionNumber = this.game.question2
        this.question = this.game.question2.question
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
game.getGame()

let answerOne = document.querySelector("#answer-one-div").addEventListener("click", game.submitAnswer)
let answerTwo = document.querySelector("#answer-two-div").addEventListener("click", game.submitAnswer)
let answerThree = document.querySelector("#answer-three-div").addEventListener("click", game.submitAnswer)
let answerFour = document.querySelector("#answer-four-div").addEventListener("click", game.submitAnswer)