$(document).ready(function(){
  const idUser = localStorage.getItem('userid')

  categoriesInit(idUser)
  setTimeout(async function(){
    initLabel(idUser)
  }, 2000)
  $('#btnSaveLabel').on('click', controllerCreateLabel)
});

const initLabel = async(userid) => {
  $('#loadingLabel').show()
  try {
    const label = await getLabel(userid)
    const category = await getCategory(userid)
    console.log(label.length);
    for (let i = 0; i < label.length; i++) {
      $('.collapsible').append(buildLabel(label[i]))
      $('#main').append(await buildModal(label[i]))
      $(`#modal${label[i].labelid}`).modal()   
      for (let index = 0; index < category.length; index++) {
        $(`.categoryRadioButton${label[i].labelid}`).append(buildCategory(category[index], label[i]))
      }
    }
    $('#loadingLabel').hide()

  } catch (error) {
    $('.collapsible').append(`
    <blockquote>
      Você não tem categorias cadastradas...
    </blockquote>`)
    $('#loadingLabel').hide()
  }

}

const controllerCreateLabel = async() => {
  const labeltitle = $('#createModal').find('input')[0].value
  const labeldesc = $('#createModal').find('textarea')[0].value
  const labelpaid = returnPaidModalNew()
  const labeldate = moment().format('YYYY-MM-DD')
  const labelvalue = $('#labelvalue').val()
  const userid = localStorage.getItem('userid')
  const labelcategoryid = parseInt(returnCategoryLabel())
  console.log(labelcategoryid);

  if(labeltitle == ''){
    toastNotifyError('Campo <b>Título</b> é obrigatório.')
    return false
  }

  if(labeldesc == ''){
    toastNotifyError('Campo <b>Descrição</b> é obrigatório.')
    return false
  }

  if(labelvalue == ''){
    toastNotifyError('Campo <b>Valor</b> é obrigatório.')
    return false
  }

  const newLabel = {
		"labeltitle": labeltitle,
		"labeldesc": labeldesc,
		"labelpaid": labelpaid,
		"labeldate": labeldate,
		"labelvalue": labelvalue,
		"userid": userid,
    "labelcategoryid": labelcategoryid
	}
  await createLabel(newLabel)
  console.log(newLabel);
  return true
}

const controllerEditLabel = (labelid) => {
  const labeltitle = $(`#labeltitle${labelid}`).val()
  const labeldesc = $(`#labeldesc${labelid}`).val()
  const labelpaid = returnPaid(labelid)
  const labeldate = moment().format('YYYY-MM-DD')
  const labelvalue = $(`#labelvalue${labelid}`).val()
  const userid = localStorage.getItem('userid')
  const labelcategoryid = returnCategoryModal(labelid)

  if(labeltitle == ''){
    toastNotifyError('Campo <b>Título</b> é obrigatório.')
  }

  if(labeldesc == ''){
    toastNotifyError('Campo <b>Descrição</b> é obrigatório.')
  }

  if(labelvalue == ''){
    toastNotifyError('Campo <b>Valor</b> é obrigatório.')
  }
  
  const newLabel = {
    "labeltitle": labeltitle,
    "labeldesc": labeldesc,
    "labelpaid": labelpaid,
    "labeldate": labeldate,
    "labelvalue": labelvalue,
    "userid": userid,
    "labelcategoryid": labelcategoryid
  }
  console.log(newLabel);
}


/* Requests */

const url = `https://finance-control-fc-api.herokuapp.com/api`

const getLabel = async(userid) => {
  try {
    const { data } = await axios.post(url + '/label', {
      userid: userid
    });
    return data
  } catch (error) {
    console.error(error);
  }
}

const createLabel = async(data) => {
  try {
    const { insert } = await axios.post(url + '/label/create', {
      labeltitle: data.labeltitle,
      labeldesc: data.labeldesc,
      labelpaid: data.labelpaid,
      labeldate: data.labeldate,
      labelvalue: data.labelvalue,
      userid: data.userid,
      categoryid: data.categoryid,
    });
    location.reload();
    return insert
  } catch (error) {
    console.error(error);
  }
}

