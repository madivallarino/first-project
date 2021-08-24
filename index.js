document.querySelector("#create-task-form").addEventListener('submit', (e) => {
  e.preventDefault();
  let a = document.querySelector("#new-zip-input-box").value
  forLoop(a)
  console.log(a)
  // fetchInformation(newWord)
})
 
function forLoop(word){
    let newWord = "";
  let newLetter = [];
  let a = word
    for (let i = 0; i < a.length; i++) {
      if (a[i] === ' '){
        newLetter += '_';
        newWord += newLetter;
      } else {
        newWord += a[i];
      } }
      return newWord 
    }

    function fetchInformation(newWord){
    fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${newWord}`)
   .then(resp => resp.json())
   .then(data => console.log(data)) 
    }