import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [search, setSearch] = useState('');
  const [prodCat, setProdCat] = useState([]);
  const [prodItem, setProdItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/catalogData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setProdItem(response[0]);
    setProdCat(response[1]);

    // console.log(response[0], response[1]);

  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>
      <div>
        <div style={{ objectFit: "contain !important" }}>
          <div id="carouselExampleCaptions" className="carousel slide my-3">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://www.jbtc.com/foodtech/wp-content/uploads/sites/2/2021/08/Fresh-Produce-Collage.jpg" className="rounded mx-auto d-block" height={500} width={1350} style={{ filter: "brightness(30%)" }} alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Fresh Produce</h5>
                  <p>Fresh fruits and vegetables, sourced from organic farms.</p>
                  <div className="m-auto col-6" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://www.bakingbusiness.com/ext/resources/2019/8/08192019/GlobalTrends.jpg?height=667&t=1566494557&width=1080" className="rounded mx-auto d-block" height={500} width={1350} style={{ filter: "brightness(30%)" }} alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Baked Items</h5>
                  <p>Baked items are freshly prepared at our bakery.</p>
                  <div className="m-auto col-6" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://www.healthifyme.com/blog/wp-content/uploads/2017/07/Healthy-Pantry-Feature-Image.jpg" className="rounded mx-auto d-block" height={500} width={1350} style={{ filter: "brightness(30%)" }} alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Pantry Items</h5>
                  <p>Restock your kitchen with our high quality pantry items.</p>
                  <div className="m-auto col-6" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className='container'>
        {
          prodCat !== [] ? prodCat.map((categories) => {
            return (<div className='row mb-3'>
              <div key={categories._id} className='fs-3 m-3'>{categories.CategoryName}
              </div>
              <hr />
              {prodItem !== [] ? prodItem.filter((item) => (item.CategoryName === categories.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(sortedCatItems => {
                return (
                  <div key={sortedCatItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      prodItem={sortedCatItems}>
                    </Card>
                  </div>
                )
              }) : <div>No Data Found</div>}
            </div>
            )
          }) : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
