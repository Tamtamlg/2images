window.addEventListener('load', function loadFull() {
  'use strict';

  var field = document.querySelector('.field');
  var start = document.querySelector('.start');
  
  doRequest(); // создаем поле при загрузке страницы
  $('.start').click(doRequest); // создаем новое поле при нажатии кнопки "new game"
  
  function doRequest() {
    $.ajax({
      type: "GET",
      url: "https://kde.link/test/get_field_size.php",
      dataType: "json",
      success: function(data) {
        cleanField();
        createField(data.width, data.height);
        getImgArr(data.width, data.height);
        hoverCell();
      }
    });
  };
  
  
  function createField(width, height) { // создание игрового поля
    var rows = [];
    var cells = [];
    var i;
    var j;
    for (i = 0; i < width; i++) {
      rows[i] = document.createElement('div');
      rows[i].classList.add('row');
      field.appendChild(rows[i]);
      for (j = 0; j < height; j++) {
      cells[j] = document.createElement('div');
      cells[j].classList.add('cell');
      cells[j].index = i + ',' + j; // координаты ячейки
      rows[i].appendChild(cells[j]);
      }
    }
  }
  
  function cleanField() { // очистка игрового поля
    var rows = document.querySelectorAll('.row');
    var i;
    if (rows.length != 0) {
      for (i = rows.length - 1; i >= 0; i--) {
        rows[i].remove();
      }
    }
  }
  
  function getImgArr(width, height) { // получаем массив картинок
    var images = [];
    var cells = document.querySelectorAll('.cell');
    var i;
    var j;
    var l;
    for (i = 0; i < (width * height) / 2; i++) {
      if(i < 10) {
        images[i] = 'https://kde.link/test/' + i + '.png';
      } 
      if(i >= 10 && i < 20) {
        images[i] = 'https://kde.link/test/' + (i - 10) + '.png';
      }
      if(i >= 20 && i < 30) {
        images[i] = 'https://kde.link/test/' + (i - 20) + '.png';
      }
      if(i >= 30 && i < 40) {
        images[i] = 'https://kde.link/test/' + (i - 30) + '.png';
      }
    }
    var images2 = images.concat(images, images); // дублируем картинки в массиве
    for (j = 0; j < cells.length; j++) { // заполняем картинки
      cells[j].style.backgroundImage = 'url' +'(' + images2[j] + ')';
    }
  }
  
  function hoverCell() {
    var i;
    var cells = document.querySelectorAll('.cell');
    for (i = 0; i < cells.length; i++) {
      cells[i].classList.add('hover-cell');
    }
  }
  
  field.addEventListener('click', function getElem(e) {
    if ( e.target.index ) {
      e.target.classList.remove('hover-cell');
    }
  });
  
});