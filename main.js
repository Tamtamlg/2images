window.addEventListener('load', function loadFull() {
  'use strict';
  
  
    $.ajax({
      type: "GET",
      url: "https://kde.link/test/get_field_size.php",
      dataType: "json",
      success: function (data) {
        cleanField ();
        createField (data.width, data.height);
      }
    });
  
  
  $('.start').click(function() {
    $.ajax({
      type: "GET",
      url: "https://kde.link/test/get_field_size.php",
      dataType: "json",
      success: function (data) {
        cleanField ();
        createField (data.width, data.height);
      }
    });
  });
  
  var field = document.querySelector('.field');
  var start = document.querySelector('.start');
  
  function createField (width, height) { // создание игрового поля
    var size = {};
    size.width = width;
    size.height = height;
    var rows = [];
    var cells = [];
    var i;
    var j;
    for (i = 0; i < size.width; i++) {
      rows[i] = document.createElement('div');
      rows[i].classList.add('row');
      field.appendChild(rows[i]);
      for (j = 0; j < size.height; j++) {
      cells[j] = document.createElement('div');
      cells[j].classList.add('cell');
      cells[j].index = i + ',' + j; // координаты ячейки
      rows[i].appendChild(cells[j]);
      }
    }
  }
  
  function cleanField () { // очистка игрового поля
    var rows = document.querySelectorAll('.row');
    var i;
    if (rows.length != 0) {
      for (i = rows.length - 1; i >= 0; i--) {
        rows[i].remove();
      }
    }
  }
  
});