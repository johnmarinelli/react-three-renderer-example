import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import fragmentShader from 'raw-loader!./shaders/star_shader.frag';
import vertexShader from 'raw-loader!./shaders/star_shader.vert';

class Starfield extends React.Component {
  constructor() {
    super();
    this.numStars = 1000;
    const radius = 300;

    this.uniforms = {
      texture: {
        value: new THREE.TextureLoader().load('textures/patterns/spark1.png')
      }
    };

    this.positions = [];
    this.colors = [];

    let color = new THREE.Color();

    for (let i = 0; i < this.numStars; ++i) {
      this.positions.push((Math.random() * 2 - 1) * radius);
      this.positions.push((Math.random() * 2 - 1) * radius);
      this.positions.push((Math.random() * 2 - 1) * radius);

      color.setHSL(i / this.numStars, 1.0, 0.5);
      this.colors.push(color.r, color.g, color.b);
    }

    this.geometry = (
      <bufferGeometry
        index={null}
        position={new THREE.Float32BufferAttribute(this.positions.slice(), 3)}
        color={new THREE.Float32BufferAttribute(this.colors.slice(), 3)}>
      </bufferGeometry>
    );
  }

  render() {
    return (
      <points>
        {this.geometry}
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          depthTest={false}
          transparent
          vertexColors={THREE.VertexColors}
          uniforms={this.uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader} />
      </points>
    );
  }
};

export default Starfield;
