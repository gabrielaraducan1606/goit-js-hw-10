import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const breedSelect = document.querySelector('#breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showError(message) {
  Notiflix.Notify.failure(message);
  error.classList.remove('hidden');
  hideLoader();
}

function hideError() {
  error.classList.add('hidden');
}

async function init() {
  try {
    showLoader(); 
    hideError(); 
    breedSelect.classList.add('hidden'); 
    const breeds = await fetchBreeds(); 
    populateBreedSelect(breeds); 
    breedSelect.classList.remove('hidden');
  } catch (err) {
    showError('Failed to load breeds.');
  } finally {
    hideLoader();
  }
}


function populateBreedSelect(breeds) {
  const options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  breedSelect.innerHTML = options;
}


breedSelect.addEventListener('change', async (event) => {
  const breedId = event.target.value;
  if (!breedId) return;

  showLoader(); 
  catInfo.classList.add('hidden'); 
  hideError();

  try {
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData); 
  } catch (err) {
    showError('Failed to load cat details.');
  } finally {
    hideLoader(); 
  }
});


function displayCatInfo(catData) {
  const { url, breeds } = catData;
  const breed = breeds[0]; 
  catInfo.innerHTML = `
    <img src="${url}" alt="${breed.name}" width="400">
    <h2>${breed.name}</h2>
    <p><strong>Descriere:</strong> ${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
  `;
  catInfo.classList.remove('hidden'); 
}
init();
