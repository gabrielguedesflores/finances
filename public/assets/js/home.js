$(document).ready(function(){
  $('#main').hide()
  $('.progress').show()
  
  setTimeout(function(){
    $('#main').show()
    $('.progress').hide()
  }, 1000)

  $('.collapsible').collapsible();
  $(".button-collapse").sideNav();
  $(".button-collapse").css('margin', '5px');
  
});