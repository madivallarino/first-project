
document.querySelector("#create-task-form").addEventListener('submit', (e) =>  {
  e.preventDefault();
  userInput()
})
///newInput to be a global variable to allow fetch to use the information
let newInput = [];

function userInput()
{ let a = document.querySelector("#new-zip-input-box").value //querySelector //bootcamp will need to be changed to querySelector the user input value
let newLetter = [];
for (let i = 0; i < a.length; i++) {
  if (a[i] === ' '){
    newLetter += '_';
    newInput += newLetter;
  } else {
    newInput += a[i];
  }}
 return newInput
}
fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${newInput}`)
.then(resp => resp.json())
.then(data => {postAlbum(data)}) //returns an object 

function postAlbum(object){
    console.log(object)
}








