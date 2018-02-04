varying vec3 vColor;

float rand(vec2 s) {
  return fract(sin(dot(s.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vColor = color;
  float size = rand(position.xy);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
