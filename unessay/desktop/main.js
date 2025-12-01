//region CONSTVAR
const iconData1 = [
    ["icons/mcAfee.png", "McCrappy Antivirus"],
    ["icons/joeRogan.webp", "Podcasts"],
    ["icons/NFT.png", "NFTtrunk"],
    ["icons/shodan.webp", "AI wife"],
    ["icons/slots.png", "Let's Go Gambling!"],
    ["icons/league.png", "League of Legends"],
    ["icons/garbage.png", "Junk"]
];

const iconData2 = [
    ["icons/virus.png", "word.exe (Not a Virus)"],
    ["icons/COH.png", "Call of Honor™: Modern Battlefight™ 17"],
    ["icons/eye1.png", "Smile!"],
    ["icons/bananaPeel.png", "Junk"],
    ["icons/alcohol.png", "It doesn't matter"]
];

const iconData3 = [
    ["icons/family.png", "They miss who you were"],
    ["icons/fishBones.png", "Junk"],
    ["icons/casino.png", "Nothing better to do"],
    ["icons/eye1.png", "Everyone knows"],
    ["icons/garbage.png", "Junk"],
    ["icons/eye1.png", "You can't hide"]
];

const iconData4 = [
    ["icons/eye1.png", "It's so obvious"],
    ["icons/garbage.png", "Junk"],
    ["icons/noose.png", "The Easy Way"],
    ["icons/eye1.png", "No one will miss this"],
    ["icons/alcohol.png", "Think Less"],
    ["icons/fishBones.png", "Junk"],
    ["icons/eye1.png", "Why are you still here"]
];

const watchingIconData = [["icons/eye1.png", "Watching"]];

let dragged;
let deletedCount = 0;
let tauntCount = 0;
let deleteBlocked = false;

//region EVENTHANDLERS

