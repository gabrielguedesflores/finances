$(document).ready(function(){
  handler()
  $('.modal').modal();
});

const handler = () => {
  //$('#labelValue').mask('R$ ####,##')

  $("#labelValue").mask('R$ #.##0,00')
  $("#labelValue").val('R$ 1.561,66')
}