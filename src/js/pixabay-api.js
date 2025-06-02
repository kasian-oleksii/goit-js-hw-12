import axios from 'axios';

const API_KEY = '50384858-0b7fb3bc045111b4da7b5b4d8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
}
