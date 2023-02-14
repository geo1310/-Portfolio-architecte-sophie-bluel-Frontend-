// message erreur DOM
const loginElements = document.querySelector(".erreur-login");
const loginElement = document.createElement('p');
loginElements.appendChild(loginElement);

// ecoute submit formulaire login
const formulaireLogin = document.querySelector(".login");
formulaireLogin.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Création de l’objet du login
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(login);

    // Appel de la fonction fetch

    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then(response => {
        
        if (response.status === 200){
            return response.json()
        }
        else if(response.status === 401){
            loginElement.innerText="Mot de passe invalide. ";
            document.getElementById('password').value=""
            document.getElementById('password').focus()
            return response.json()
        }
        else if(response.status === 404){
            loginElement.innerText="Email inconnu.";
            document.getElementById('password').value=""
            document.getElementById('email').value=""
            document.getElementById('email').focus()
            return response.json()
        }
    })

    .then(function(responseToken){
        
        if(responseToken.token){
            sessionStorage.setItem('token',responseToken.token);
            document.location.href="index.html";
            console.log(responseToken.token)  // test
        }
    })
    .catch(error =>{
        console.error(error)
    })

});



