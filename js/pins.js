'use strict';

(function () {
  var PIN_WIDTH = '50';
  var PIN_HEIGHT = '70';

  var PIN_AMOUNT = 5;

  var pinMapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinPlace = document.querySelector('.map__pins');

  var createPin = function (realtor) {
    var pinElement = pinMapTemplate.cloneNode(true);

    pinElement.querySelector('img').src = realtor.author.avatar;
    pinElement.querySelector('img').alt = realtor.offer.title;
    pinElement.style.left = realtor.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = realtor.location.y - PIN_HEIGHT + 'px';
    pinElement.setAttribute('data-index', realtor.index);
    pinElement.addEventListener('click', window.map.openPopup);

    return pinElement;
  };

  var renderPinsOnMap = function (pins) {
    var pinFragment = document.createDocumentFragment();
    var pinsCopy = pins.slice(0, PIN_AMOUNT);
    for (var i = 0; i < pinsCopy.length; i++) {
      pinFragment.appendChild(createPin(pins[i]));
    }

    pinPlace.appendChild(pinFragment);
  };

  var removePinsOnMap = function () {
    var pins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pinPlace.removeChild(pins[i]);
    }
  };

  window.pins = {
    renderPinsOnMap: renderPinsOnMap,
    removePinsOnMap: removePinsOnMap
  };
})();
