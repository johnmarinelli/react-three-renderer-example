varying float intensity;

void main() {
  vec4 worldPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  vec3 viewVector = cameraPosition - worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
  intensity = pow(dot(normalize(viewVector), actual_normal), 8.0);
}
