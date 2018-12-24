'use strict';

(function () {
  var PHOTO_WIDTH = '40';
  var PHOTO_HEIGHT = '40';

  var modalAdTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getHouseType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'palace':
        return 'Дворец';
      default:
        return 'Дом';
    }
  };

  var createNoticetOnMap = function (notice) {
    var noticeElement = modalAdTemplate.cloneNode(true);
    if (notice.offer) {
      noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
      noticeElement.querySelector('.popup__text--address').textContent = notice.offer.adress;
      noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price + ' ₽/ночь';
      noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
      noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
      noticeElement.querySelector('.popup__type').textContent = getHouseType(notice.offer.type);
      noticeElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
      noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

      var featuresList = noticeElement.querySelector('.popup__features');
      if (notice.offer.features.length) {
        featuresList.innerHTML = '';
        var featuresFragment = document.createDocumentFragment();
        for (var k = 0; k < notice.offer.features.length; k++) {
          var featureElement = document.createElement('li');

          featureElement.classList = 'popup__feature popup__feature--' + notice.offer.features[k];
          featuresFragment.appendChild(featureElement);
        }
        featuresList.appendChild(featuresFragment);
      } else {
        featuresList.remove();
      }

      var photosList = noticeElement.querySelector('.popup__photos');
      if (notice.offer.photos.length) {
        photosList.innerHTML = '';
        var photosFragment = document.createDocumentFragment();
        for (var j = 0; j < notice.offer.photos.length; j++) {
          var photoElement = document.createElement('img');
          photoElement.classList.add('.popup__photo');
          photoElement.src = notice.offer.photos[j];
          photoElement.width = PHOTO_WIDTH;
          photoElement.height = PHOTO_HEIGHT;
          photosFragment.appendChild(photoElement);
        }
        photosList.appendChild(photosFragment);
      } else {
        photosList.remove();
      }
    } else {
      noticeElement.remove();
    }

    return noticeElement;
  };

  window.card = {
    createNoticetOnMap: createNoticetOnMap
  };
})();
