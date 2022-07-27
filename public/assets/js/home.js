$(document).ready(function(){
  binds()
  handlersHome()
  calledMaterialize(localStorage.getItem('userid'))
});

const binds = () => {
  //$("#labelValue").mask('R$ #.##0,00')
  $("#labelvalue").maskMoney({
    prefix: "R$ ",
    decimal: ",",
    thousands: "."
  });
}

const calledMaterialize = () => {
  $('.modal').modal();
  $('.chips').on('chip.select', function(e, chip){
    console.log('handlePaid');
  });
  $('select').material_select();
}

const handlersHome = () => {
  $('#createLabelPaid').on('click', handlePaid)
  $('select').on('change', handleFilterChange)
}

const handlePaid = () => {
  const isPaidName = $('#createLabelPaid').find('div')[0].className
  if(isPaidName.includes('teal')){
    $('#createLabelPaid').find('div').eq(0).removeClass('teal')
    $('#createLabelPaid').find('div').eq(0).removeClass('white-text')
    $('#createLabelPaid').find('div').eq(0).addClass('black-text')
  }else{
    $('#createLabelPaid').find('div').eq(0).removeClass('black-text')
    $('#createLabelPaid').find('div').eq(0).addClass('teal')
    $('#createLabelPaid').find('div').eq(0).addClass('white-text')
  }
}

const handleFilterChange = (e) => {
  console.log($('#selectFilter').val());
  const categoryid = $('#selectFilter').val()
  const list = $('.collapsible').eq(0).find('li')
  for (let i = 1; i < list.length; i++) {
    if(categoryid !== 'isAll'){

      if(list.eq(i).find('input').eq(1).val() !== categoryid){
        list.eq(i).hide('slow')
      }else{
        list.eq(i).show('slow')
      }

    }else{
      list.eq(i).show('slow')
    }
    
  }
}