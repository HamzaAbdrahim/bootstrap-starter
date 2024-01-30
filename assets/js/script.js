const loction_box = document.querySelector('.loction-box');
const close  = document.getElementById('close')
const loction_button = document.querySelector('.Select-Country');
const shadow = document.querySelector('.bg-shadow');
const policie_link=  document.querySelector('.policie-link')
const policie_tooltip =  document.querySelector('.policie-tooltip')
const arrow_drop_down =  document.querySelector('.policie-svg')
const shope_link =  document.querySelector('.shope-link')
const shope_icon =  document.querySelector('.shope-link svg')
const big_tool_tip =  document.querySelector('.big-tool-tip')
const cart_button =  document.querySelector('.bi-lock-fill')
const cart =  document.querySelector('.cart')
const close_cart =  document.getElementById('close-cart')
const mobile_menu =  document.getElementById('mobile-menu')
const navlinks = document.querySelector('.navlinks')*


console.log(loction_button);









loction_button.addEventListener('click' , () => {
    loction_box.classList.add('active');
    shadow.toggleAttribute('hidden');
})
close.addEventListener('click' , () => {
    loction_box.classList.remove('active');
    shadow.removeAttribute('hidden');
})

policie_link.addEventListener('click' , () => {
    policie_tooltip.classList.toggle('active');
    console.log(arrow_drop_down);
    if (policie_tooltip.classList.contains('active')) {
        arrow_drop_down.style.transform = 'rotate(180deg)';
    } else {
        arrow_drop_down.style.transform = 'rotate(0deg)';

    }
})
shope_link.addEventListener('click' , () => {
    big_tool_tip.classList.toggle('active');
    if (big_tool_tip.classList.contains('active')) {
        shope_icon.style.transform = 'rotate(180deg)';
    } else {
        shope_icon.style.transform = 'rotate(0deg)';

    }
})
cart_button.addEventListener('click' , () => {
    cart.classList.add('active');
    shadow.toggleAttribute('hidden');
})
shadow.addEventListener('click' , () => {
    shadow.toggleAttribute('hidden');
    cart.classList.remove('active');
    navlinks.classList.remove('active');

})

close_cart.addEventListener('click' , () => {
    cart.classList.remove('active');
    shadow.toggleAttribute('hidden');
    navlinks.classList.remove('active');

})


// start fqo logic section 

const fqo_boxes = document.querySelectorAll('.fqo-box');

fqo_boxes.forEach((fqo_box) => {
  fqo_box.addEventListener('click', () => {
    console.log(fqo_box);
    fqo_box.classList.toggle('active');
  });
});
// end fqo logic section 

mobile_menu.addEventListener('click' , () => {
    navlinks.classList.add('active');
    shadow.toggleAttribute('hidden');
})


/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(
    instructionsElement
  );
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;