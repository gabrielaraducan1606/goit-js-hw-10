import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breed-select');
    const loader = document.querySelector('.loader');
    const errorElement = document.querySelector('.error');
    const catInfo = document.querySelector('.cat-info');
    const catImage = document.getElementById('cat-image');
    const catName = document.getElementById('cat-name');
    const catDescription = document.getElementById('cat-description');
    const catTemperament = document.getElementById('cat-temperament');

    // Funcția pentru a popula lista de rase
    function populateBreeds() {
        showLoader(true);
        fetchBreeds()
            .then(breeds => {
                breeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed.id;
                    option.textContent = breed.name;
                    breedSelect.appendChild(option);
                });
                showLoader(false);
                breedSelect.style.display = 'block';
            })
            .catch(() => {
                showError(true);
                showLoader(false);
            });
    }

    // Funcția pentru a afișa informațiile despre pisică
    function showCatInfo(breedId) {
        showLoader(true);
        fetchCatByBreed(breedId)
            .then(catData => {
                catImage.src = catData.url;
                catName.textContent = catData.breeds[0].name;
                catDescription.textContent = catData.breeds[0].description;
                catTemperament.textContent = catData.breeds[0].temperament;
                showLoader(false);
                catInfo.style.display = 'block';
            })
            .catch(() => {
                showError(true);
                showLoader(false);
            });
    }

    // Gestionarea schimbării în selectul de rase
    breedSelect.addEventListener('change', () => {
        const breedId = breedSelect.value;
        if (breedId) {
            catInfo.style.display = 'none';
            showCatInfo(breedId);
        }
    });

    // Funcție pentru a afișa sau ascunde loaderul
    function showLoader(isVisible) {
        loader.style.display = isVisible ? 'block' : 'none';
    }

    // Funcție pentru a afișa sau ascunde mesajul de eroare
    function showError(isVisible) {
        errorElement.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            Notiflix.Notify.failure('An error occurred while fetching data.');
        }
    }

    // Inițializare aplicație
    populateBreeds();
});