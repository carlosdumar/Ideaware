$(document).ready(function() {
  $('#menu-button').on('click', function() {
    $('#menu').addClass('show-menu')
    $('#menu').removeClass('hide-menu')
  });

  $('#close-menu').on('click', function() {
    $('#menu').addClass('hide-menu')
    $('#menu').removeClass('show-menu')
  });
})
