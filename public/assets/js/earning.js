$(document).ready(function(){
  initEarning(localStorage.getItem('userid'))
  //$('#addNewEarning').on('click', controllerCreateCategory)
});

const url = `https://finance-control-fc-api.herokuapp.com/api`;

const getEarnings = async(userid) => {
  try {
    const { data } = await axios.post(url + '/earning', {
      userid: userid
    });
    return data //parseFloat(data[0].earningvalue.replace('R$ ', '').replace(',', '.'))
  } catch (error) {
    console.error(error);
  }
}

const initEarning = async (userid) => {
  const earning = await getEarnings(userid);

  if(earning){
    $('#earning').show()
    $('#noCategories').hide()
    console.log(earning);

    for (let i = 0; i < earning.length; i++) {
      $('#tableEarning').find('tbody').append(buildEarning(earning[i]))
      $('#main').append(buildModaisEarning(earning[i]))
      $(`#modal${earning[i].earningid}`).modal()   
      //$(`#buttonDeleteCategory${categories[i].categoryid}`).on('click', handlerDeleteCategory(`${categories[i].categoryid}`))
    }
  }else{
    $('#earning').hide()
    $('#noEarning').show()
  }
}

/** Builds */

const buildEarning = (earning) => {
  return `
  <tr>
    <td>${earning.earningdesc}</td>
    <td>${earning.earningvalue}</td>
    <td>
      <input type="hidden" id="earning" value="${earning.earningid}">
      <a class="modal-trigger black-text" data-target="modal${earning.earningid}" href="#modal${earning.earningid}"><i class="material-icons">create</i></a>
    </td>
  </tr>`
}

const buildModaisEarning = (earning) => {
  return `
  <div id="modal${earning.earningid}" class="modal">
    <div class="modal-content">

      <label class="labelParag">Descrição</label>
      <h2>
        <input type="text" id="earningdesc${earning.earningid}" value="${earning.earningdesc}">
      </h2>

      <label class="labelParag">Valor</label>
      <h2>
        <input type="text" id="earningvalue${earning.earningid}" value="${earning.earningvalue}">
      </h2>
    </div>
    <div class="modal-footer">
      <a href="#!" id="buttonDeleteEarning${earning.earningid}" onclick="handlerDeleteEarning(${earning.earningid})" class="waves-effect waves-red btn-flat">Excluir</a>
      <a href="#!" id="buttonSaveEarning${earning.earningid}" onclick="handlerEditEarning(${earning.earningid})" class="waves-effect waves-green btn-flat">Salvar</a>
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