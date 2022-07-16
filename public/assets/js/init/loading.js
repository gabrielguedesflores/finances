$(document).ready(function(){
  login()
  loading()
});

const loading = () => {
  $('#spinnerInit').show()
  $('#main').hide()
  $('#footer').hide()

  setTimeout(function(){
    $('#spinnerInit').hide()
    $('#main').show()
    $('#footer').show()
  }, 1000)
}

const login = () => {
  localStorage.setItem('userid', '1')
}