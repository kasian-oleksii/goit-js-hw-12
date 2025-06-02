import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found. Please try another query.',
      });
      return;
    }

    createGallery(data.hits);
    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images.`,
    });

    if (totalHits > 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});
