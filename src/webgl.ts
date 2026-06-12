import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  // -- simplex-style value noise + fbm -------------------------------
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.045;

    // domain-warped fbm for a slow liquid drift
    vec2 q = vec2(
      fbm(p * 1.4 + vec2(t, -t * 0.6)),
      fbm(p * 1.4 + vec2(-t * 0.4, t))
    );
    float field = fbm(p * 1.8 + q * 1.6);

    // soft light following the cursor
    vec2 m = uMouse;
    m.x *= uResolution.x / uResolution.y;
    float glow = exp(-distance(p, m) * 2.4);

    // palette: near-black -> warm umber -> champagne
    vec3 base = vec3(0.039, 0.039, 0.035);
    vec3 umber = vec3(0.16, 0.115, 0.07);
    vec3 champagne = vec3(0.788, 0.639, 0.416);

    float shade = smoothstep(-0.25, 0.85, field);
    vec3 col = mix(base, umber, shade);
    col = mix(col, champagne, pow(shade, 3.0) * 0.38);
    col += champagne * glow * 0.10;

    // gentle vignette to keep edges dark behind the nav / copy
    float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5)));
    col *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export interface HeroScene {
  destroy: () => void;
}

export function createHeroScene(canvas: HTMLCanvasElement): HeroScene | null {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  } catch {
    // No WebGL available: fall back to a static CSS gradient.
    canvas.style.background =
      'radial-gradient(120% 90% at 70% 20%, #1d150d 0%, #0a0a09 60%)';
    return null;
  }

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0.5, 0.5) },
  };

  const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const mesh = new Mesh(new PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const targetMouse = new Vector2(0.5, 0.5);

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.setPixelRatio(dpr);
    uniforms.uResolution.value.set(clientWidth * dpr, clientHeight * dpr);
  };

  const onMouseMove = (e: MouseEvent) => {
    targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
  };

  resize();
  window.addEventListener('resize', resize);

  if (prefersReducedMotion) {
    // Single static frame, no animation loop, no mouse tracking.
    renderer.render(scene, camera);
    return {
      destroy() {
        window.removeEventListener('resize', resize);
        material.dispose();
        mesh.geometry.dispose();
        renderer.dispose();
      },
    };
  }

  window.addEventListener('mousemove', onMouseMove);

  let rafId = 0;
  const start = performance.now();

  const tick = () => {
    uniforms.uTime.value = (performance.now() - start) / 1000;
    uniforms.uMouse.value.lerp(targetMouse, 0.04);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return {
    destroy() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    },
  };
}
