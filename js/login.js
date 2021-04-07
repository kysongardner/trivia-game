function convertToJson(res){
    if (res.ok){
        return res.json()
    } else{
        let jsonReponse = res.json()
        throw { name: "servicesError", message: jsonResponse}
    }
}

document.querySelector(".login-form").addEventListener("submit", login)

async function login(e){
    e.preventDefault()
    e.target


    const email = document.getElementById("username").value
    const password = document.getElementById("login-password").value

    console.log(email)
    console.log(password)

    const formData = {
        email: email,
        password: password
    }

    const login = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch("http://trivia-api-cse-341.herokuapp.com/api/login", login).then(convertToJson)
    console.log(response)
    window.localStorage.setItem("token", response.token)
    if (response.isAuth){
        return response
    }
    
    
}