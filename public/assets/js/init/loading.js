$(document).ready(function(){
  console.log('loading.js');
  if(localStorage.getItem('userid')){
    loading()
    return true
  }else{
    window.location.replace("/login");
    return false
  }
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
