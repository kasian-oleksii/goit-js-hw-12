import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function createGallery(images) {
  const gallery = document.getElementById('gallery');

  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <div class="info-item">
              <b>Likes</b>${image.likes}
            </div>
            <div class="info-item">
              <b>Views</b>${image.views}
            </div>
            <div class="info-item">
              <b>Comments</b>${image.comments}
            </div>
            <div class="info-item">
              <b>Downloads</b>${image.downloads}
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}

export function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

export function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}

export function showLoadMoreButton() {
  document.getElementById('load-more').classList.remove('hidden');
}

export function hideLoadMoreButton() {
  document.getElementById('load-more').classList.add('hidden');
}