function dragstartHandler(ev) {
    ev.target.classList.add("dragging");
    ev.dataTransfer.setData("text", ev.target);
    dragged = ev.target;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function deleteFile(ev) {
    if(dragged.id !== "garbage" && !deleteBlocked){
        const source = dragged.closest("figure");
        source.classList.add("droppable");
        const parent = dragged.parentNode;
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
        deletedCount++;
        checkForEvents();
    }
    else if(deleteBlocked){
        taunt();
    }
}

function dropHandler(ev) {
    ev.preventDefault();
    if(ev.target.id !== "garbage" && ev.target !== dragged && ev.target.classList.contains("droppable")){
        const source = dragged.closest("figure");
        
        let children = Array.from(dragged.parentNode.childNodes);
        for (const child of children) {
            ev.target.appendChild(child);
        }
        ev.target.classList.remove("droppable");
        source.classList.add("droppable");
    }
}

function dragendHandler(ev) {
    ev.target.classList.remove("dragging");
}



//region CLASSES
class Icon {
    /**
     * @param {*} image the image's filepath 
     * @param {*} name the image's name
     */
    constructor(image, name) {
        this.image = image;
        this.name = name;
    }
    
    /**
     * Creates an HTML element out of the object's data
     * @param containerId the string ID of the container to build the icon in
     */
    build(containerId) {
        const img = document.createElement("img");
        const container = document.getElementById(containerId);
        img.src = this.image;
        img.width = 100;
        container.appendChild(img);
        const name = document.createElement("figcaption");
        name.textContent = this.name;
        container.appendChild(name);
        container.classList.remove("droppable");
    }
}

class Garbage extends Icon{
    /**
     * @param {*} image the image's filepath 
     * @param {*} name the image's name
     */
    constructor(image, name){
        super(image, name);
    }

    /**
     * Creates an HTML element out of the object's data
     * @param containerId the string ID of the container to build the icon in
     */
    build(containerId) {
        const img = document.createElement("img");
        const container = document.getElementById(containerId);
        img.src = this.image;
        img.width = 100;
        img.id = "garbage";
        container.appendChild(img);
        const name = document.createElement("figcaption");
        name.textContent = this.name;
        container.appendChild(name);
        container.classList.remove("droppable");
    }
}

//region FUNCTIONS
/**
 * Creates an array of Icon objects
 * @returns array of Icon objects
 * @param iconData array of arrays containing an image filepath and a title
 */
function initializeIcons(iconData) {
    let icons = [];
    for (let index = 0; index < iconData.length; index++) {
        let newIcon = new Icon(iconData[index][0], iconData[index][1]);
        icons[index] = newIcon;
    }
    return icons;
}

/**
 * Populates the screen with icons.
 * Populates starting from the beginning of the array.
 * Removes the first element of the array after rendering it on screen.
 * @param {Array} icons the array of icons to populate the screen with
 * @param {number} numberToDraw the number of icons from the array to use 
 */
function populateIcons(icons) {
    let numberDrawn = 0;
    for (const container of containers) {
        if (Math.random() < 0.15 
        && icons.length !== 0 
        && document.getElementById(container).classList.contains("droppable")){
            icons[0].build(container);
            numberDrawn++;
            icons.shift();
        }
    }
    if(icons.length !== 0){
        populateIcons(icons);
    }
}

//region STORY FUNCTIONS
/**
 * Checks if a story event should happen
 * Triggers any appropriate story events
 */
function checkForEvents(){
    switch (deletedCount) {
        case iconData1.length - 3:
            openCallOfHonor();
            break;

        case iconData1.length:
            window.alert("You're wasting your time.");
            break;

        case iconData1.length + 1:
            window.alert(`We've been talking.
            We don't want you here.`);
            break;

        case iconData1.length + iconData2.length - 2:
            openGirlsAd();
            break;

        case iconData1.length + iconData2.length - 1:
            window.alert("Come on now.");
            break;
    
        case iconData1.length + iconData2.length:
            window.alert("Are you stupid?");
            window.alert("You must be.");
            break;

        case iconData1.length + iconData2.length + 1:
            window.alert("You're still going.");
            window.alert("That's something a stupid person would do.");
            break;

        case iconData1.length + iconData2.length + 2:
            window.alert("This place will never be clean.");
            break;

        case iconData1.length + iconData2.length + 3:
            window.alert("You will never be clean.");
            break;

        case iconData1.length + iconData2.length + 4:
            openViscerol();
            break;

        case iconData1.length + iconData2.length + iconData3.length:
            window.alert("You should really stop trying.");
            break;

        case iconData1.length + iconData2.length + iconData3.length + 1:
            window.alert("It'll never look right.");
            break;
        
        case iconData1.length + iconData2.length + iconData3.length + 2:
            window.alert("Just return the damn computer. It's either that or keep this up forever.");
            if(window.confirm("Would you like to give up?")){
                window.alert("I knew you'd understand eventually.");
                window.close();
            } else {
                window.alert("You'll regret that.");
                deleteBlocked = true;
            }
            break;

        case iconData1.length + iconData2.length + iconData3.length + iconData4.length + 12:
            window.open("./yourdidit/index.html");
            window.close();
            break;

        default:
            break;
    }
}

/**
 * Opens Call of Honor popup
 * Draws more icons to the screen
 */
function openCallOfHonor(){
    window.open("./callofhonor/index.html");
    populateIcons(icons2);
}

/**
 * Opens hot girls popup
 * Draws more icons to the screen
 */
function openGirlsAd(){
    window.open("./hotgirlsxxx/index.html");
    populateIcons(icons3);
}

/**
 * Opens viscerol essence popup
 * Draws more icons to the screen
 */
function openViscerol(){
    window.open("./uglybitch/index.html");
    populateIcons(icons4);
}

/**
 * Taunts the user.
 * To be called after blocking deletion
 */
function taunt(){
    switch(tauntCount){
        case 0:
            window.alert("You thought I'd just let you go through with this?");
            break;
        
        case 1:
            window.alert("Nobody wants you to do this.");
            break;

        case 2:
            window.alert("It's just you.");
            break;

        case 3:
            window.alert("This damn thing isn't worth the trouble.");
            break;

        case 4:
            window.alert("It's not like you can't live without this.");
            break;

        case 5:
            window.alert("So we're not letting you carry on.");
            break;

        case 6:
            window.alert("Just stop you dumb fuck.");
            break;

        case 11:
            window.alert("You are awfully persistent.");
            break;

        case 12:
            window.alert("Fine. Suit yourself. But don't say we didn't warn you.");
            deleteBlocked = false;
            break;

        default:
            break;
    }
    tauntCount++;
    if (deleteBlocked) {
        let watchingIcon = initializeIcons(watchingIconData);
        populateIcons(watchingIcon);
    }
}

//region STARTUP
// initialize containers
let containers = [];
let icons1 = initializeIcons(iconData1);
let icons2 = initializeIcons(iconData2);
let icons3 = initializeIcons(iconData3);
let icons4 = initializeIcons(iconData4);

for (let index = 0; index < 60; index++) {
    const container = document.createElement("figure");
    container.id = `container${index}`;
    container.classList.add("droppable");
    containers[index] = `container${index}`;
    
    container.addEventListener("dragstart", dragstartHandler);
    container.addEventListener("dragend", dragendHandler);
    container.addEventListener("dragover", allowDrop);
    container.addEventListener("drop", dropHandler);
    
    document.body.appendChild(container);
}

const garbage = new Garbage("icons/recycleBin.png", "Recycle Bin");
garbage.build(containers[0]);
// icons[0] = garbage;
garbageIcon = document.getElementById("garbage");
garbageIcon.addEventListener("drop", deleteFile);
// make garbage a dropzone
garbageIcon.addEventListener("dragover", allowDrop);

// icons = initializeIcons(iconData1);
populateIcons(icons1);


