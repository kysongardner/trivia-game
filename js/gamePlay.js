// get game
// get question
// 


class Game {
    constructor() {
        this.game = "" // set this equal to the game object
        this.points = 0
        this.questionNumber = 0
        this.question = ""
        this.answerOne = ""
        this.answerTwo = ""
        this.answerThree = ""
        this.answerFour = ""
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
        

        fetch(`https://trivia-api-cse-341.herokuapp.com/api/getGame${this.difficulty}&${this.category}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData                
            })
            .then((response) => {
                this.getGame(response)
            }).then(getGame(gameObject))
    }
    async getGame(gameObject) {
        // Get the game and then send the individual question 
        // object to the get question function
        for (const question in gameObject){
            this.questionNumber = gameObject.Question.Number
            this.getQuestion(this.questionNumber)
        }
        
        // set different properties to the gameObject properties.
    }

    async getQuestion(gameObject) {
        this.questionNumber = gameObject.question.number
        this.question = gameObject.questionNumber.question
        this.answerOne = gameObject.question.answerOne
        this.answerTwo = gameObject.question.answerTwo
        this.answerThree = gameObject.question.answerThree
        this.answerFour = gameObject.question.answerFour

        document.querySelector("#question-number").innerHTML = this.questionNumber + "/10"

        document.querySelector("#answer-one-div").innerHTML = this.answerOne
        document.querySelector("#answer-two-div").innerHTML = this.answerTwo
        document.querySelector("#answer-three-div").innerHTML = this.answerThree
        document.querySelector("#answer-four-div").innerHTML = this.answerFour


    }
    async submitAnswer(answer) {
        console.log(answer.target.id)
        this.answerChosen = answer.target.id
        let correctAnswer = false
        if (answer.target.id == "answer-one-div") {
            if (this.answerOne.isCorrect) {
                correctAnswer = true
            }
        } else if (answer.target.id == "answer-two-div") {
            if (this.answerTwo.isCorrect) {
                correctAnswer = true
            }
        } else if (answer.target.id == "answer-three-div") {
            if (this.answerThree.isCorrect) {
                correctAnswer = true
            }
        } else if (answer.target.id == "answer-four-div") {
            if (this.answerFour.isCorrect) {
                correctAnswer = true
            }
        }
        if (correctAnswer) {
            this.points += 100
        }
        this.updateStatistics()
        alert("Are you ready for the next question?")
        // If question is not above 10 then 
        // getQuestion()
    }
    async updateStatistics() {
        this.questionNumber = gameobjectquestionnumber + "/10"
        document.querySelector("#question-number").innerHTML = this.questionNumber
        document.querySelector("#points").innerHTML = this.points
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

function gameLoop() {
    console.log("This is the game loop!")
    // get game
    // get question
    // wait for answer
    // update statistics
    // wait for them to be ready
    // get question
    // play until question is the 10th question
    // call submitScore function & end game
    // Send them to their profile page

    let game = new Game()
    document.querySelector("#start-game-button").addEventListener("submit", game.getDifficulty)
    document.querySelector("#start-game-button").addEventListener("submit", game.getCategory)
    game.sendStartGameData()
    game.getGame()


    document.querySelector("#answer-one-div").addEventListener("click", game.submitAnswer)
    document.querySelector("#answer-two-div").addEventListener("click", game.submitAnswer)
    document.querySelector("#answer-three-div").addEventListener("click", game.submitAnswer)
    document.querySelector("#answer-four-div").addEventListener("click", game.submitAnswer)
}
gameLoop()