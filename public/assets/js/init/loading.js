$(document).ready(function(){
  loading();
});

const loading = () => {
  $('.progress').show()
  $('#main').hide()
  $('#footer').hide()

  setTimeout(function(){
    $('.progress').hide()
    $('#main').show()
    $('#footer').show()
  }, 1000)
}