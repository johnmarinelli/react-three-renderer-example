import React from 'react';
import React3 from 'react-three-renderer';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import fragmentShader from 'raw-loader!./shaders/glow_shader.frag';
import vertexShader from 'raw-loader!./shaders/glow_shader.vert';

class Sun extends React.Component {
  render() {
    const {
      position,
      rotation,
      color,
      setRef
    } = this.props;

    return (
      <group>
        <group
          position={position}
          rotation={rotation} >
          <mesh>
            <sphereGeometry
              heightSegments={16}
              widthSegments={16}
              radius={0.1875}
            />
            <shaderMaterial
              transparent
              blending={THREE.AdditiveBlending}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader} />
          </mesh>
          <directionalLight
            color={color}
            intensity={0.01}
            ref={directionalLight => setRef(directionalLight)}
          />
        </group>
      </group>
    );
  }
};

Sun.propTypes = {
  color: PropTypes.instanceOf(THREE.Color),
  position: PropTypes.instanceOf(THREE.Vector3),
  rotation: PropTypes.instanceOf(THREE.Euler),
  setRef: PropTypes.func,
};

Sun.defaultProps = {
  color: new THREE.Color(253, 184, 19),
  rotation: new THREE.Euler()
};

export default Sun;
