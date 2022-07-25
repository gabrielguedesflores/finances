$(document).ready(function(){
  initEarning(localStorage.getItem('userid'))
  $('#buttonAddNewEarning').on('click', controllerCreateEarning)
  
  $("#earningvalueNew").maskMoney({
    prefix: "R$ ",
    decimal: ",",
    thousands: "."
  });
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
      $(`#earningvalue${earning[i].earningid}`).maskMoney({
        prefix: "R$ ",
        decimal: ",",
        thousands: "."
      });
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

const handlerDeleteEarning = async(earningid) => {
  try {
    const { data } = await axios.post(url + '/earning/delete', {
      earningid: earningid
    });
    location.reload();
    return data
  } catch (error) {
    console.error(error);
    toastNotifyError("Erro ao excluir. Tente novamente mais tarde.")
  }
}

const handlerEditEarning = async(earningid) => {
  console.log('handlerEditEarning');
  try {
    const { data } = await axios.post(url + '/earning/edit', {
      earningdesc: $(`#modal${earningid}`).find('input')[0].value, 
      earningvalue: $(`#modal${earningid}`).find('input')[1].value,
      earningid: earningid
    });
    location.reload();
    return data
  } catch (error) {
    console.error(error);
  }
}

const controllerCreateEarning = async() => {
  console.log('controllerCreateEarning');
  if($('#earningvalueNew')[0].value !== '' && $('#earningdescNew')[0].value !== ''){
    try {
      const newEarning = {
        earningvalue: $('#earningvalueNew')[0].value,
        earningdesc: $('#earningdescNew')[0].value,
        userid: localStorage.getItem('userid')
      }
      console.log(newEarning)
      await createEarning(newEarning)
      return true
    } catch (error) {
      console.error(error)
    }
  }else{
    toastNotifyError('<b>Valor</b> e <b>Descrição</b> são obrigatórios')
  }
  
}

const createEarning = async(newEarning) => {
  try {
    const { data } = await axios.post(url + '/earning/create', newEarning);
    location.reload();
    return data
  } catch (error) {
    console.error(error);
    toastNotifyError("Erro ao criar. Tente novamente mais tarde.")
    return false
  }
}