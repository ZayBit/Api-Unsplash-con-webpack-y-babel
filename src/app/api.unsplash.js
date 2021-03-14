// https://unsplash.com/developers
const key = 'YOU API KEY';
class Photos{
    async getPhotos(name='photos/',limit=10,query){
        const res = await fetch(`https://api.unsplash.com/${(name.trim()== '')?'photos/':name}?client_id=${key}&per_page=${(limit == 0)?10:limit}${(query) ? '&query='+query : ''}`);
        const photos = await res.json();
        return photos;
    }
}
export default Photos;