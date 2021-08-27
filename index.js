
const postUrl = 'http://localhost:3000/posts'
const commentUrl = 'http://localhost:3000/comments'

const artistSubmitForm = document.querySelector(".artistForm")
artistSubmitForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    let artistInput = document.querySelector("body > form > input[type=text]:nth-child(6)").value
    fixArtistInput(artistInput)
    artistSubmitForm.reset()
})
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
  let userInput = document.querySelector("body > form > input[type=text]:nth-child(2)").value
    fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${fixedWord}`)
   .then(resp => resp.json())
   .then(data => normalizeData(data, userInput)) 
}
function normalizeData(data, userInput){
        let artistCard = {
            name: data.artists[0].strArtist,
            genre: data.artists[0].strGenre,
            style: data.artists[0].strStyle,
            mood: data.artists[0].strMood,
            website: data.artists[0].strWebsite,
            image: data.artists[0].strArtistThumb,
            banner: data.artists[0].strArtistBanner,
            username: userInput
          
        }
        fetch(postUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artistCard)
         })  .then(resp => resp.json())
            .then(data=> (data))
            .catch(error=> console.log(error))

            renderCard(artistCard)
}
function renderCard(artistCard){
//makes the banner
const artistBannerImg = document.createElement('img')
    artistBannerImg.src = artistCard.banner
    artistBannerImg.className = 'header'
    document.querySelector('h2#header').append(artistBannerImg)
  //makes the card
  const artistDiv = document.createElement('div')
  artistDiv.className = "artist-div"
  document.querySelector("body").append(artistDiv)
  const artistsCardDiv = document.createElement('div')
  artistsCardDiv.id = "artist-card"
  artistsCardDiv.className = "card"
  artistDiv.appendChild(artistsCardDiv)


  //created and added dynamic colors to all span tags
const userSpan = document.createElement('span')
userSpan.textContent = artistCard.username + `'s favorite artist:`
userSpan.addEventListener('mouseover', (e)=>{
  userSpan.style.color = 'crimson'
})

  const nameSpan = document.createElement('span')
  nameSpan.textContent = artistCard.name
  nameSpan.addEventListener('mouseover', (e)=>{
    nameSpan.style.color = 'purple'
})
  const genreSpan = document.createElement('span')
  genreSpan.textContent =`Genre: ${artistCard.genre}`
  genreSpan.addEventListener('mouseover', (e)=>{
    genreSpan.style.color = 'crimson'
})
  const styleSpan = document.createElement('span')
  styleSpan.textContent = `Style: ${artistCard.style}`
  styleSpan.addEventListener('mouseover', (e)=> {
      styleSpan.style.color = 'purple'
  })
  const moodSpan = document.createElement('span')
  moodSpan.textContent = `Mood: ${artistCard.mood}`
  moodSpan.addEventListener('mouseover', (e)=>{
      moodSpan.style.color = 'crimson'
  })
  

//adding webstie link & image
  const websiteLink = document.createElement('a')
  websiteLink.innerHTML = `<a href= https://${artistCard.website}>link</a>`
  const artistImage = document.createElement('img')
  artistImage.src = artistCard.image
  artistDiv.append(artistsCardDiv)

//comment section
  const artistReviewForm = document.createElement("form");
  artistReviewForm.id = "review-form";
  artistReviewForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    renderComments(e)
    artistReviewForm.reset()
  })

  const contentInput = document.createElement("input");
  contentInput.type = "text";
  contentInput.id = "content-input";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.id = "submit";
  submit.value = "Create Comment";


 const deleteButton = document.createElement('button')
 deleteButton.innerText = 'X'
 deleteButton.addEventListener('click', () => deleteCard(artistDiv, artistBannerImg, artistCard))


  //appending 
  artistReviewForm.append(contentInput, submit)
  artistsCardDiv.append(userSpan, nameSpan, artistImage, genreSpan, styleSpan, moodSpan, websiteLink,artistReviewForm, deleteButton)
 
}

function deleteCard(artistDiv, artistBannerImg, artistCard){
  fetch(`${postUrl}/${artistCard.id}`, {
    method: 'DELETE',
  })
.then(resp => resp.json())
.then(artistDiv.remove())
.then(artistBannerImg.remove())
}

function updateMusicPage (){
  fetch(postUrl)
  .then(resp=>resp.json())
  .then(data=>  data.forEach(data2 =>renderCard(data2)))

  // fetch(commentUrl)
  // .then(resp => resp.json())
  // .then(data => ))
}

function renderComments(e){
  const newSpanForText = document.createElement('li')
  newSpanForText.textContent = e.target.querySelector("#content-input").value 
  newSpanForText.id = "review-text"
  newSpanForText.className = 'comments'
  document.querySelector('#user-comments').append(newSpanForText)
}


updateMusicPage()



function postComments(e){
  
 const userComment =  {comments : e.target.querySelector("#content-input").value }

  fetch(commentUrl, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userComment),
  })
.then(resp => resp.json())
.then(data=> renderComments(data))

// renderComments()
}


