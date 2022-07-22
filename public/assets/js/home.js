$(document).ready(function(){
  binds()
  handlersHome()
  calledMaterialize()

  setTimeout(function() {
    
  }, 3000)
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
}

const handlersHome = () => {
  $('#createLabelPaid').on('click', handlePaid)
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