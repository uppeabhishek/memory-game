"use strict"
const items = 16;
const itemsInEachRow = 4;

const imageNames = ['arbok', 'balbasur', 'beedrill', 'blastoise', 'butterfree', 'charmandar', 'charmelon', 'pikachu'];

// Stack Overflow
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(arr) {
    const len = arr.length;
    for (let i=0;i<len-1;i++) {
        const index = getRandomInt(i+1, len-1);
        const temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

function getRandomImages () {
    let randomImages = [];
    for (let i=0; i<items/2;i++) {
        randomImages = randomImages.concat([imageNames[i], imageNames[i]]);
    }
    shuffleArray(randomImages);
    return randomImages;
}

const randomImages = getRandomImages();

let selectedItem = null;
let deletedImagesCount = 0;

function handleClick(that) {
    document.querySelector(".main").style.pointerEvents = "none";
    that.style.transform = "rotateY(-180deg)"

    // Don't allow to select same item
    if (selectedItem!==that) {
        if (!selectedItem) {
            selectedItem = that;
            document.querySelector(".main").style.pointerEvents = "all";
        }
        else {
            setTimeout(() => {
                if (that.dataset.imageName === selectedItem.dataset.imageName) {
                    that.innerHTML = '';
                    selectedItem.innerHTML = '';
                    deletedImagesCount+=2;
                }
                else {
                    that.style.transform = "rotateY(0deg)";
                    selectedItem.style.transform = "rotateY(0deg)"
                }
                selectedItem = null;
                document.querySelector(".main").style.pointerEvents = "all";
                if (deletedImagesCount === items) {
                    alert("Hurray!! You won the game");
                    location.reload();
                }
            }, 1000);
        }   
    }
    else {
        document.querySelector(".main").style.pointerEvents = "all";
    }
}

function getChildDiv(index) {
    const backDiv = document.createElement("div");
    const frontDiv = document.createElement("div");

    frontDiv.classList.add('child', 'front');
    frontDiv.textContent = "Open";

    backDiv.classList.add('child', 'back');
    backDiv.style = `background-image: url("./images/${randomImages[index]}.jpeg")`
    
    const div = document.createElement('div');
    div.className = "card-container"
    div.dataset.imageName = randomImages[index];

    div.addEventListener('click', function() {
        handleClick(this);
    });
    div.appendChild(frontDiv);
    div.appendChild(backDiv);
    return div;
}

let i = 0;
while (i<items) {
    const selector =  document.querySelector(".main");
    if (i%itemsInEachRow == 0) {
        const mainDiv = document.createElement("div");
        mainDiv.className = 'parent';

        if (i+1 < items) {
            for (let temp = 0; temp < itemsInEachRow; temp++) {
                mainDiv.appendChild(getChildDiv(i));
                i+=1;
            }
            selector.appendChild(mainDiv);
        }

        else {
            i+=1;
            selector.append(getChildDiv(i));
        }
    }
}
