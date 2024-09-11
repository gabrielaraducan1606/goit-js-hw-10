import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_bMlXXLOTrCzT7g5hOJEbFPNm8lmDWioZHkPaXZF6FyihIY4KDwqCxTURkdh1KJTP';  // Adaugă cheia ta API

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];  
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
}
