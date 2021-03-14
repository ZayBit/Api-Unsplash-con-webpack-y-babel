import Photos from './api.unsplash';
import Masonry from './masonry';

import './main.scss'

function getPhotos(data) {
    return `
    <div class="item" style="background:${data.color}">
    <div class="thumbnail">
        <a href="${data.links.html}"><img src="${data.urls.small}" alt="${data.alt_description}"></a>
    </div>
    <div class="user-info">
        <ul>
        <li><i class="fas fa-hand-holding-heart"></i> ${data.likes}</li>
        <li><a href="${data.user.links.html}"><i class="fas fa-user"></i> ${data.user.first_name}</a></li>
        </ul>
    </div>
</div>`
}

function topicPhotos(data) {
    return `
    <div class="item-topic">
    <div class="thumbnail">
        <a href="${data.links.html}"><img src="${data.cover_photo.urls.thumb}" alt="${data.cover_photo.alt_description}"></a>
    </div>
    <div class="item-topic-info">
        <h3><a href="${data.links.html}">${data.title}</a></h3>
    </div>
</div>`
}

const container = document.querySelector('.container');

function indicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    const span = document.createElement('span');
    span.classList.add('load')
    indicator.appendChild(span)
    container.append(indicator)
}
(async function () {
    // visual loading icon
    indicator();
    const lastest_photos = await new Photos().getPhotos(),
          topic_photos = await new Photos().getPhotos('topics/', 5);

    lastest_photos.forEach(data => container.innerHTML += getPhotos(data));
    topic_photos.forEach(data=> document.querySelector('.topic-container').innerHTML += topicPhotos(data));

    new Masonry('.container', {
        itemName: '.item',
        itemMargin: 10
    })

    inputSearch.addEventListener('submit', async function (e) {
        e.preventDefault();
        let query = this.input_search.value.trim();
        if(query == '') return;
        container.innerHTML = '';
        indicator();
        const res_results = await new Photos().getPhotos('search/photos/', 0, query);
        res_results.results.forEach(data => container.innerHTML += getPhotos(data));
        new Masonry('.container', {
            itemName: '.item',
            itemMargin: 10
        })
    })

})()
