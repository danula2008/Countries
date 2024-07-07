let grid = document.getElementById("country_grid");
let data;

function fetchData() {

  grid.innerHTML = ""
  document.getElementById("txtInput").value = "";
  document.getElementById("cancelbtn").classList.add('disabled');
  document.getElementById("mainTxt").innerText = "All Countries"

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((res) => {
      data = res;
      let i = 0;
      res.forEach((element) => {
        let code = `<div class="countryCard col-lg-2 col-md-3 col-sm-4 col-4 mb-4" onClick=(showData(${i}))>
      <div class="card h-100">
          <img src="${element.flags.png}" alt="flag" class="card-img-top border-bottom" height="100px" />
          <div class="card-body">
              <h5 id="product_price" class="card-title text-primary">${element.name.common}</h5>
              <p id="product_discription" class="card-text">Officially : ${element.name.official}</p>
          </div>
      </div>
  </div>`;
        grid.innerHTML += code;
        i++;
      });
    });
}

fetchData();

function showData(id) {
  selectedData = data[id];
  console.log(selectedData);
  document.getElementById("myModal").innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
    <div class="modal-body p-4">
        <div class="card">
    <h3 class="card-title m-2 mb-4 text-center text-decoration-underline">${selectedData.name.official}</h3>
    <div class="container">
    <div class="row">
        <div class="col-6">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Capital: ${selectedData.capital[0]}</li>
                <li class="list-group-item">Region: ${selectedData.region}</li>
                <li class="list-group-item">Subregion: ${selectedData.subregion}</li>
                <li class="list-group-item">Population: ${selectedData.population}</li>
                <li class="list-group-item">Currency: ${Object.keys(selectedData.currencies)[0]}</li>
                <li class="list-group-item">Language: ${Object.keys(selectedData.languages)[0]}</li>
                <li class="list-group-item">Timezone: ${selectedData.timezones[0]}</li>
                <li class="list-group-item">Area: ${selectedData.area} km²</li>
                <li class="list-group-item">Landlocked: ${selectedData.landlocked? "Yes" : "No"}</li>
                <li class="list-group-item">Independent: ${selectedData.independent? "Yes" : "No"}</li>
                <li class="list-group-item">UN Member: ${selectedData.unMember? "Yes" : "No"}</li>
            </ul>
        </div>
        <div class="col-6">
            <img src="${selectedData.flags.svg}" alt="Flag of ${selectedData.name.official}" width="75%" class="mt-1">
        </div>
    </div>
</div>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" onClick="closeModal()">Close</button>
    </div>
  </div>
</div>

    `;
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function searchCountry() {
  let userInput = document.getElementById("txtInput").value;
  document.getElementById("mainTxt").innerText = `Search results of ${userInput}`

  grid.innerHTML = "";

  fetch(`https://restcountries.com/v3.1/name/${userInput}`)
    .then((res) => res.json())
    .then((res) => {
      data = res;
      let i = 0;
      res.forEach((element) => {
        let code = `<div class="col-lg-2 col-md-3 col-sm-4 col-4 mb-4" onClick=(showData(${i}))>
    <div class="card h-100">
        <img src="${element.flags.png}" alt="flag" class="card-img-top" height="100px" />
        <div class="card-body">
            <h5 id="product_price" class="card-title text-primary">${element.name.common}</h5>
            <p id="product_discription" class="card-text">Officially : ${element.name.official}</p>
        </div>
    </div>
</div>`;

        console.log(element);
        grid.innerHTML += code;
        i++;
      });
    });

    document.getElementById("cancelbtn").classList.remove('disabled');
}
