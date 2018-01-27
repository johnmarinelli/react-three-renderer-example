import React from 'react';
import React3 from 'react-three-renderer';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Sun extends React.Component {
  render() {
    const {
      position,
      rotation,
      color,
      setRef
    } = this.props;

    return (
      <group
        rotation={rotation} >
        <group
          position={position} >
          <mesh>
            <sphereGeometry
              radius={50}
            />
            <meshPhongMaterial />
          </mesh>
          <directionalLight
            color={color}
            ref={directionalLight => setRef(directionalLight)}
          />
        </group>
      </group>
    );
  }
};

Sun.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3),
  rotation: PropTypes.instanceOf(THREE.Euler),
  setRef: PropTypes.func,
};

Sun.defaultProps = {
  rotation: new THREE.Euler()
};

export default Sun;
