function convertToJson(res){
    if (res.ok){
        return res.json()
    } else{
        let jsonResponse = res.json()
        throw { name: "servicesError", message: jsonResponse}
    }
}

document.querySelector(".signup-form").addEventListener("submit", signUp)

async function signUp(e){
    e.preventDefault()
    e.target
    // convert e.target to form data
    const formData = new FormData(e.target)
    const signUp = {
        method: 'POST',
        body: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    const response = await fetch("https://trivia-api-cse-341.herokuapp.com/api/register", signUp).then(convertToJson)
    console.log(response)
    return response
    
}