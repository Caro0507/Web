function lifo_push(){
    //get the text written in the #newItem zone
    let info = document.querySelector("input[name='newItem']");

    if(info.value == ""){
        window.alert("Le texte ne peut pas être vide");
    }
    else{
        //get the html list
        let list = document.querySelector("ul[id='lifo']");

        //create a new list element 
        let listItem = document.createElement("li");

        //add item in the list
        listItem.prepend(info.value);
        list.prepend(listItem);

        //clear
        info.value = "";
    }
}

function lifo_pop(){
    //get the zise of the html list
    let size = document.querySelectorAll("#lifo li").length;
    
    if(size == 0)
        window.alert("error: la liste est vide!");
    else{
        //acces the html list created and remove first child
        let list = document.querySelector("ul[id='lifo']");
        list.removeChild(list.firstChild);
    }
}

function lifo_peek(){   
   //get the zise of the html list
   let size = document.querySelectorAll("#lifo li").length;
    
   if(size == 0)
        window.alert("error: la liste est vide!");

    else{
        //get the first child of the list 
        let list = document.querySelector("ul[id='lifo']").firstChild;
        
        //identify peek-area
        let peekArea = document.querySelector("#peek-area");

        peekArea.textContent = list.innerText;
    }
}

function initialize(){
    document.querySelector("input[name='push']").addEventListener("click", lifo_push);
    document.querySelector("input[name='pop']").addEventListener("click", lifo_pop);
    document.querySelector("input[name='peek']").addEventListener("click", lifo_peek);

    //prevent: the page doesent reload if enter key is pressed 
    document.addEventListener('keypress', function (event) {
        if (event.KeyCode === 13 || event.which === 13) {
            event.preventDefault();
            return false;
        }
        
    });

}

window.addEventListener("load", initialize);