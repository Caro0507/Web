/* Base URL of the web-service for the current user and access token */
const backend = "http://localhost:3000/" 
const token = 'eyJhbGciOiJIUzI1NiJ9.Q2Fyb2xpbmU.W3Ou1qCdWPD_03W4-lobaJYG-DHjWIX0J0fuzqrkdkE'
const wsBase = `${backend}bmt/Caroline/` 

/* Shows the identity of the current user */
function setIdentity() {
	fetch("http://localhost:3000/Caroline",
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
	/*clear <div id="items">*/
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

/* Adds a new Bookmark */
function addBookmark () {
  const name = window.prompt('your title for new bookmark:')

  if (name == '') {
    alert('error: value is empty')
  } else {
    const body = new URLSearchParams()

    // insert data
    console.log(name)
    body.append('data', JSON.stringify({ title: name, link: ' ', description: ' ', tags: 'null' }))

    fetch(wsBase + 'bookmarks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      },
      body
    })
      .then(listBookmarks)
  }
}


/* Adds a new tag */
function addTag() {
/*take the tagname in <input type="text" name="name"> */
	let nameInput = document.querySelector("input[name = 'name']")
	if (nameInput.value == '') {
		window.alert("error: value is empty")
	}
	else {
		let body = [];
		body.push("data" + "=" + JSON.stringify({ "name": nameInput.value }));

		fetch(wsBase + "tags",
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

/* Add new bookmark */
function initBookMark() {
  const BookMarkInit = document.querySelector('#items .selected')
  if (BookMarkInit) {                                          // deselect the selected item (if there is any)
    BookMarkInit.classList.replace('selected', 'bookmark')

    const saveText = BookMarkInit.querySelector('h2 input').value
    BookMarkInit.querySelector('h2').innerHTML = ''
    BookMarkInit.querySelector('h2').appendChild(document.createTextNode(saveText))

    BookMarkInit.removeChild(BookMarkInit.querySelector("input[name='link']"))
    BookMarkInit.querySelector('a').style.display = ''

    const saveDesc = BookMarkInit.querySelector('div textarea').value
    BookMarkInit.querySelector('div').innerHTML = ''
    BookMarkInit.querySelector('div').appendChild(document.createTextNode(saveDesc))

    BookMarkInit.removeChild(BookMarkInit.lastElementChild)
  }
}

/* Add new tag */
function initTag(){
	let tagInit = document.querySelector("#items .selected");
    if (tagInit){                                              // deselect the selected item (if there is any)
        tagInit.classList.replace("selected","tag");
	    tagInit.removeChild(tagInit.lastElementChild);
	    tagInit.firstElementChild.style.display="";            // display
	}
}



/* Handles the click on a BookMark */
function clickBookmark(bookmark) {

  initBookMark()

  const h2Modify = bookmark.querySelector('h2')
  const oldTitle = h2Modify.textContent
  h2Modify.textContent = ''
  const newTitle = document.createElement('input')
  newTitle.type = 'text'
  newTitle.name = 'title'
  newTitle.value = oldTitle
  const saveTitle = newTitle.cloneNode(true)
  saveTitle.style.display = 'none'
  h2Modify.appendChild(saveTitle)
  h2Modify.appendChild(newTitle)

  const aModify = bookmark.querySelector('a')
  const oldUrl = aModify.textContent
  aModify.style.display = 'none'
  const newUrl = document.createElement('input')
  newUrl.type = 'text'
  newUrl.name = 'link'
  newUrl.value = oldUrl
  bookmark.insertBefore(newUrl, aModify)

  const descrModity = bookmark.querySelector('.description')
  const oldDescr = descrModity.textContent
  descrModity.textContent = ''
  const newDescr = document.createElement('textarea')
  newDescr.value = oldDescr
  newDescr.setAttribute('cols', '30')
  const copyDescr = newDescr.cloneNode(true)
  copyDescr.style.display = 'none'
  descrModity.appendChild(copyDescr)
  descrModity.appendChild(newDescr)

  bookmark.classList.replace('bookmark', 'selected')

  // add the form
  let form = document.createElement("form")
  bookmark.appendChild(form);
  
  // add the button to modify the name
  let modifyButton = document.createElement("input");
  modifyButton.type = "button";
  modifyButton.value = "Modify name";
  form.appendChild(modifyButton);

  // add the button to delete the Tag
  let removeButton = document.createElement("input");
  removeButton.type = "button";
  removeButton.value = "Remove bookmark";
  form.appendChild(removeButton);

  // add eventlistener
  modifyButton.addEventListener('click', modifyBookmark)
  removeButton.addEventListener('click', removeBookmark)
  form.addEventListener('submit', modifyBookmark)
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



/* Performs the modification of a Bookmark */
function modifyBookmark () {
  const bookmarkModify = document.querySelector('#items .item.selected')

  const title = bookmarkModify.querySelector('h2').lastElementChild.value
  const link = bookmarkModify.querySelector("input[name='link']").value
  const desc = bookmarkModify.querySelector('div').lastElementChild.value

  const numModif = bookmarkModify.getAttribute('num')

  const url = wsBase + 'bookmarks/' + numModif
  const body = new URLSearchParams()
  // recuperer tags car on modifyer pas
  // TODO fetch and global value ？？why cant assign
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  })
    .then(res => res.json()).then(json => json.data).then(data => {
      body.append('data', JSON.stringify({ title: title, link: link, description: desc, tags: data.tags }))
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        },
        body
      })
        .then(listBookmarks).initBookMark()
    })
}


/* Performs the modification of a tag */
function modifyTag() {
	let previousText = document.querySelector("#items .item.selected h2").textContent;
	let newText = document.querySelector("#items .item.selected  input[type='text']").value.trim();
	let id = document.querySelector("#items .item.selected").getAttribute("num");

    // if the wrong thing is written
	if (newText == ''){
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


/* Removes a bookmark */
function removeBookmark () {
  let id = document.querySelector('#items .item.selected').getAttribute('num')
  fetch(wsBase + "bookmark/" + id, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'x-access-token': token
    }
  }).then(listBookmarks)
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
    //document.getElementById('addBookmark').addEventListener('click', addBookmark, false)
	document.getElementById("items").addEventListener("click", (e) => {
		// Listen to clicks on the tag items
		const tag = e.target.closest(".tag.item")
		if (tag !== null) { clickTag(tag); return }
		
        // Listen to clicks on the bookmark items
		const bookmark = e.target.closest(".bookmark.item")
		//if (bookmark !== null) { clickBookmark(bookmark) }
        }//,false
        )
}
window.addEventListener('load', miseEnPlace, false)

