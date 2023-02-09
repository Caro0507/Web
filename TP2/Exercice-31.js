function affichage() {
    let body = document.querySelector('body');
    let list = document.createElement('ul');
    let point1 = document.createElement('li');
    let text1 = document.createTextNode('one');
    let point2 = document.createElement('li');
    let text2 = document.createTextNode('two');
    let point3 = document.createElement('li');
    let text3 = document.createTextNode('three');

    l_point = [point1, point2, point3];
    l_text = [text1, text2, text3];

    body.appendChild(list);

    for (let i = 0; i < 3; i++) {
        list.appendChild(l_point[i]);
        l_point[i].appendChild(l_text[i]);
    }


}

window.addEventListener("load", affichage, false);