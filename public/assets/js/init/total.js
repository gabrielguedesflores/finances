$(document).ready(function(){
  console.log('total.js');
  renderTotals(localStorage.getItem('userid'))
});

const getSpending = async(userid) => {
  try {
    const data = await getLabel(userid)
    let valueTotal = parseFloat('00.00');

    for (let i = 0; i < data.length; i++) {
      // console.log(`labelValue ${i} `, parseFloat(data[i].labelvalue.replace('R$ ', '').replace(',', '.')))
      valueTotal = valueTotal + parseFloat(data[i].labelvalue.replace('R$ ', '').replace(',', '.'))
      // console.log(`valueTotal ${i} `, valueTotal)
    }
    return valueTotal.toFixed(2)
  } catch (error) {
    log.error(error);
  }
}

const getEarnings = async(userid) => {
  try {
    const { data } = await axios.post(url + '/earning', {
      userid: userid
    });
    return parseFloat(data[0].earningvalue.replace('R$ ', '').replace(',', '.'))
  } catch (error) {
    console.error(error);
  }
}

const fillFieldsTotals = (spendings, earnings) => {
  $('#ganhos').append(`<td><b>R$ ${earnings}</b></td>`)
  $('#gastos').append(`<td><b>R$ ${spendings}</b></td>`)
  const total = spendings > earnings ? (spendings - earnings) : (earnings - spendings) 
  console.log(total);
  $('#total').append(`<td><b>R$ ${total}</b></td>`)
}

const renderTotals = async(userid) => {
  try {
    const spendings = await getSpending(userid);
    const earnings = await getEarnings(userid);
    fillFieldsTotals(spendings, earnings)
    return true
  } catch (error) {
    log.error('Algo de errado aconteceu.');
    return false
  }
}
