import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import fragmentShader from 'raw-loader!./shaders/sky_shader.frag';
import vertexShader from 'raw-loader!./shaders/sky_shader.vert';
import TrackballControls from '../../ref/trackball';
import Stats from 'stats-js';

import Sun from './Sun';
import Starfield from './Starfield';

class Albatross extends React.Component {
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

    // fog/background
    this.clearColor = new THREE.Color().setHSL(0.6, 0.0, 1.0);
    this.fog = new THREE.Fog(this.clearColor, this.cameraNear, this.cameraFar);

    // lights
    this.skyColor = new THREE.Color().setHSL(0.6, 1.0, 1.0);
    this.groundColor = new THREE.Color().setHSL(0.095, 1.0, 0.75);
    this.hemisphereLightPosition = new THREE.Vector3(0, 50, 0);
    this.directionalLightColor = new THREE.Color(0xffffff).setHSL(0.1, 1.0, 0.95);

    // globe
    this.globeTexture = new THREE.TextureLoader().load('textures/patterns/earthmap1k.jpg');

    // refs
    this.handles = {
      container: null,
      mainCamera: null,
      hemisphereLight: null,
      directionalLight: null,
      scene: null,
      flamingoMeshJsx: null,
      react3Ref: null,
      skyMesh: null,
    };

    this.controls = null;
    this.stats = null;

    this.state = {
      globePosition: new THREE.Vector3(0, -210, 0),
      globeRotation: new THREE.Euler(),
      sunPosition: new THREE.Vector3(-250.0, 0.0, 0.0),
      sunRotation: new THREE.Euler(0, 0, 0),
      cameraPosition: new THREE.Vector3(0, 0, 350),
      cameraRotation: new THREE.Euler(),
      elapsedTime: 0
    };

    // model
    this.flamingoMeshAnimator = null;
    const loader = new THREE.JSONLoader();

    loader.load('models/flamingo.js', (geometry) => {
      const {
        animations,
        faceVertexUvs,
        faces,
        morphTargets,
        vertices,
      } = geometry;

      this.handles.flamingoMeshJsx = (
        <mesh
          ref={flamingoMesh => {
            // this happens when a new page is clicked from sidebar
            if (null === flamingoMesh || null !== this.flamingoMeshAnimator) return;
            flamingoMesh.updateMorphTargets();
            const mixer = new THREE.AnimationMixer(flamingoMesh);
            const clipAction  = mixer.clipAction(geometry.animations[0]);
            clipAction.setDuration(1.23);
            clipAction.play();
            this.flamingoMeshAnimator = mixer;
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
              if (null === flamingoGeometry) return;
              flamingoGeometry.morphTargets = morphTargets.slice();
              this.handles.flamingoGeometry = flamingoGeometry;
            }}>
          </geometry>
          <materialResource
            resourceId="flamingoMaterial" />
        </mesh>
      );

    });

    this._onAnimate = () => {
      const timeDelta = this.clock.getDelta();

      const { elapsedTime, globeRotation, sunRotation } = this.state;

      const newSunRotation = sunRotation.clone();
      newSunRotation.y += 0.0125;

      const newGlobeRotation = globeRotation.clone();
      newGlobeRotation.y += 0.01;

      if (null !== this.flamingoMeshAnimator) {
        this.flamingoMeshAnimator.update(timeDelta);
      }

      if (null !== this.controls) {
        this.controls.update();
      }

      if (null !== this.stats) {
        this.stats.update();
      }

      this.setState({
        globeRotation: newGlobeRotation,
        elapsedTime: elapsedTime + timeDelta,
        sunRotation: newSunRotation
      });
    };

  }

  componentDidMount() {
    const {
      hemisphereLight,
      directionalLight,
      scene,
      container,
      mainCamera
    } = this.handles;
    // light helper
    const hemisphereLightHelper =
      new THREE.HemisphereLightHelper(hemisphereLight, 10);
    scene.add(hemisphereLightHelper);

    /*
    const directionalLightHelper =
      new THREE.DirectionalLightHelper(directionalLight, 10);
    scene.add(directionalLightHelper);
    */

    // initialize clock
    this.clock = new THREE.Clock();

    this.initControls(mainCamera, container);

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    container.appendChild(this.stats.domElement);
  }

  initControls(camera, domElement) {
    // trackball controls
    const controls = new TrackballControls(
      camera,
      domElement
    );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;
    controls.addEventListener('change', this.onTrackballChange);

  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      sunPosition,
      sunRotation,
      cameraPosition,
      cameraRotation,
      globePosition,
      globeRotation,
      elapsedTime,
    } = this.state;

    const {
      flamingoMeshJsx
    } = this.handles;

    const skyUniforms = {
      topColor: {type: 'c', value: new THREE.Color(0x0077ff)},
      bottomColor: {type: 'c', value: new THREE.Color(0x000000)},
      offset: {type: 'f', value: 33},
      exponent: {type: 'f', value: 0.6},
      elapsedTime: {type: 'f', value: elapsedTime}
    };

    return (
      <div ref={container => this.handles.container = container}>
        <React3
          canvasRef={ref => this.handles.react3Ref = ref}
          antialias
          gammaInput
          gammaOutput
          mainCamera="camera"
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
          <planeBufferGeometry
            resourceId="groundGeometry"
            width={10000}
            height={10000} />
        </resources>
        <scene
          ref={sceneRef=> this.handles.scene = sceneRef}
          fog={this.fog}>
          <perspectiveCamera
            name="camera"
            ref={cam => {
              this.handles.mainCamera = cam
            }}
            fov={this.cameraFov}
            aspect={this.aspectRatio}
            near={this.cameraNear}
            far={this.cameraFar}

            position={cameraPosition}
            rotation={cameraRotation}
          />
          <hemisphereLight
            intensity={0.5}
            skyColor={this.skyColor}
            groundColor={this.groundColor}
            position={this.hemisphereLightPosition}
            ref={hemisphereLight => this.handles.hemisphereLight = hemisphereLight}
          />
          <Sun
            position={sunPosition}
            rotation={sunRotation}
            setRef={directionalLight => {
              if (null !== directionalLight) {
                this.handles.directionalLight = directionalLight
              }
            }}
          />
          <Starfield />
          <mesh
            position={globePosition}
            rotation={globeRotation}
          >
            <sphereGeometry
              radius={200}
              widthSegments={32}
              heightSegments={32}
            />
            <meshPhongMaterial
              map={this.globeTexture}
            />
          </mesh>
          <mesh
            ref={skyMesh => this.handles.skyMesh = skyMesh}
          >
            <sphereGeometry
              radius={4000}
              widthSegments={32}
              heightSegments={15} />
            <shaderMaterial
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              side={THREE.BackSide}
              uniforms={skyUniforms}
            >
            </shaderMaterial>
          </mesh>
          {flamingoMeshJsx}
        </scene>
      </React3>
    </div>);
  }

  onTrackballChange = () => {
    const {
      mainCamera
    } = this.handles;

    this.setState({
      cameraPosition: mainCamera.position.clone(),
      cameraRotation: mainCamera.rotation.clone(),
    });
  };

  componentWillUnmount() {
    this.controls.removeEventListener('change', this.onTrackballChange);
    this.controls.dispose();
    this.flamingoMeshAnimator = null;
    delete this.controls;
    delete this.stats;
  }
}

export default Albatross;
