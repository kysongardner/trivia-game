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
        this.token = ""
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

// function gameLoop() {
//     console.log("This is the game loop!")
//     // get game
//     // get question
//     // wait for answer
//     // update statistics
//     // wait for them to be ready
//     // get question
//     // play until question is the 10th question
//     // call submitScore function & end game
//     // Send them to their profile page

//     let game = new Game()
//     game.sendStartGameData()

//     document.querySelector("#answer-one-div").addEventListener("click", game.submitAnswer)
//     document.querySelector("#answer-two-div").addEventListener("click", game.submitAnswer)
//     document.querySelector("#answer-three-div").addEventListener("click", game.submitAnswer)
//     document.querySelector("#answer-four-div").addEventListener("click", game.submitAnswer)
// }
// gameLoop()

async function sendStartGameData() {
    let url_url = window.location.href
    let url = new URL(url_url)
    let difficulty = url.searchParams.get("difficulty")
    let category = url.searchParams.get("category")
    let token = window.localStorage.getItem("token")
    console.log(token)

    

    fetch(`https://trivia-api-cse-341.herokuapp.com/api/getGame?difficulty=${difficulty}&category=${category}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            response.json()
            console.log(response)
        })
}

sendStartGameData()