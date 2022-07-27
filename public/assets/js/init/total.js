$(document).ready(function(){
  console.log('total.js');
  renderTotals(localStorage.getItem('userid'))
});

const urle = 'https://finance-control-fc-api.herokuapp.com/api'

const getSpending = async(userid) => {
  try {
    const data = await getLabel(userid)
    let valueTotal = parseFloat('00.00');

    for (let i = 0; i < data.length; i++) {
      // console.log(`labelValue ${i} `, parseFloat(data[i].labelvalue.replace('R$ ', '').replace(',', '.')))
      valueTotal = valueTotal + parseFloat(data[i].labelvalue.replace('R$ ', '').replace('.', '').replace(',', '.'))
      // console.log(`valueTotal ${i} `, valueTotal)
    }
    return valueTotal.toFixed(2)
  } catch (error) {
    log.error(error);
  }
}

const getEarnings = async(userid) => {
  try {
    let valueTotal = parseFloat('00.00')
    const { data } = await axios.post(urle + '/earning', {
      userid: userid
    });

    for (let i = 0; i < data.length; i++) {
      valueTotal = valueTotal + parseFloat(data[i].earningvalue.replace('R$ ', '').replace('.', '').replace(',', '.'))
    }
    return valueTotal
  } catch (error) {
    console.error(error);
  }
}

const fillFieldsTotals = (spendings, earnings) => {
  $('#ganhos').append(`<td><b>R$ ${earnings}</b></td>`)
  $('#gastos').append(`<td><b>R$ ${spendings}</b></td>`)
  const total = spendings > earnings ? (spendings - earnings) : (earnings - spendings) 
  console.log('total: ' + total);
  $('#total').append(`<td><b>R$ ${total.toFixed(2)}</b></td>`)
}

const renderTotals = async(userid) => {
  try {
    const spendings = await getSpending(userid);
    const earnings = await getEarnings(userid);

    console.log('spending: ' + spendings);
    console.log('earnings: ' + earnings);
    fillFieldsTotals(spendings, earnings)
    return true
  } catch (error) {
    log.error('Algo de errado aconteceu.');
    return false
  }
}
