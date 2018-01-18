import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import fragmentShader from 'raw-loader!./shaders/shader.frag';
import vertexShader from 'raw-loader!./shaders/shader.vert';

class HemisphereLight extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    // camera
    this.cameraFov = 30.0;
    this.aspectRatio = window.innerWidth / window.innerHeight;
    this.cameraNear = 1.0;
    this.cameraFar = 5000.0;
    this.cameraPosition = new THREE.Vector3(0, 0, 250);

    // fog/background
    this.clearColor = new THREE.Color().setHSL(0.6, 0.0, 1.0);
    this.fog = new THREE.Fog(this.clearColor, this.cameraNear, this.cameraFar);

    // lights
    this.skyColor = new THREE.Color().setHSL(0.6, 1.0, 1.0);
    this.groundColor = new THREE.Color().setHSL(0.095, 1.0, 0.75);
    this.hemisphereLightPosition = new THREE.Vector3(0, 50, 0);
    this.directionalLightColor = new THREE.Color(0xffffff).setHSL(0.1, 1.0, 0.95);
    this.directionalLightPosition = new THREE.Vector3(-1.0, 1.75, 1.0)
      .multiplyScalar(30.0);

    // refs
    this.hemisphereLight = null;
    this.directionalLight = null;
    this.scene = null;
    this.flamingoMeshJsx = null;

    this.state = {
      rotation: new THREE.Euler(),
    };

    // model
    this.mixers = [];
    const loader = new THREE.JSONLoader();

    loader.load('models/flamingo.js', (geometry) => {
      const {
        animations,
        faceVertexUvs,
        faces,
        morphTargets,
        vertices,
      } = geometry;

      this.flamingoMeshJsx = (
        <mesh
          ref={flamingoMesh => {
            flamingoMesh.updateMorphTargets();
            const mixer = new THREE.AnimationMixer(flamingoMesh);
            const clipAction  = mixer.clipAction(geometry.animations[0]);
            clipAction.setDuration(1);
            clipAction.play();
            this.mixers.push(mixer);
            this.flamingoMesh = flamingoMesh;
          }}
          scale={new THREE.Vector3(0.35, 0.35, 0.35)}
          rotation={new THREE.Euler(0, -1, 0)}
          position={new THREE.Vector3(0, 15, 0)} >
          <geometry
            vertices={vertices}
            faceVertexUvs={faceVertexUvs}
            faces={faces}
            ref={flamingoGeometry => {
              flamingoGeometry.morphTargets = morphTargets.slice();
              this.flamingoGeometry = flamingoGeometry;
            }}>
          </geometry>
          <materialResource
            resourceId="flamingoMaterial" />
        </mesh>
      );

    });

    this._onAnimate = () => {
      // we will get this callback every frame
      this.mixers.forEach(m => m.update(this.clock.getDelta()));

      // pretend rotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        rotation: new THREE.Euler(
          this.state.rotation.x + 0.1,
          this.state.rotation.y + 0.1,
          0
        ),
      });
    };
  }

  componentDidMount() {
    // light helper
    const hemisphereLightHelper =
      new THREE.HemisphereLightHelper(this.hemisphereLight, 10);
    this.scene.add(hemisphereLightHelper);

    const directionalLightHelper =
      new THREE.DirectionalLightHelper(this.directionalLight, 10);
    this.scene.add(directionalLightHelper);

    // initialize clock
    this.clock = new THREE.Clock();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      rotation
    } = this.state;

    return (
      <React3
        antialias
        gammaInput
        gammaOutput
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}

        onAnimate={this._onAnimate}
      >
      <resources>
        <meshPhongMaterial
          resourceId="flamingoMaterial"
          color={0xffffff}
          specular={0xffffff}
          shininess={20}
          morphTargets
          vertexColors={THREE.FaceColors}
          shading={THREE.FlatShading}
        />
      </resources>
      <scene
        ref={scene => this.scene = scene}
        fog={this.fog}>
        <perspectiveCamera
          name="camera"
          fov={this.cameraFov}
          aspect={this.aspectRatio}
          near={this.cameraNear}
          far={this.cameraFar}

          position={this.cameraPosition}
        />
        <hemisphereLight
          intensity={0.6}
          skyColor={this.skyColor}
          groundColor={this.groundColor}
          position={this.hemisphereLightPosition}
          ref={hemisphereLight => this.hemisphereLight = hemisphereLight}
        />
        <directionalLight
          color={this.directionalLightColor}
          position={this.directionalLightPosition}
          rotation={new THREE.Euler(1, 0, 0)}
          ref={directionalLight => {
            this.directionalLight = directionalLight
          }}
        />
        <mesh>
          <sphereGeometry
            radius={4000}
            widthSegments={32}
            heightSegments={15} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            side={THREE.BackSide}
            uniforms={{
              topColor: {value: new THREE.Color(0x0077ff)},
              bottomColor: {value: new THREE.Color(0xffffff)},
              offset: {value: 33},
              exponent: {value: 0.6}
            }}
          />
        </mesh>
        {this.flamingoMeshJsx}
      </scene>
    </React3>);
  }
}

export default HemisphereLight;
