import * as api from './js/pixabay-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.search-form');
let searchInputValue;
const per_page = 40;
let page = 1;

const loadPictures = async () => {
  try {
    render.showLoader();
    render.hideLoadMore();
    const response = await api.searchImage(searchInputValue, page, per_page);
    console.log(response);

    if (!response.data.hits.length) {
      render.showError(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
      return;
    }
    render.showGallery(response.data.hits);
    if (response.data.totalHits > page * per_page) {
      render.showLoadMore();
    } else {
      render.showMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    render.hideLoader();
  }
};

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  searchInputValue = event.target.elements.input.value.trim();

  if (!searchInputValue) {
    return render.showError('Please fill out this field');
  }
  render.clearGallery();
  page = 1;
  loadPictures();
});

document.querySelector('.load-more').addEventListener('click', async () => {
  page++;
  await loadPictures();
  const galleryItemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
});