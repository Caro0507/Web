const backend = "https://cawrest.ensimag.fr"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibHVvdyIsImRlbGVnIjoibm90LWRlZmluZWQifQ.mSi5kKB_lUwMJcu6nyf0pJX5XhkZ3cfhiBtxB9zqssU"
const wsBase = `${backend}/bmt/luow/` //


/* Shows the identity of the current user */
function setIdentity() {
	fetch("https://cawrest.ensimag.fr/whoami",
		{   method: 'GET',
			headers: {
				'Content-type': 'application/json',
				"x-access-token": token
			}
		})
		.then(response => response.json())
		.then(json => {
			const identClass = document.querySelector(".identity");
			const login = document.createTextNode(json.data);
			identClass.prepend(login);
		});
}

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	let availableHeight = window.innerHeight
	availableHeight -= document.getElementById("contents").offsetTop
	availableHeight -= 2 * document.querySelector('h1').offsetTop
	availableHeight -= 4 * 1
	document.getElementById("contents").style.height = availableHeight + "px"
}


/* Selects a new object type : either "bookmarks" or "tags" */
function selectObjectType(type) {
	if (type == "bookmarks") {
		document.querySelector("#menu .tags").classList.remove("selected");           // remove "selected" from tags
		document.querySelector("#menu .bookmarks").classList.add("selected");         // add "selected" to bookmarks
        document.querySelector("#add .tag").classList.remove("selected");             //remove "selected" from #add tag
		listBookmarks();                                                              // show the bookmarks
	}
	else if (type == "tags") {
        document.querySelector("#menu .bookmarks").classList.remove("selected");      // remove "selected" from bookmarks
		document.querySelector("#menu .tags").classList.add("selected");              // add "selected" to tags
        document.querySelector("#add .tag" ).classList.add("selected");               // add "selected" from #add tag
        listTags();                                                                   // show the tags

	}
}

/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	let vider = document.querySelector("#items");
	while (vider.lastElementChild) {
		vider.removeChild(vider.lastElementChild);}

    fetch(wsBase + "bookmarks", {
		method:'GET',
		headers:{	'Content-type':'application/json',
			'x-access-token':token
		}
	})  
        .then(response=>response.json())
        .then(json => {
            json.data.forEach(element =>{
                let copyBookmark = document.querySelector(".model.bookmark").cloneNode(true);
                copyBookmark.querySelector("h2").textContent = element.title;
                copyBookmark.querySelector("a").setAttribute("href", element.link);
                copyBookmark.querySelector("a").textContent = element.link;
                copyBookmark.querySelector(".description").textContent = element.description;
                let tagUl = copyBookmark.querySelector(".tags");
                element.tags.forEach(tag =>{
                    let tagLi = document.createElement("li");
                    tagLi.textContent = tag.name;
                    tagUl.appendChild(tagLi);

                })
                copyBookmark.setAttribute("num", element.id);
                copyBookmark.setAttribute("class","item bookmark");
                document.querySelector("#items").append(copyBookmark);
            })
        })
       
}

/* Loads the list of all tags and displays them */
function listTags() {
	/*vider <div id="items"> de son éventuel contenu*/
	let vider = document.querySelector("#items");
	while (vider.lastElementChild) {
		vider.removeChild(vider.lastElementChild);
	}

	/*load the list of tags in JSON from the web service*/
	const urlBase = wsBase + "tags";
	fetch(urlBase,
		{   method: 'GET',
			headers: {
                'Content-type': 'application/json',
				'x-access-token': token
		    }
		})
		.then(response => response.json())
		.then(json => {
			json.data.forEach(element => {         // browse the list of tags

				let copyModelTag = document.querySelector(".model.tag").cloneNode(true); // create a copy of <div class="model tag"> 

				copyModelTag.querySelector("h2").textContent = element.name;  // insert the tag name in <h2>
				copyModelTag.setAttribute("num", element.id)                  // add the "num" attribute, the tag with it id as value 
				copyModelTag.classList.remove("model");                       // remove the class "model"
				copyModelTag.classList.add("item")                            // replace it with the class "item"

				document.querySelector("#items").appendChild(copyModelTag);   // add the item
				
			});
		});
}


