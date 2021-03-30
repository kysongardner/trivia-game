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
    e.target

    

    const formData = {}
    const addQuestion = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch("https://trivia-api-cse-341.herokuapp.com/api/submit-question", addQuestion).then(convertToJson)
    console.log(response)
    if (response.isAuth) {
        return response
    } else {
        alert("Error Adding Question! Please Try Again!")
    }


}