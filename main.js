window.addEventListener('load', function loadFull() {
  'use strict';

  var field = document.querySelector('.field');
  var start = document.querySelector('.start');
  
  doRequest();
  $('.start').click(doRequest);
  
  function doRequest() { //получаем данные и создаем игровое поле
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
    var images2 = images.concat(images, images); // дублируем картинки в массиве, чтобы гарантировано получить пары
    for (j = 0; j < cells.length; j++) { // заполняем картинки
      cells[j].style.backgroundImage = 'url' +'(' + images2[j] + ')';
    }
  }
  
  function hoverCell() { // скрываем картинки
    var i;
    var cells = document.querySelectorAll('.cell');
    for (i = 0; i < cells.length; i++) {
      cells[i].classList.add('hover-cell');
    }
  }
  
  function classActive(e) {
    if (e.target.index && !e.target.classList.contains('active-always')) {
        e.target.classList.remove('hover-cell');
        e.target.classList.add('active');
      }
  }
  
  function classActiveAlways(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      arr[i].classList.remove('active');
      arr[i].classList.add('active-always');
    }
  }
  
  function classHover(arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
      arr[i].classList.remove('active');
      arr[i].classList.add('hover-cell');
    }
  }
  
  field.addEventListener('click', function openImages(e) { // открываем картинки
    var counter = 0;
    var active = [];
    var i;
    var itemStile1;
    var itemStile2;
    
    classActive(e);
    
    active = document.querySelectorAll('.active');
    if(active.length == 2) {
      itemStile1 = active[0].getAttribute('style');
      itemStile2 = active[1].getAttribute('style');

      if(itemStile1 == itemStile2) {
        classActiveAlways(active);
      } else {
        classHover(active);
      }
    }
  });
  
});