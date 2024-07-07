let grid = document.getElementById("country_grid");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((element) => {
      let code = `<div class="col-lg-2 col-md-3 col-sm-4 col-4 mb-4">
    <div class="card h-100">
        <img src="${element.flags.png}" alt="flag" class="card-img-top" height="100px" />
        <div class="card-body">
            <h5 id="product_price" class="card-title text-primary">${element.name.common}</h5>
            <p id="product_discription" class="card-text">${element.name.official}</p>
        </div>
    </div>
</div>`;
      grid.innerHTML += code;
    });
  });
