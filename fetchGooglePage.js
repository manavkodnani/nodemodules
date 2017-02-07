var axios = require('axios');
const getGooglePage = () => axios.get('http://google.com');
const getFacebookPage = () => axios.get('http://facebook.com');

getGooglePage().then(function (response) {
  console.log('Google home page:\n\n');
  console.log(response, '\n\n\n\n\n\n');
  return getFacebookPage();
})
  .then(function (response) {
    console.log('Facebook home page:\n\n');
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
