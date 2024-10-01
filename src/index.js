import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function toggleLoader(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
}

function toggleError(hasError) {
    errorElement.classList.toggle('hidden', !hasError);
}

function toggleCatInfo(isVisible) {
    catInfo.classList.toggle('hidden', !isVisible);
}

fetchBreeds()
    .then(breeds => {
        breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
        new SlimSelect({ select: '.breed-select' });
    })
    .catch(() => {
        toggleError(true);
        Notiflix.Notify.failure('Failed to load breeds');
    });

breedSelect.addEventListener('change', (event) => {
    const breedId = event.target.value;
    if (!breedId) return;

    toggleLoader(true);
    toggleCatInfo(false);
    toggleError(false);

    fetchCatByBreed(breedId)
        .then(catData => {
            const { url, breeds } = catData[0];
            const { name, description, temperament } = breeds[0];

            catInfo.innerHTML = `
                <img src="${url}" alt="${name}" width="400">
                <h2>${name}</h2>
                <p>${description}</p>
                <p><strong>Temperament:</strong> ${temperament}</p>
            `;
            toggleCatInfo(true);
        })
        .catch(() => {
            toggleError(true);
            Notiflix.Notify.failure('Failed to load cat information');
        })
        .finally(() => {
            toggleLoader(false);
        });
});