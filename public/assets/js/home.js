$(document).ready(function(){
  binds()
  calledMaterialize()
});

const binds = () => {
  $("#labelValue").mask('R$ #.##0,00')
  $("#labelValue").val('R$ 1.561,66')
}

const calledMaterialize = () => {
  $('.modal').modal();

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
}