const deleteLabel = async(labelid) => {
  try {
    const { data } = await axios.post(url + '/label/delete', {
      labelid: labelid
    });
    location.reload();
    return data
  } catch (error) {
    console.error(error);
  }
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




/* Builds */

const buildLabel = (label) => {
  const labelpaidAux = label.labelpaid == true ? 'teal white-text' : 'black-text'
  return `
    <li>
      <div style="display: none;" id="hidden">
        <input type="text" id="labelid" value="${label.labelid}">
      </div>
      <div class="collapsible-header">
        ${label.labeltitle}
        <div class="chip ${labelpaidAux}  col s3" style="text-align: center;">Paga</div>
      </div>
      <div class="collapsible-body">
        <span>R$ ${label.labelvalue}</span>
        <a class="waves-effect waves-light modal-trigger black-text" data-target="modal${label.labelid}" href="#modal${label.labelid}" style="float: right;"><i class="material-icons">create</i></a>
      </div>
    </li>`
}

const buildModal = async(label) => {
  const labelpaidAux = label.labelpaid == true ? 'teal white-text' : 'black-text'
  return `
  <div id="modal${label.labelid}" class="modal">
    <form>
      <div class="input-field" style="display: none;">
        <input id="labelid${label.labelid}" type="text" value="${label.labelid}">
      </div>
      <div class="modal-content">
        <p class="labelParag">Título: </p>
        <h2>
          <div class="row col s12">
            <div class="input-field">
              <h2>
                <input id="labeltitle${label.labelid}" type="text" class="validate" value="${label.labeltitle}">
              </h2>
            </div>
          </div> 
        </h2>
        <div class="divider"></div><br>
        <div class="row col s12">
          <div class="input-field">
            <p class="labelParag">Descrição: </p>
            <textarea id="labeldesc${label.labelid}" class="materialize-textarea">${label.labeldesc}</textarea>
          </div>
        </div>
        <div class="divider"></div><br>
        <a href="#!" onclick="handleLabelPaid('labelpaid${label.labelid}')" id="labelpaid${label.labelid}">
          <div class="chip ${labelpaidAux}">
            Paga
          </div>
        </a>
        <br /><br />
        <div class="divider"></div><br>
        <div class="" action="#">
          <p class="labelParag">Categorias:</p>
          <p class="categoryRadioButton${label.labelid}"></p>
        </div>
        <div class="divider"></div><br>
        <div class="row">
          <div class="input-field col s6">
            <p class="labelParag">Valor:</p>
            <input id="labelvalue${label.labelid}" type="text" class="validate" value="${label.labelvalue}">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Sair</a>
        <a class="waves-effect waves-green btn-flat" onclick="deleteLabel(${label.labelid})" style="color: red;">Excluir</a>
        <a class="waves-effect waves-green btn-flat" onclick="controllerEditLabel(${label.labelid})" style="color: green;">Salvar</a>
      </div>
    </form>
  </div>  
  `
}

const buildCategory = (categories, label) => {
  return `
  <div class="chip black-text col s3" style="text-align: center;">
    <input class="with-gap red" name="categories_${label.labelid}" type="radio" id="categoryid${categories.categoryid}_labelid${label.labelid}" />
    <label for="categoryid${categories.categoryid}_labelid${label.labelid}" class="black-text">${categories.categorydesc}</label>
  </div>`
}


const returnCategoryModal = (labelid) => {
  let category;
  for (let i = 0; i < $(`input[name=categories_${labelid}]`).length; i++) {
    if($(`input[name=categories_${labelid}]`)[i].checked) {
      category = $(`input[name=categories_${labelid}]`)[i].id;
    }
  }
  console.log(category);
  if(category == undefined){
    toastNotifyError('O campo <b>Categorias</b> é obrigatório. Caso você não possua nenhuma cadastrada, vá até o menu Categorias!')
    return false;
  }
  category = category.slice(0, category.indexOf('_'))
  return category.replace(/[^0-9]/g,'')
}

const returnPaid = (labelid) => {
  const isPaidName = $(`#labelpaid${labelid}`).find('div')[0].className
  return isPaidName.includes('teal') ? true : false
}

const returnPaidModalNew = () => {
  const isPaidName = $(`#createLabelPaid`).find('div')[0].className
  return isPaidName.includes('teal') ? true : false
}

const returnCategoryLabel = () => {
  let category;
  for (let i = 0; i < $('input[name=categories_New]').length; i++) {
    if($('input[name=categories_New]')[i].checked) {
      category = $('input[name=categories_New]')[i].id;
    }
  }
  if(category == undefined){
    toastNotifyError('O campo <b>Categorias</b> é obrigatório. Caso você não possua nenhuma cadastrada, vá até o menu Categorias!')
    return false;
  }
  category = category.slice(0, category.indexOf('_'))
  return category.replace(/[^0-9]/g,'')
}

const handleLabelPaid = (element) => {
  const isPaidName = $(`#${element}`).find('div')[0].className
  if(isPaidName.includes('teal')){
    $(`#${element}`).find('div').eq(0).removeClass('teal')
    $(`#${element}`).find('div').eq(0).removeClass('white-text')
    $(`#${element}`).find('div').eq(0).addClass('black-text')
  }else{
    $(`#${element}`).find('div').eq(0).removeClass('black-text')
    $(`#${element}`).find('div').eq(0).addClass('teal')
    $(`#${element}`).find('div').eq(0).addClass('white-text')
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

const categoriesInit = async (userid) => {
  try {
    const categories = await getCategory (userid);
    const labelAux = {
      labelid: 'New'
    }
    for (let i = 0; i < categories.length; i++) {
      $('.newLabelCategory').append(buildCategory(categories[i], labelAux))
    }
  } catch (error) {
    $('.newLabelCategory').append(`
      <blockquote>
        Você não tem categorias cadastradas... <a href="/categorias">Criar</a>
      </blockquote>
    `)
  }
}