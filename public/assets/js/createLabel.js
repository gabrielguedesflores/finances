$(document).ready(function(){
  setTimeout(async function(){
    initLabel(localStorage.getItem('userid'))
  }, 2000)
  $('#btnSaveLabel').on('click', controllerCreateLabel)
});

const initLabel = async(userid) => {
  $('#loadingLabel').show()
  const label = await getLabel(userid)
  const category = await getCategory(userid)

  for (let i = 0; i < label.length; i++) {
    $('.collapsible').append(buildLabel(label[i]))
    $('#main').append(await buildModal(label[i]))
    $(`#modal${label[i].labelid}`).modal()    
  }

  for (let index = 0; index < category.length; index++) {
    $('.categoryRadioButton').append(buildCategory(category[index]), index)
  }
  
  $('#loadingLabel').hide()
}

const controllerCreateLabel = async() => {
  console.log('Creating label');
  const newLabel = {
		"labeltitle": $('#createModal').find('input')[0].value,
		"labeldesc": $('#createModal').find('textarea')[0].value,
		"labelpaid": returnPaid(),
		"labeldate": moment().format('YYYY-MM-DD'),
		"labelvalue": $('#createModal').find('input')[5].value,
		"userid": localStorage.getItem('userid'),
    "labelcategoryid": returnCategoryLabel()
	}
  await createLabel(newLabel)
  console.log(newLabel);
  return true
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
        <input id="labelid" type="text" value="${label.labelid}">
      </div>
      <div class="modal-content">
        <p class="labelParag">Título: </p>
        <h2>
          <div class="row col s12">
            <div class="input-field">
              <h2>
                <input id="labeltitle" type="text" class="validate" value="${label.labeltitle}">
              </h2>
            </div>
          </div> 
        </h2>
        <div class="divider"></div><br>
        <div class="row col s12">
          <div class="input-field">
            <p class="labelParag">Descrição: </p>
            <textarea id="labeldesc" class="materialize-textarea">${label.labeldesc}</textarea>
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
          <p class="categoryRadioButton"></p>
        </div>
        <div class="divider"></div><br>
        <div class="row">
          <div class="input-field col s6">
            <p class="labelParag">Valor:</p>
            <input id="labelvalue" type="text" class="validate" value="${label.labelvalue}">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Sair</a>
        <a class="waves-effect waves-green btn-flat" id="btnSaveLabel">Salvar</a>
      </div>
    </form>
  </div>  
  `
}

const buildCategory = (categories, label) => {
  return `
  <div class="chip black-text col s3" style="text-align: center;">
    <input class="with-gap" name="categories_${label}" class="red" type="radio" id="categoryid${categories.categoryid}_labelid${label}" />
    <label for="categoryid${categories.categoryid}_labelid${label}" class="black-text">${categories.categorydesc}</label>
  </div>`}



const returnPaid = () => {
  const isPaidName = $('#createLabelPaid').find('div')[0].className
  return isPaidName.includes('teal') ? true : false
}

const returnCategoryLabel = () => {
  for (let i = 0; i < $('input[name=createCategoryLabel]').length; i++) {
    if($('input[name=createCategoryLabel]')[i].checked) {
      return $('input[name=createCategoryLabel]')[i].id;
    }
  }
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