/* Adds a new tag */
function addTag() {
/*prendre le nom de tag dans le champ <input type="text" name="name"> */
	let nameInput = document.querySelector("input[name = 'name']")
	if (nameInput.value == '') {
		window.alert("error: value is empty")
	}
	else {

		/*definition du body avec le key et le value */
		let body = [];
		body.push("data" + "=" + JSON.stringify({ "name": nameInput.value }));

		/*appeler la création de nouveau tag dans le web-service*/
		let urlBase = wsBase + "tags";

		fetch(urlBase,
			{
				method: 'POST',
				headers: {
					"Content-type": 'application/x-www-form-urlencoded',
					"x-access-token": token
				},
				body
			})
			.then(listTags)
	}

}

/*change the class #items .selected by the class #items .tag put the h2 in display */
function initTag(){
	let tagInit = document.querySelector("#items .selected");
    if (tagInit){                                              // deselect the selected item (if there is any)
        tagInit.classList.replace("selected","tag");
	    tagInit.removeChild(tagInit.lastElementChild);
	    tagInit.firstElementChild.style.display="";            // display
	}
}

/* Handles the click on a tag */
function clickTag(tag) {

    initTag()
	tag.classList.replace("tag","selected")          // add the new class
	tag.firstElementChild.style.display="none";      // hid it name

	// add the form
	let form = document.createElement("form")
    tag.appendChild(form);

    // add the text
	let newText = document.createElement("input");
    newText.type = "text";
    newText.value = tag.textContent.replace(/[\t\r\n]/g,"");
    form.appendChild(newText);

    // add the button to modify the name
	let modifyButton = document.createElement("input");
    modifyButton.type = "button";
    modifyButton.value = "Modify name";
    form.appendChild(modifyButton);

    // add the button to delete the Tag
	let removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.value = "Remove tag";
    form.appendChild(removeButton);

	//add eventlistener
	modifyButton.addEventListener("click",modifyTag);
	removeButton.addEventListener("click",removeTag);
	form.addEveListener("submit",modifyTag);

}


/* Performs the modification of a tag */
function modifyTag() {
	let previousText = document.querySelector("#items .item.selected h2").textContent;
	let newText = document.querySelector("#items .item.selected  input[type='text']").value.trim();
	let id = document.querySelector("#items .item.selected").getAttribute("num");


    // if the wrong thing is written
	if(newText == ''){
        alert("No entry");
        return;
    }
    if (newText == previousText) {
        alert("No change");
	    return;
    }
 
	const body = new URLSearchParams();
	body.append("data",JSON.stringify({"name":newText}));

	fetch(wsBase + "tags/" + id, {
		method:'PUT',
		headers:{	
            'Content-type':'application/x-www-form-urlencoded',
			'x-access-token':token
		},
		body
	}).then(listTags).initTag()
}

/* Removes a tag */
function removeTag() {
	let id = document.querySelector("#items .item.selected").getAttribute("num");
	fetch(wsBase + "tags/" + id, {
		method:'DELETE',
		headers:{	
            'Content-type':'application/x-www-form-urlencoded',
			'x-access-token':token
		},
	})
    .then(listTags)
}



/* On document loading */
function miseEnPlace() {

	/* Give access token for future ajax requests */
	// Put the name of the current user into <h1>
	setIdentity()
	// Adapt the height of <div id="contents"> to the navigator window
	setContentHeight()
	window.addEventListener("resize", setContentHeight)
	// Listen to the clicks on menu items
	for (let element of document.querySelectorAll('#menu li')) {
		element.addEventListener('click', function () {
			const isTags = this.classList.contains('tags')
			selectObjectType(isTags ? "tags" : "bookmarks")
		}, false)
	}
	// Initialize the object type to "tags"
	selectObjectType("tags")
	// Listen to clicks on the "add tag" button

	document.getElementById("addTag").addEventListener("click", addTag, false)
	document.getElementById("items").addEventListener("click", (e) => {
		// Listen to clicks on the tag items
		const tag = e.target.closest(".tag.item")
		if (tag !== null) { clickTag(tag); return }
		// Questions 10 & 12 - Listen to clicks on bookmark items
		const bookmark = e.target.closest(".bookmark.item")
		//if (bookmark !== null) { clickBookmark(bookmark) }
	}
		//, false
        )
}
window.addEventListener('load', miseEnPlace, false)

