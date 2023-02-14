import { generationProjets } from "./projets.js";

export async function gestionCategories(){

    // recuperation des categories
    const reponseCategories = await fetch('http://localhost:5678/api/categories/');
    const categories = await reponseCategories.json();

     //recuperation des projets
     const reponseProjets = await fetch('http://localhost:5678/api/works/');
     const projets = await reponseProjets.json();
    
    
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