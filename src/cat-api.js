import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_bMlXXLOTrCzT7g5hOJEbFPNm8lmDWioZHkPaXZF6FyihIY4KDwqCxTURkdh1KJTP';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(response => response.data);
}
