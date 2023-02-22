/**
 * Module Central Appelé par la page principale du site
 * Gére la 1ere génération des projets
 * Gére la génération des boutons filtres par catégories
 * 
 * Il vérifie la presence d'un token pour entrer en mode edition
 * Gére le Logout du mode edition , écoute du logout
 * 
 * Gestion des filtres pour un affichage des projets par categories, ecoute des boutons filtres
 * 
 * Appel du module de gestion de la fenetre modale
 */

import { generationProjets } from "./projets.js";
import { gestionCategories } from "./categories.js";
import { modale } from "./modale.js";

// 1ere génération des projets ----------------------------------------------------------------------------------

await generationProjets();

// génération des boutons filtres et Récupération des Catégories

const categories = await gestionCategories();


// gestion administrateur -----------------------------------------------------------------------------

function logout(){

    sessionStorage.removeItem('token');
    
    const adminElements = document.querySelectorAll('.admin');
    for(const adminElement of adminElements){
        adminElement.style.display="none";
        document.getElementById('header').style.marginTop="50px";
    };
    document.querySelector('.edition-mode').style.display='none';
    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display=null;
    });
};

// Mode Edition ----------------------------------------------------------------------------------------

const adminToken = sessionStorage.getItem('token');
if (!adminToken){
    logout();
}
else { /* passage en mode édition */

    document.querySelectorAll('.admin').forEach(a => {
        a.style.display=null;
    });
    document.querySelector('.edition-mode').style.display=null;

    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display='none';
    document.getElementById('header').style.marginTop="100px";
    });

    // ecoute logout
    document.querySelector('.logout').addEventListener("click", function(){  
    logout();
    });
    
    // gestion de la fenetre modale
    modale(categories,generationProjets);
};

// ecoute des boutons filtres categories 

const filtresElementsBoutons = document.querySelectorAll(".filtres button");

for (let elementBouton of filtresElementsBoutons) {
    elementBouton.addEventListener("click", async function (e) {
        const projets = await generationProjets();
        const filtreCategoryId = e.target.dataset.id;

        if (filtreCategoryId !== "0"){
            const projetsFiltres = projets.filter(function (projet) {
                return projet.categoryId === parseInt(filtreCategoryId);
            });
            generationProjets(projetsFiltres);
        }
        else{
            generationProjets();
        };

    });
};




