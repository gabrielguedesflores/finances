$(document).ready(function(){
  setTimeout(function(){
    initLabel(localStorage.getItem('userid'))
  }, 2000)
  $('#btnSaveLabel').on('click', controllerCreateLabel)
});

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
        <a href="#modal1" style="float: right;" class="black-text modal-trigger" onClick=""><i class="material-icons">create</i></a>
      </div>
    </li>`
}

const initLabel = async(userid) => {
  $('#loadingLabel').show()
  const label = await getLabel(userid)
  for (let i = 0; i < label.length; i++) {
    $('.collapsible').append(buildLabel(label[i]))
  }
  console.log(label);
  $('#loadingLabel').hide()
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

const controllerCreateLabel = async() => {
  console.log('Creating label');
  const newLabel = {
		"labeltitle": $('#createModal').find('input')[0].value,
		"labeldesc": $('#createModal').find('textarea')[0].value,
		"labelpaid": returnPaid(),
		"labeldate": moment().format('YYYY-MM-DD'),
		"labelvalue": "1500",
		"userid": localStorage.getItem('userid'),
    "labelcategoryid": returnCategoryLabel()
	}
  await createLabel(newLabel)
  console.log(newLabel);
  return true
}

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
