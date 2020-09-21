const API_TOKEN="466dd8f81fa7b5ae74afa2b12f2d6cc2"

export function getFilmsFromApiWithSeachedText (text){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    return fetch(url)
    .then((Response)=> Response.json())
    .catch((error)=> console.log(error))
}