// Define an object with some information about the expansions
var expansions = {
    // farmer: {name:"Farmers", type:"Minor"},
    innsandcathedrals: {name:"Inns and Cathedrals", img:img_innsandcathedrals, type:"Major", 
        parts: {
            bigmepple: {name:"The Big Mepple", type:"Sub"},
            inns: {name:"Inns", type:"Sub"},
            cathedrals: {name:"Cathedrals", type:"Sub"}
        }
    },
    tradersandbuilders:{name:"Traders and Builders", img:img_tradersandbuilders, type:"Major",
        parts: {
            pig: {name:"The Pig", type:"Sub"},
            builder: {name:"The Builder", type:"Sub"},
            goods: {name:"Goods", type:"Sub"}
        }
    },
    cropcircles: {name:"Crop Circles", img:img_cropcircles, type:"Minor"},
    ferries: {name:"The Ferries", img:img_ferries, type:"Minor"},
    abbot: {name:"The Abbot", img:img_abbot, type:"Minor"},
    river: {name:"The River", img:img_river, type:"Minor"},
    flier: {name:"The Flier", img:img_flier, type:"Minor"},
    goldmines: {name:"The Goldmines", img:img_goldmines, type:"Minor"},
    mageandwitch: {name:"Mage and Witch", img:img_mageandwitch, type:"Minor"},
    messages: {name:"The Messages", img:img_messages, type:"Minor"},
    robbers: {name:"The Robbers", img:img_robbers, type:"Minor"}
}


numberEl = document.getElementById("number")
minusEl = document.getElementById("minus")
plusEl = document.getElementById("plus")

//Check what is the previous number saved
if (!localStorage.getItem("number")){
    localStorage.setItem("number", 1)
    updateNumber(localStorage.getItem("number"))
} else {
    updateNumber(localStorage.getItem("number"))
}

//Set clic response for minus button
document.getElementById("minus").addEventListener("click", function(){
    n = parseInt(numberEl.innerHTML) - 1;
    updateNumber(n)
}); 
//Set clic response for plus button
document.getElementById("plus").addEventListener("click", function(){
    n = parseInt(numberEl.innerHTML) + 1;
    updateNumber(n)
}); 
//Set clic response for container 
document.getElementById("containerImg").addEventListener("click", function(){
    updateNumber(localStorage.getItem("number"));
}); 


//change element with number, hide plus and minus buttons if needed and update in the localstorage the current number
function updateNumber(n){
    numberEl.innerHTML = n;
    localStorage.setItem("number", n)
    if (numberEl.innerHTML <= 1){minusEl.style.visibility = "hidden";} else {minusEl.style.visibility = "visible";} //disable minus
    if (numberEl.innerHTML >= Object.keys(expansions).length){plusEl.style.visibility = "hidden";} else {plusEl.style.visibility = "visible";} //disable minus
    //TODO mejorar este if
    if (n >= 13){
        sizeImg = "20%"
    } else if (n >= 5){
        sizeImg = "30%"
    } else if (n >= 3){
        sizeImg = "45%"
    }else if (n == 2){
        sizeImg = "55%"
    }else if (n == 1){
        sizeImg = "90%"
    }
    //put the result
    document.getElementById("containerImg").innerHTML = "";
    var tempArray = random(n);
    for (var expansion in tempArray){
        document.getElementById("containerImg").innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="'+sizeImg+'" height="'+sizeImg+'"'+ expansions[tempArray[expansion]].img +'</svg>'
        

        
    }
}


//// CREATE LIST OF EXTENSIONS
//put in ul a new ul element and append to the DIV preexistent in the doc
var ul = document.createElement('ul');
document.getElementById('extentionList').appendChild(ul);


// do a for for each expansion in the object expansion
for (var expansion in expansions){

    // create a li object for each expansion and add it to ul element (in li to future sort and search function)
    var li = document.createElement('li');
    ul.appendChild(li);

    // create the checkbox with the name and id as the expansion, add a onclic function save and retrive localStorage to see if is previously saved
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = expansion;
    checkbox.id = expansion;
    checkbox.className = "toggle";
    checkbox.setAttribute("onclick","save('" + expansion + "');");
    checkbox.checked = (localStorage.getItem(expansion) == 'true')



    
    // add a label with the information of the expansion (ToDo add image and small description)
    var label = document.createElement('label')
    label.htmlFor = expansion;
    label.className = "lbl-toggle hoverized";
    sizeImg = "1rem";
    image = '<svg xmlns="http://www.w3.org/2000/svg" width="'+sizeImg+'" height="'+sizeImg+'"'+ expansions[expansion].img +'</svg>'
    label.appendChild(document.createTextNode(expansions[expansion].name));

    
    // add both elements to the current li
    li.appendChild(checkbox);
    li.appendChild(label)

}

// when is checked the status is saved in the localStorage
function save(expansion) {	
    el = document.getElementById(expansion);
    localStorage.setItem(el.name, el.checked);	
    // console.log(el.name + ": " + el.checked)
}
// TODO: add in the close panel function     updateNumber(localStorage.getItem("number"));

function random(n){
    // create an array
    ownedExpansions = [];
    for (var expansion in expansions){
        if (localStorage.getItem(expansion) == 'true'){
            ownedExpansions.push(expansion)
        }
    }
        // Source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
    //return an array with n elements
    return shuffle(ownedExpansions).slice(0,n);
}

//control the modal
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("openmodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    updateNumber(localStorage.getItem("number"));
  modal.style.display = "none";
}



