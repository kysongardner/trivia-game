function convertToJson(res) {
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

document.querySelector(".add-question-form").addEventListener("submit", addQuestion)

async function addQuestion(e) {
    e.preventDefault()

    // Get the category
    let categoryOption = document.querySelector("#topics")
    let categoryOptionValue = categoryOption.value

    // Get the difficulty
    let difficultyOption = document.querySelector("#difficulty")
    let difficultyOptionValue = difficultyOption.value

    // Get the correctAnswer
    let correctAnswerOption = document.querySelector("#correct-answer")
    let correctAnswerOptionValue = correctAnswerOption.value




    const question = document.querySelector("#question-input").value
    const answerOne = document.querySelector("#answer-one").value
    const answerTwo = document.querySelector("#answer-two").value
    const answerThree = document.querySelector("#answer-three").value
    const answerFour = document.querySelector("#answer-four").value
    const category = categoryOptionValue
    const difficulty = difficultyOptionValue
    const correctAnswer = correctAnswerOptionValue

    let firstAnswer = false
    let secondAnswer = false
    let thirdAnswer = false
    let fourthAnswer = false

    // Setting the correct answer attribute to the right answer
    if (correctAnswer == 0) {
        firstAnswer = true
    }
    if (correctAnswer == 1) {
        secondAnswer = true
    }
    if (correctAnswer == 2) {
        thirdAnswer = true
    }
    if (correctAnswer == 3) {
        fourthAnswer = true
    }

    const formData = {
        question: question,
        answers: [{
                text: answerOne,
                isTrue: firstAnswer
            },
            {
                text: answerTwo,
                isTrue: secondAnswer
            },
            {
                text: answerThree,
                isTrue: thirdAnswer
            },
            {
                text: answerFour,
                isTrue: fourthAnswer
            },

        ],
        category: category,
        difficulty: `${difficulty}`
    }

    console.log(formData)

    const addQuestion = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch("https://trivia-api-cse-341.herokuapp.com/api/submit-question", addQuestion)
        .then((result) => {
            // console.log(result)
            //  return convertToJson(result)
            return result.json()
        })
    console.log(response)

}

function getAllQuestions() {
    const response = fetch("https://trivia-api-cse-341.herokuapp.com/api/get-all-questions").then(convertToJson)
    console.log(response)

}
getAllQuestions()