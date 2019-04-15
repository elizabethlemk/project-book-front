import React from "react";
import { Container } from "semantic-ui-react";
import { Canvas } from "react-canvas-js";

const Crabs = () => {
  const crabURL1 = "https://i.imgur.com/Xh6StCV.png";
  const crabURL2 = "https://i.imgur.com/Ra5KrBL.png";
  const crabURL3 = "https://i.imgur.com/Fky8cWP.png";
  const crabURL4 = "https://i.imgur.com/pg38hCc.png";
  const myCrabs = {
    maxParticles: 0,
    shapes: [
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      },
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      },
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      },
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      },
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      },
      {
        type: "image",
        src: crabURL1
      },
      {
        type: "image",
        src: crabURL2
      },
      {
        type: "image",
        src: crabURL3
      },
      {
        type: "image",
        src: crabURL4
      }
    ],
    size: 200,
    minSpeed: 1,
    maxSpeed: 6,
    minSize: 100,
    width: "100vw",
    height: "100vh",
    alpha: 1,
    backgroundColor: "#fff"
  };

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed"
      }}
    >
      <Canvas options={myCrabs} />
    </Container>
  );
};

export default Crabs;
