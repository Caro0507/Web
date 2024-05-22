function miseEnPlace(){
    const corps = document.querySelector('body');
    const listElement = document.createElement("ul");
    
    const list = [
        'one', 
        'two',
        'three'
    ];

    list.forEach(element => {
        const listItem = document.createElement("li");
        const item = document.createTextNode(element);
        
        listItem.appendChild(item);
        listElement.appendChild(listItem);

        if(list.length-1 == list.indexOf(element)){
            listItem.className = "last";
        }
    });

    corps.appendChild(listElement);
  }

  // La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
  window.addEventListener("load",miseEnPlace,false);




