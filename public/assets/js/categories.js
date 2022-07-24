$(document).ready(function(){
  initCategories(localStorage.getItem('userid'))
  binds()
  handlersCategories()
  calledMaterialize()
});

const url = `https://finance-control-fc-api.herokuapp.com/api`;

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

const getCategory = async(userid) => {
  try {
    const { data } = await axios.post(url + '/category', {
      userid: userid
    });
    return data
  } catch (error) {
    console.error(error);
  }
}

const binds = () => {
  
}

const calledMaterialize = () => {
  $('.modal').modal();
  $('.modal-trigger').modal();
  $('.tooltipped').tooltip({delay: 50});
}

const handlersCategories = () => {
  $('#buttonAddCategory').on('click', controllerCreateCategory)
}

const createCategory = async (data) => {
  try {
    const { insert } = await axios.post(url + '/category/create', {
      categorydesc: data.categorydesc,
      categorycolor: "'",
      userid: data.userid
    });
    location.reload();
    return insert
  } catch (error) {
    console.error(error);
  }
}

const controllerCreateCategory = async() => {
  console.log('controllerCreateCategory');
  if($('#addNewCategory')[0].value !== ''){
    try {
      const newCategory = {
        categorydesc: $('#addNewCategory')[0].value,
        categorycolor: "'",
        userid: localStorage.getItem('userid')
      }
      await createCategory(newCategory)
      console.log(newCategory)
      return true
    } catch (error) {
      console.error(error)
    }
  }
  toastNotifyError('Campo <b>Categoria</b> obrigatório')
}

const initCategories = async (userid) => {
  const categories = await getCategory(userid);
  if(categories){
    $('#total').show()
    $('#noCategories').hide()
    console.log(categories);
    for (let i = 0; i < categories.length; i++) {
      $('#tableCategories').find('tbody').append(buildCategories(categories[i]))
      $('#main').append(buildModaisCategories(categories[i]))
      $(`#modal${categories[i].categoryid}`).modal()   
      //$(`#buttonDeleteCategory${categories[i].categoryid}`).on('click', handlerDeleteCategory(`${categories[i].categoryid}`))
    }
  }else{
    $('#total').hide()
    $('#noCategories').show()
  }
}

const buildCategories = (categories) => {
  return `
  <tr>
    <td>${categories.categorydesc}</td>
    <td>
      <input type="hidden" id="categoryid" value="${categories.categoryid}">
      <a class="modal-trigger black-text" data-target="modal${categories.categoryid}" href="#modal${categories.categoryid}"><i class="material-icons">create</i></a>
    </td>
  </tr>`
}

const buildModaisCategories = (categories) => {
  return `
  <div id="modal${categories.categoryid}" class="modal">
    <div class="modal-content">
      <h2>
        <input type="text" id="categorydesc" value="${categories.categorydesc}">
      </h2>
    </div>
    <div class="modal-footer">
      <a href="#!" id="buttonDeleteCategory${categories.categoryid}" onclick="handlerDeleteCategory(${categories.categoryid})" class="waves-effect waves-red btn-flat">Excluir</a>
      <a href="#!" id="buttonSaveCategory${categories.categoryid}" onclick="handlerEditCategory(${categories.categoryid})" class="waves-effect waves-green btn-flat">Salvar</a>
    </div>
  </div>
  `
}

const handlerDeleteCategory = async(categoryid) => {
  try {
    const { data } = await axios.post(url + '/category/delete', {
      categoryid: categoryid
    });
    location.reload();
    return data
  } catch (error) {
    console.error(error);
    toastNotifyError("Existe despesa(s) vinculada a essa categoria.")
  }
}

const handlerEditCategory = async(categoryid) => {
  console.log('handlerEditCategory');
  try {
    const { data } = await axios.post(url + '/category/edit', {
      categorydesc: $(`#modal${categoryid}`).find('input')[0].value, 
      categoryid: categoryid
    });
    location.reload();
    return data
  } catch (error) {
    console.error(error);
  }
}