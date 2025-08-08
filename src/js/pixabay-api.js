import axios from 'axios';

const API_KEY = '48865554-9c41d4f1cdb1a3126cd29aed3';
const api_URL = 'https://pixabay.com/api/';

export const searchImage = (searchValue, page = 1, per_page = 40) => {
  const url = `${api_URL}?key=${API_KEY}&q=${encodeURIComponent(
    searchValue
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
  console.log(page);
  return axios.get(url);
};
