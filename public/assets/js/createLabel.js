$(document).ready(function(){
  initLabel(localStorage.getItem('userid'))
});

const getLabel = async(userid) => {
  const url = `https://finance-control-fc-api.herokuapp.com`
  try {
    const { data } = await axios.post(url + '/api/label', {
      userid: userid
    });
    return data
  } catch (error) {
    console.error(error);
  }
}

const buildLabel = (labelid, labelpaid, labelvalue) => {
  const labelpaidAux = labelpaid == true ? 'teal white-text' : 'black-text'
  return `
    <li>
      <div style="display: none;" id="hidden">
        <input type="text" id="labelid" value="${labelid}">
      </div>
      <div class="collapsible-header">
        Aluguel+
        <div class="chip ${labelpaidAux}  col s3" style="text-align: center;">Paga</div>
      </div>
      <div class="collapsible-body">
        <span>R$ ${labelvalue}</span>
        <a href="#modal1" style="float: right;" class="black-text modal-trigger" onClick=""><i class="material-icons">create</i></a>
      </div>
    </li>`
}

const initLabel = async(userid) => {
  const label = await getLabel(userid)
  const element = buildLabel(label[0].labelid, label[0].labelpaid, label[0].labelvalue)
  $('.collapsible').append(element)
  console.log(label);
}