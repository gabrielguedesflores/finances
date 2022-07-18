$(document).ready(function(){
  initCategories(localStorage.getItem('userid'))
  binds()
  handlersCategories()
  calledMaterialize()
});

const url = `https://finance-control-fc-api.herokuapp.com/api`;

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
}

const handlersCategories = () => {
  $('#buttonAddCategory').on('click', createCategory)
}

const createCategory = () => {}

const initCategories = async (userid) => {
  const categories = await getCategory(userid);
  console.log(categories);
  for (let i = 0; i < categories.length; i++) {
    $('#tableCategories').find('tbody').append(buildCategories(categories[i]))
  }
}



const buildCategories = (categories) => {
  return `
  <tr>
    <td>${categories.categorydesc}</td>
    <td>
      <input type="hidden" id="categoryid" value="${categories.categoryid}"
      <a href="#!" id="" class="black-text"><i class="material-icons">create</i></a>
    </td>
  </tr>`
}