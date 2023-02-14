/*
    Récupère la liste des projets dans l'api sauf si présence d'une liste de projets filtrés
    Génère le code html contenant la liste des projets

    Retourne la liste des projets
*/

export async function generationProjets(projetFiltres=null){

    let projets = projetFiltres

    //recuperation des projets si pas de projets filtres
    if(!projetFiltres){
        const reponseProjets = await fetch('http://localhost:5678/api/works/');
        projets = await reponseProjets.json();
    }
    
    //
    const galleryElements = document.querySelector(".gallery");
    galleryElements.innerHTML="";

    for (const projet of projets) {

        // Création d’une balise dédiée à un projet
        const projetElements = document.createElement("figure");
        // Création des elements d'un projet
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        imageProjet.alt = projet.title;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;

        // Rattachement des elements
        projetElements.appendChild(imageProjet);
        projetElements.appendChild(titreProjet);
        galleryElements.appendChild(projetElements);
        
    };

    return projets

};