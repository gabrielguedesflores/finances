$(document).ready(function() {
  localStorage.removeItem('userid')
  $('#btnLogin').on('click', controllerLogin)
  $('#btnCreateUser').on('click', controllerCreateUser)
  calledMaterialize()
})

const url = `https://finance-control-fc-api.herokuapp.com/api`

const createUser = async(user) => {
  try {
    const { data } = await axios.post(url + '/user/create', {
      username: user.username,
      useremail: user.useremail, 
      userpassword: user.userpassword,
    });
    return data
  } catch (error) {
    console.error(error);
    return false;
  }
}

const loginUser = async(user) => {
  try {
    const { data } = await axios.post(url + '/user/login', {
      useremail: user.useremail, 
      userpassword: user.userpassword,
    });
    return data
  } catch (error) {
    console.error(error);
    toastNotifyError('Usuário não encontrado!')
    return false;
  }
}

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

  const data = await loginUser(newLogin)
  localStorage.setItem('userid', data[0].userid)
  window.location.replace("/");
}

const controllerCreateUser = async () => {
  const username = $('#username').val()
  const useremail = $('#useremail').val()
  const userpassword = $('#userpassword').val()

  if(!username) {
    toastNotifyError('Campo <b>Nome</b> é obrigatório')
    return false
  }  

  if(!useremail) {
    toastNotifyError('Campo <b>E-mail</b> é obrigatório')
    return false
  }  
  
  if(!userpassword) {
    toastNotifyError('Campo <b>Senha</b> é obrigatório')
    return false
  }

  const newUser = {
    username: username,
    useremail: useremail, 
    userpassword: userpassword,
  }
  

  const data = await createUser(newUser)
  localStorage.setItem('userid', data[0].userid)
  window.location.replace("/");
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
