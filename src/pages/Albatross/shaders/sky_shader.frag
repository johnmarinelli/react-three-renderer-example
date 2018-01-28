uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
uniform float elapsedTime;

varying vec3 vWorldPosition;

void main() {
  float h = normalize(vWorldPosition + offset).y;
  float mixFactor = max(pow(max(h, 0.0), exponent), 0.0);
  gl_FragColor = vec4(mix(bottomColor, topColor, mixFactor), 1.0);
}
