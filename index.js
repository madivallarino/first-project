fetch('https://www.theaudiodb.com/api/v1/json/1/search.php?s=daft_punk')
.then(resp => resp.json())
.then(data => {postAlbum(data)}) //returns an object 

function postAlbum(object){
    console.log(object)
}


function userInput()
{
  let a = "boot camp"
let text = []; 
let newLetter = [];
let newWord = [];


for (let i = 0; i < a.length; i++) {
  if (a[i] === ' '){
    newLetter += '_';
    newWord += newLetter;
  } else {
    newWord += a[i];
  }
}
console.log(newWord);}





