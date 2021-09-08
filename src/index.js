import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#selectDate').click(function() {
    const date = $('#date').val();

    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=navcam&page=1&api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      let imageHTML = "";
      for (let i=0; i < response.photos.length; i++) {
        imageHTML += "<img src=" + response.photos[i].img_src + ">"
      }
      
      $('.showImages').html(imageHTML);
    }
  });
});