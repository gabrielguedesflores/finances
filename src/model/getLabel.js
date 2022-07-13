//import { axios } from 'axios'
import { axios } from 'axios';

export default async function  getLabel(userid) {
  const url = `https://finance-control-fc-api.herokuapp.com`
  // axios.post(url + '/api/label', {
  //   userid: userid,
  // }).then(function (response) {
  //   console.log(response);
  //   return response
  // }).catch(function (error) {
  //   console.log(error);
  //   return error;
  // })

  let payload = { userid: userid };
  let res = await axios.post(url + '/api/label', payload);

  let data = res.data;
  console.log(data);
  return data
}
