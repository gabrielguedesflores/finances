$(document).ready(function(){
  console.log('footer.js')
  $('#footer').append(footer)

  $('#btnLayoutGrid').on('click', () => {
    $('#list').hide('slow')
    $('#grid').show('slow')
  })

  $('#btnLayoutList').on('click', () => {
    $('#list').show('slow')
    $('#grid').hide('slow')
  })
});

const footer = `
    <div class="fixed-action-btn horizontal">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">apps</i>
      </a>
      <ul>
        <li><a class="btn-floating red" id="btnLayoutList"><i class="material-icons">format_list_bulleted</i></a></li>
        <li><a class="btn-floating red darken-1" id="btnLayoutGrid"><i class="material-icons">view_module</i></a></li>
      </ul>
    </div>
  `;