/**
 * Module gérant le formulaire login 
 * Construit la requete fetch et l'envoie vers l'API
 * Analyse la reponse de l'Api
 * Affiche les erreurs
 * Recoit le token bearer et le stocke
 */

// message erreur reponse API  DOM
const loginElements = document.querySelector(".erreur-login");
const loginElement = document.createElement('p');
loginElements.appendChild(loginElement);

// ecoute submit formulaire login
const formulaireLogin = document.querySelector(".login");
formulaireLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    // Création de l’objet du login
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    // Création de la charge utile en chaine json
    const chargeUtile = JSON.stringify(login);

    // Envoie de la requete reseau, attente et analyse de la reponse (promesse)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then(response => { // on resout la promesse envoyée par fetch
        
        if (response.status === 200){
            return response.json(); // on retourne le corps de la reponse en json
        }
        else if(response.status === 401){
            loginElement.innerText="Mot de passe invalide. ";
            document.getElementById('password').value="";
            document.getElementById('password').focus();
            return response.json();
        }
        else if(response.status === 404){
            loginElement.innerText="Email inconnu.";
            document.getElementById('password').value="";
            document.getElementById('email').value="";
            document.getElementById('email').focus();
            return response.json();
        }
    })
    .then(function(responseToken){
        
        if(responseToken.token){
            sessionStorage.setItem('token',responseToken.token);
            document.location.href="index.html";
        };
    })
    .catch(error =>{
        console.error(error);
        window.alert("Serveur injoignable.");
    });

});



