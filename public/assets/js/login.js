$(document).ready(function() {
  $('#btnLogin').on('click', controllerLogin)
  $('#btnCreateUser').on('click', controllerCreateUser)
  calledMaterialize()
  localStorage.removeItem('userid')
})

const url = `https://finance-control-fc-api.herokuapp.com/api`

const createUser = async(data) => {
  try {
    const { insert } = await axios.post(url + '/user/create', {
      username: data.username,
      useremail: data.useremail, 
      userpassword: data.userpassword,
    });
    console.log(insert);
    return true
  } catch (error) {
    console.error(error);
    return false;
  }
}

const loginUser = async(data) => {
  try {
    const { user } = await axios.post(url + '/user/login', {
      useremail: data.useremail, 
      userpassword: data.userpassword,
    });
    console.log(user);
    return user
  } catch (error) {
    console.error(error);
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

  console.log(newLogin);
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

  const loginUser = {
    useremail: useremail, 
    userpassword: userpassword,
  }
  
  try {
    await createUser(newUser);
    const data = await loginUser(loginUser)
    console.log(data);
    localStorage.setItem('userid', user.userid)
  } catch (error) {
    console.error(error)
  }
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
