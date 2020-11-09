import React, { useState } from 'react';
// import './App.css';
import { Alert } from 'reactstrap';
import { Progress, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
import bacond from '../images/bacondance.gif'
import bacond2 from '../images/bacondance2.gif'
import baconride from '../images/bacon_egg.gif'

const items = [
  {
    src: baconride,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: bacond,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: bacond2,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];


function Home(props) {


  const [delay, setDelay] = useState({delay: 0});


  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  return (
    <Container>
      <Row>
        <Col  sm="auto">
      
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>

        </Col>
      </Row>
    </Container>
  );


  return (
    <div> <div className="p-3 my-2 rounded">test</div>
        {/* <Button color="primary">Delay</Button>

        <Form>
          <FormGroup>
          <Label for="exampleNumber">Number</Label>
          <Input onChange={(evt) => { console.log(evt.target.value); }}
            type="number"
            name="number"
            id="exampleNumber"
            placeholder="0"
          />
          </FormGroup>
        </Form> */}
        {/* <div className="text-center">75%</div>
        <Progress value={75} /> */}

        {/* <Remotedata /> */}
    </div>
  );
}

export default Home;
