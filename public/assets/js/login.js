$(document).ready(function() {
  $('#btnLogin').on('click', controllerLogin)
  calledMaterialize()
})

const controllerLogin = async() => {
  const useremail = $('#email').val()
  const userpassword = $('#pass').val()

  const newLogin = {
    useremail: useremail,
    userpassword: userpassword
  }

  if(!useremail) {
    toastNotifyError('Campo <b>E-mail</b> é obrigatório')
  }  
  
  if(!userpassword) {
    toastNotifyError('Campo <b>Senha</b> é obrigatório')
  }

  console.log(newLogin);
}

function toastNotifyError (message){
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  toastr.error(message);
}

const calledMaterialize = () => {
  $('.modal').modal();
}
