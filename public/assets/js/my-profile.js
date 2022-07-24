$(document).ready(function(){
  initProfile(localStorage.getItem('userid'))
  $('#buttonSubmit').on('click', saveUser)
});

const url = `https://finance-control-fc-api.herokuapp.com/api`

const getUser = async (userid) => {
  try {
    const { data } = await axios.post(url + '/user', {
      userid: userid
    });
    return data
  } catch (error) {
    console.error(error);
  }
}

const editUser = async (data) => {
  try {
    const { update } = await axios.post(url + '/user/edit', {
      "username": data.username,
      "useremail": data.useremail,
      "userpassword": data.userpassword,
      "userimage": data.userimage,
      "userid": data.userid
    });
    return update
  } catch (error) {
    console.error(error);
  }
}

const initProfile = async(userid) => {
  try {
    const data = await getUser(userid);
    console.log(data);
    fillFields(data[0])
    return data
  } catch (error) {
    console.error(error)
  }
}

const fillFields = (data) => {
  $('#userid').val(data.userid)
  $('#username').val(data.username)
  $('#useremail').val(data.useremail)
  $('#userpassword').val(data.userpassword)
  $('#userimage').append(`<img class="circle" src="${data.userimage}">`)
}

const saveUser = async() => {
  const userid = $('#userid').val()
  const username = $('#username').val()
  const useremail = $('#useremail').val()
  const userpassword = $('#userpassword').val()
  const userimage = $('#userimage').val()

  const userEdit = {
    "username": username,
    "useremail": useremail,
    "userpassword": userpassword,
    "userimage": userimage,
    "userid": userid
  }

  console.log(userEdit);
  // await editUser(userEdit)
  // location.reload();
}