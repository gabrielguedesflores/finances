$(document).ready(function(){
  binds()
  handlersHome()
  calledMaterialize()
});

const binds = () => {
  $("#labelValue").mask('R$ #.##0,00')
}

const calledMaterialize = () => {
  $('.modal').modal();
  $('.chips').on('chip.select', function(e, chip){
    console.log('handlePaid');
  });
}

const handlersHome = () => {
  $('#labelpaid').on('click', handlePaid())
}

const handlePaid = () => {
  console.log('handlePaid');
}