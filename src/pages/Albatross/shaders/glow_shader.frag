varying float intensity;

void main() {
  vec3 glow = vec3(253, 184, 19) * intensity;
  float opacity = 1.0;
  if (intensity < 0.01) opacity = 0.0;

  gl_FragColor = vec4(glow, opacity);
}
