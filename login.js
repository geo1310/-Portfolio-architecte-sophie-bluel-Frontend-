const formulaireLogin = document.querySelector(".login");

formulaireLogin.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Création de l’objet du login
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=mot-de-passe]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(login);

    // Appel de la fonction fetch

    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then(reponse => {
        console.log(reponse.status)
        // mettre condition avant return si code 400 pas de return et message erreur
        return reponse.json()
    })
    .then(function(reponseToken){
        
        if(reponseToken.token){
            sessionStorage.setItem('token',reponseToken.token);
            document.location.href="index.html";

            console.log(reponseToken.token)  // test
        }
        else{
            const loginElements = document.querySelector(".erreur-login");
            loginElements.innerHTML="";
            const loginElement = document.createElement('p');
            loginElement.innerText="Erreur d' Authentification . ";
            loginElements.appendChild(loginElement);
        }
    })
    .catch(error =>{
        console.error(error)
    })

});



