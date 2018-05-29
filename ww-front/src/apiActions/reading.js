import { apiURL, appRef } from './index';

export const submitRead = function submitRead(form, file, userId){
  const submitURL = apiURL + 'reading/';
  console.log(file, userId)
  var data = new FormData()
  data.append('file', file)
  data.append('author', userId)


  
  fetch(submitURL, {
    method: 'post',
    // headers: new Headers({
    //   'Content-Type': 'application/json'
    // }),
    body: data
  })
  .then(res => res.json())
  .then((piece) => {
    if(!!piece.error){
      form.setState({error: piece.error})
    } else {
      form.setState({piece});
    }
  })
}