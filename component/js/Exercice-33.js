/*
 *  lorsque la case à cocher est décochée, le menu (<div id='menu'>) doit 
 *  disparaître (display : none), lorsque la case est cochée, le menu doit réapparaître 
 *  (si le style de la page le prévoit).
 */
function switchMenu() {
    let menu = document.getElementById("menu");
    if (menu.style.display !== "none") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

/*
 * fonction pour retirer les thèmes précédents, afin qu'ils ne se supperposent pas. 
 */

function removeThemes() {
    document.querySelector("body").classList.remove("theme1");
    document.querySelector("body").classList.remove("theme2");
    document.querySelector("body").classList.remove("theme3");
}

function switchTheme() {
    let theme = document.getElementById("ltheme");

    removeThemes();

    if (theme.value === "theme1") {

        //le thème 1 ne doit pas afficher l'option de menu 
        document.getElementById("showMenu").style.display = "none";
        document.querySelector("label").style.display = "none";

        document.querySelector("body").classList.add("theme1");
    } else {
        // les thèmes 2 et 3 devraient afficher l'option de menu 
        document.getElementById("showMenu").style.display = "inline-block";
        document.querySelector("label").style.display = "inline-block";
    }

    if (theme.value === "theme2") {
        document.querySelector("body").classList.add("theme2");
    }

    if (theme.value === "theme3") {
        document.querySelector("body").classList.add("theme3");
    }
}


function initialize() {

    //au début, la case à cocher n'est pas sélectionnée, donc le menu ne devrait pas apparaître 
    document.getElementById("menu").style.display = "none";

    document.getElementById("showMenu").addEventListener("click", switchMenu);

    //Le thème 1 est le thème par défaut, donc l'option de menu ne devrait pas apparaître. 
    document.getElementById("showMenu").style.display = "none";
    document.querySelector("label").style.display = "none";

    //on ajoute le thème 1
    document.querySelector("body").classList.add("theme1");

    document.getElementById("ltheme").addEventListener("click", switchTheme);


}

window.addEventListener("load", initialize)