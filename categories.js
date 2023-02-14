/*
    Récupère la liste des catégories dans l'api
    génère le code html des filtres pour le tri des projets sur la page principale
    chaque bouton filtre possède un dataset contenant l' Id de sa catégorie

    retoune la liste des catégories

*/

export async function gestionCategories(){

    // recuperation des categories dans l'api
    const reponseCategories = await fetch('http://localhost:5678/api/categories/');
    const categories = await reponseCategories.json();
    
    // génération des boutons filtres categories

    const filtresElements = document.querySelector(".filtres");

    for (let categorie of categories){
        const boutonElement = document.createElement("button");
        boutonElement.dataset.id = categorie.id;
        boutonElement.innerText = categorie.name;

        filtresElements.appendChild(boutonElement);
    }

    return categories    
}