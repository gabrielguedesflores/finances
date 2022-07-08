$(document).ready(function(){
  loading()
  binds()
  handler()
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

const binds = () => {
  $('.collapsible').collapsible();
  $(".button-collapse").sideNav();
  $(".button-collapse").css('margin', '5px');
}

const handler = () => {
  $('#btnLayoutGrid').on('click', () => {
    console.log('btnLayoutGrid');
    $('#list').hide('slow')
    $('#grid').show('slow')
  })

  $('#btnLayoutList').on('click', () => {
    console.log('btnLayoutList');
    $('#list').show('slow')
    $('#grid').hide('slow')
  })
}