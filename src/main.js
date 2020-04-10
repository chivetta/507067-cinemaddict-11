// ОСНОВНЫЕ БЛОКИ

import {getTemplateOfUserStatistic} from "./components/user-statistic.js";
import {getTemplateOfMenu} from "./components/menu.js";
import {getTemplateOfFilter} from "./components/filter.js";
import {getTemplateOfMainContent} from "./components/main-content.js";

import {getTemplateOfFilmsList} from "./components/film-list.js";
import {getTemplateOfLoadButton} from "./components/load-button.js";
import {getTemplateOfRatedFilms} from "./components/rated-films.js";
import {getTemplateOfCommentedFilms} from "./components/commented-films.js";

import {getTemplateOfCardsContainer} from "./components/card-container.js";
import {getTemplateOfCard} from "./components/card.js";

import {getTemplateOfPopup} from "./components/popup.js";

// КОНСТАНТЫ

const NUMBER_OF_CARDS = 5;

// ФУНКЦИИ РЕНДЕРА

const renderElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderCards = (number, container) => {
  for (let i = 0; i < number; i++) {
    renderElement(container, getTemplateOfCard());
  }
};

// ОТРИСОВКА ОСНОВНЫХ БЛОКОВ

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

renderElement(header, getTemplateOfUserStatistic());

renderElement(main, getTemplateOfMenu());
renderElement(main, getTemplateOfFilter());
renderElement(main, getTemplateOfMainContent());

const blockOfFilms = main.querySelector(`.films`);

// ОСНОВНОЙ БЛОК ФИЛЬМОВ

renderElement(blockOfFilms, getTemplateOfFilmsList());

const filmsList = blockOfFilms.querySelector(`.films-list`);

renderElement(filmsList, getTemplateOfCardsContainer());

const cardsContainer = filmsList.querySelector(`.films-list__container`);

renderCards(NUMBER_OF_CARDS, cardsContainer);

renderElement(filmsList, getTemplateOfLoadButton());


// ЭКСТРА-БЛОКИ ФИЛЬМОВ

renderElement(blockOfFilms, getTemplateOfRatedFilms());
renderElement(blockOfFilms, getTemplateOfCommentedFilms());

const blocks = blockOfFilms.querySelectorAll(`.films-list--extra`);

for (const block of blocks) {
  renderElement(block, getTemplateOfCardsContainer());

  let blockOfCards = block.querySelector(`.films-list__container`);
  renderCards(blocks.length, blockOfCards);
}

// ПОПАП

renderElement(footer, getTemplateOfPopup(), `afterend`);

const popup = document.querySelector(`.film-details`);
const popupCloseButton = popup.querySelector(`.film-details__close-btn`);

// немного оживить интерфейс, чтобы было повеселее было =)

popupCloseButton.addEventListener(`click`, function () {
  popup.classList.add(`visually-hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    popup.classList.add(`visually-hidden`);
  }
});

const filmCards = document.querySelectorAll(`.film-card`);

for (const filmCard of filmCards) {
  filmCard.addEventListener(`click`, function () {
    popup.classList.remove(`visually-hidden`);
  });
}
