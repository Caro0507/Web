function list(i) {
    // Get the list
    let list = getDefinition(parseInt(i));

    // Remove the previous content if it exists
    let body = document.querySelector("dl");
    if (body != null) {
        body.remove()
    }

    // Transform to HTMl 
    let content = document.getElementById("contents");
    addItem(list, content);
}


function addItem(list, place) {

    // Selectors
    let paragraph = document.createElement("dl");
    let propriety = document.createElement("dt");
    let title = document.createTextNode(list['title']);  
    let elements = document.createElement("dd");
    let itemsList = document.createElement("ul");


    // Create the structure
    place.appendChild(paragraph);
    paragraph.appendChild(propriety);     // Propriety
    propriety.appendChild(title);    
    paragraph.appendChild(elements);      // Elements
    elements.appendChild(itemsList);
    
    
    // browse the items
    let items = list['items'];
    for (var item of items) {

        // Create a child li for each item
        let lists = document.createElement("li");    

        // If the item is a string
        if (typeof(item) === "string") {
            let texte = document.createTextNode(item);    
            lists.appendChild(texte);

        // Else, call the function again to find the leaves of the tree
        } else {
            addItem(item, lists);
        }

        // Add the list of items in the list
        itemsList.appendChild(lists);
    }


}


function init() {
    document.querySelectorAll("input").forEach(
        function(input) {
            input.addEventListener("click", function() { list(input.value) });
        }
    )
}

// init will be called at the end
window.addEventListener("load", init);