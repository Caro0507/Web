// Turn the background color into yellow
function action1() {
    document.getElementById('contents').style.backgroundColor = 'yellow';
}

// Turn the title color into red if it is not and vice-versa
function action2() {
    let title = document.getElementById('introduction')
    if (title.style.color == 'red') {
        title.style.color = ''
    } else {
        title.style.color = 'red'
    }
}

// Turn the number i paragraph into italic
function action3(i) {
    let list_p = document.getElementsByTagName('p');
    list_p[i].style.fontStyle = 'italic';
}

// Main function
function main() {

    // Action 1
    document.getElementById('b1').addEventListener('click', action1)

    // Action 2
    document.getElementById('b2').addEventListener('click', action2)

    // Action 3
    let countAction3Clicks = 0; // counter of the number of click on the button 3
    document.getElementById('b3').addEventListener('click', function() {
        action3(countAction3Clicks);
        if (countAction3Clicks < 5) { // each time we click on the button 3, increment the counter
            countAction3Clicks += 1;
        }
    })

}



window.addEventListener("load", main);