// console.log('anything')
const baseUrl = 'http://localhost:3000/posts'
const artistSubmitForm = document.querySelector(".artistForm")
artistSubmitForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    // console.log('anything')
    let artistInput = document.querySelector("body > form > input[type=text]:nth-child(6)").value
    // let userInput = document.querySelector("body > form > input[type=text]:nth-child(2)").value
    // renderUserName(userInput)
    fixArtistInput(artistInput)
    artistSubmitForm.reset()
})
// function renderUserName(userInput){
    
// }
function fixArtistInput(word) {
    let fixedWord = "";
    let artistInput = word
    for (let i = 0; i < artistInput.length; i++) {
      if (artistInput[i] === ' '){
        fixedWord += '_';
      } else {
        fixedWord += artistInput[i];
      } }
      // console.log(fixedWord)
      fetchInformation(fixedWord)
}
function fetchInformation(fixedWord){
    fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${fixedWord}`)
   .then(resp => resp.json())
   .then(data => normalizeData(data)) 
}
function normalizeData(data){
        // console.log(data.artists)
        let artistCard = {
            name: data.artists[0].strArtist,
            genre: data.artists[0].strGenre,
            style: data.artists[0].strStyle,
            mood: data.artists[0].strMood,
            website: data.artists[0].strWebsite,
            image: data.artists[0].strArtistThumb,
            banner: data.artists[0].strArtistBanner
        }
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artistCard)
         })  .then(resp => resp.json())
            .then(data=> (data))
            .catch(error=> console.log(error))
}
function updateArtistPage (){
  fetch(baseUrl)
  .then(resp=>resp.json())
  .then(data=>  data.forEach(data2 =>renderPage(data2)))
}
function newFunction(data){
    console.log(data[data.length-1])
}
function renderPage(artistCard){
  console.log(artistCard)  
  createBanner(artistCard)
    renderCard(artistCard)
}
function renderCard(artistCard){
  const artistDiv = document.createElement('div')
  artistDiv.className = "artist-div"
  document.querySelector("body").append(artistDiv)
  const artistsCardDiv = document.createElement('div')
  artistsCardDiv.id = "artist-card"
  artistsCardDiv.className = "card"
  artistDiv.appendChild(artistsCardDiv)
  const nameSpan = document.createElement('span')
  nameSpan.textContent = artistCard.name
  const genreSpan = document.createElement('span')
  genreSpan.textContent =`Genre: ${artistCard.genre}`
  const styleSpan = document.createElement('span')
  styleSpan.textContent = `Style: ${artistCard.style}`
  styleSpan.addEventListener('click', (e)=>{
      styleSpan.style.color = 'magenta'
  })
  const moodSpan = document.createElement('span')
  moodSpan.textContent = `Mood: ${artistCard.mood}`
  moodSpan.addEventListener('mouseover', (e)=>{
      moodSpan.style.color = 'blue'
  })
  const websiteLink = document.createElement('a')
  websiteLink.innerHTML = `<a href= https://${artistCard.website}>link</a>`
  const artistImage = document.createElement('img')
  artistImage.src = artistCard.image
  artistDiv.append(artistsCardDiv)
  const artistReviewForm = document.createElement("form");
  artistReviewForm.id = "review-form";
  artistReviewForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      const newSpanForText = document.createElement('span')
      newSpanForText.textContent = e.target.querySelector("#content-input").value 
      newSpanForText.id = "review-text"
      newSpanForText.className = 'comments'
      artistReviewForm.append(newSpanForText)
    artistReviewForm.reset()
  });
  const contentInput = document.createElement("input");
  contentInput.type = "text";
  contentInput.id = "content-input";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.id = "submit";
  submit.value = "Create Comment";
  artistReviewForm.append(contentInput, submit)
  artistsCardDiv.append(nameSpan, artistImage, genreSpan, styleSpan, moodSpan, websiteLink,artistReviewForm)
}
function createBanner(artistCard){
    const artistBannerImg = document.createElement('img')
    artistBannerImg.src = artistCard.banner
    artistBannerImg.className = 'header'
    document.querySelector('h1#header').append(artistBannerImg)
}
updateArtistPage()

