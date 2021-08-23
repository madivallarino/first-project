fetch('https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay/')
.then(resp => resp.json())
.then(data => console.log(data))


// function normalizeData(data){
//     console.log(data)
//     const dataInfo = {
//         name : "",
//         population : "",
        
//     }
// }