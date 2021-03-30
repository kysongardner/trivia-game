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

document.querySelector(".signup-form").addEventListener("submit", signUp)

async function signUp(e) {
    e.preventDefault()

    const firstName = document.getElementById("firstname").value
    const lastName = document.getElementById("lastname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)


    const formData = {
        firstname : firstName,
        lastname : lastName,
        email : email,
        password : password,
        confirmPassword : confirmPassword
    }
    console.log(formData)
    const signUp = {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await fetch("http://trivia-api-cse-341.herokuapp.com/api/register", signUp).then(convertToJson)
    console.log(response)

}