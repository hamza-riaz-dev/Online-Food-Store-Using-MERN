import React ,{ useState }from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Slider() {

  const [search,setSearch] = useState('')
  return (
    <div style={{objectFit:"contain !important"}}>
    <Carousel>

    <Form className="d-flex">
      
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
            <Button variant="outline-success" value={search} onClick={(e) => { setSearch('e.target.value') }}>Search</Button>
          </Form>

      <Carousel.Item>

      <img className="d-block w-100 img-fluid" style={{height: 600 }} src="1.jpg" alt="React Logo" sizecover/>

    
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" style={{height: 600 }} src="2.jpg" alt="React Logo" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" style={{height: 600 }} src="3.jpg" alt="React Logo" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>

        
      </Carousel.Item>
    </Carousel>


    </div>
  )
}
