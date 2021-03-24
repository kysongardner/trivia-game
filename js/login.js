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
    // convert e.target to form data
    const formData = new FormData(e.target)
    const login = {
        method: 'POST',
        body: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    const response = await fetch("https://trivia-api-cse-341.herokuapp.com/api/login", login).then(convertToJson)
    console.log(response)
    if (response.isAuth){
        return response
    }else{
        alert("Email not found. Try again or create an account.")
        
    }
    
    
}