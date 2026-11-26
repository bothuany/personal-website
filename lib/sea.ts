// The sea: one full-screen fragment shader, raw WebGL2. No footage, no libraries.
import type { Grade } from "@/content/site";

const VERT = `#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;

const FRAG = `#version 300 es
  precision highp float;
  uniform vec2 uRes, uLook;
  uniform float uTime, uTravel, uGlowAz, uGlowEl, uGlowAmt, uLights, uStars, uMoon, uAz, uPix;
  uniform vec3 uZen, uHor, uGlow, uWater, uShore;
  out vec4 o;

  float hash(vec2 p){ vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y); }

  // Sum of crossing swells with sharpened crests.
  float sea(vec2 p, int oct){
    float t = uTime * 0.55, h = 0.0, a = 0.32, f = 0.15;
    for (int i = 0; i < 7; i++) {
      if (i >= oct) break;
      float an = float(i) * 2.39 + 0.4;
      vec2 d = vec2(cos(an), sin(an));
      float x = dot(p, d) * f + t * (1.0 + 0.35 * float(i)) + noise(p * f * 0.6 + float(i) * 7.0) * 2.4;
      float w = 0.5 + 0.5 * sin(x);
      h += a * (w * w - 0.42);
      a *= 0.5; f *= 1.9;
    }
    return h;
  }
  float hmap(vec3 p, int oct){ return p.y - sea(p.xz, oct); }
  float trace(vec3 ro, vec3 rd, out vec3 p){
    float tm = 0.0, tx = 600.0, hx = hmap(ro + rd * tx, 4);
    if (hx > 0.0) { p = ro + rd * tx; return tx; }
    float hm = hmap(ro, 4), tmid = 0.0;
    for (int i = 0; i < 12; i++) {
      tmid = mix(tm, tx, hm / (hm - hx)); p = ro + rd * tmid; float h = hmap(p, 4);
      if (h < 0.0) { tx = tmid; hx = h; } else { tm = tmid; hm = h; }
    }
    return tmid;
  }
  vec3 normal(vec3 p, float d){
    float e = max(0.02, d * 0.004); int oct = d < 40.0 ? 6 : 4;
    float h = sea(p.xz, oct);
    return normalize(vec3(h - sea(p.xz + vec2(e, 0), oct), e, h - sea(p.xz + vec2(0, e), oct)));
  }
  vec3 glowDir(){ return normalize(vec3(sin(uGlowAz) * cos(uGlowEl), sin(uGlowEl), -cos(uGlowAz) * cos(uGlowEl))); }

  vec3 sky(vec3 rd){
    float el = rd.y, az = atan(rd.x, -rd.z);
    vec3 col = mix(uHor, uZen, pow(clamp(el * 1.7, 0.0, 1.0), 0.5));
    vec3 gd = glowDir(); float g = max(dot(rd, gd), 0.0);
    col += uGlow * uGlowAmt * (0.06 * pow(g, 2.0) + 0.42 * pow(g, 10.0) + 0.6 * pow(g, 200.0)) * (0.35 + 0.65 * exp(-max(el, 0.0) * 7.0));
    if (uStars > 0.0 && el > 0.04) {
      vec2 sp = vec2(az, el) * 300.0; vec2 c = floor(sp); float h = hash(c);
      if (h > 0.992) { float s = smoothstep(0.16, 0.0, length(fract(sp) - 0.5)) * (0.55 + 0.45 * sin(uTime * 2.3 + h * 80.0));
        col += vec3(0.85, 0.9, 1.0) * s * uStars * smoothstep(0.04, 0.25, el) * (0.4 + 0.6 * hash(c + 5.0)); }
    }
    if (uMoon > 0.0) { float md = acos(clamp(dot(rd, gd), -1.0, 1.0));
      col += vec3(1.0, 0.95, 0.86) * uMoon * (smoothstep(0.0105, 0.009, md) * 4.0 + 0.022 * exp(-md * 30.0)); }
    return col;
  }

  // Far shore, the tower on its islet, and a ferry. Shared by the sky and its reflections.
  vec3 horizon(vec3 rd, vec3 col, float lk){
    float el = rd.y, az = atan(rd.x, -rd.z) / uAz;
    if (el > 0.05 || el < -0.006) return col;
    float px = uPix;
    float span = smoothstep(-1.6, -0.6, az) * smoothstep(0.14, -0.04, az);
    float ax = floor(az * 210.0);
    float hill = 0.0026 + 0.004 * noise(vec2(az * 5.0, 1.0)) + 0.0015 * noise(vec2(az * 23.0, 2.0));
    float bld = step(0.58, noise(vec2(ax * 0.27, 5.0))) * (0.0008 + 0.0032 * hash(vec2(ax, 9.0)));
    float top = (hill + bld) * span;
    float cov = clamp((top - el) / px + 0.5, 0.0, 1.0) * step(0.0004, top);
    col = mix(col, uShore, 0.92 * cov);
    if (cov > 0.5) {
      vec2 g = vec2(az * 520.0, el * 520.0); vec2 c = floor(g); float h = hash(c);
      if (h > 0.86) { float s = smoothstep(0.5, 0.1, length((fract(g) - 0.5) * vec2(1.0, 1.4)));
        vec3 lc = mix(vec3(1.0, 0.58, 0.26), vec3(1.0, 0.88, 0.7), hash(c + 3.0));
        col += lc * s * uLights * lk * (0.75 + 0.25 * sin(uTime * 0.6 + h * 60.0)) * 1.8; }
    }
    float d = az - 0.30, tw = 0.0;
    tw = max(tw, 0.0026 * clamp((0.017 - abs(d)) / px + 0.5, 0.0, 1.0));
    tw = max(tw, 0.0072 * clamp((0.0105 - abs(d)) / px + 0.5, 0.0, 1.0));
    tw = max(tw, 0.0205 * clamp((0.0042 - abs(d)) / px + 0.5, 0.0, 1.0));
    tw = max(tw, 0.0262 * clamp((0.0026 - abs(d)) / px + 0.5, 0.0, 1.0));
    tw = max(tw, 0.0335 * clamp((0.0007 - abs(d)) / px + 0.5, 0.0, 1.0));
    col = mix(col, uShore * 0.55, 0.96 * clamp((tw - el) / px + 0.5, 0.0, 1.0) * step(0.0002, tw));
    float beam = 0.5 + 0.5 * sin(uTime * 0.8);
    vec2 lp = vec2(d, el - 0.0235);
    col += vec3(1.0, 0.78, 0.5) * uLights * (exp(-length(lp) * 1100.0) * 1.8 + exp(-length(lp) * 160.0) * 0.18 * beam);
    col += vec3(1.0, 0.82, 0.6) * uLights * 0.05 * beam * exp(-abs(el - 0.0235) * 420.0) * exp(-abs(d) * 2.5);
    float fa = -1.25 + mod(uTime * 0.011 + 0.35, 2.6), fd = az - fa;
    if (abs(fd) < 0.04) {
      float hull = abs(fd) < 0.03 ? 0.0034 : 0.0, cab = abs(fd) < 0.017 ? 0.0074 : 0.0, fun = abs(fd - 0.004) < 0.0018 ? 0.0105 : 0.0;
      if (el < max(max(hull, cab), fun)) col = mix(col, uShore * 0.45, 0.96);
      float win = step(abs(el - 0.0052), 0.0009) * step(0.45, fract(fd * 520.0)) * step(abs(fd), 0.0155);
      col += vec3(1.0, 0.72, 0.42) * win * uLights * lk * 2.2;
      col += vec3(1.0, 0.68, 0.4) * uLights * 0.07 * exp(-length(vec2(fd * 0.7, el - 0.005)) * 150.0);
    }
    return col;
  }

  vec3 water(vec3 p, vec3 n, vec3 rd){
    vec3 r = reflect(rd, n); r.y = abs(r.y);
    float fres = 0.03 + 0.97 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
    vec3 refl = horizon(r, sky(r), 0.4);
    vec3 body = uWater * (0.55 + 0.45 * n.y) + uWater * 0.8 * max(sea(p.xz, 2) + 0.15, 0.0);
    vec3 col = mix(body, refl, clamp(fres * 1.35, 0.0, 1.0));
    vec3 gd = glowDir(); float s = pow(max(dot(r, gd), 0.0), 90.0), sm = pow(max(dot(r, gd), 0.0), 600.0);
    col += uGlow * uGlowAmt * 0.9 * s * 1.8 + vec3(1.0, 0.96, 0.88) * uMoon * sm * 1.4;
    return col;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
    float asp = uRes.x / uRes.y, t = uTime;
    float fov = asp < 1.0 ? 0.62 : 0.27;
    vec3 ro = vec3(0.0, 2.4 + 0.12 * sin(t * 0.5), -uTravel);
    float pitch = (asp < 1.0 ? -0.14 : -0.06) + uLook.y * 0.02 + 0.005 * sin(t * 0.37);
    float yaw = uLook.x * 0.035 + 0.004 * sin(t * 0.23), roll = 0.005 * sin(t * 0.41);
    vec3 rd = normalize(vec3(uv * fov, -1.0));
    rd.xy = mat2(cos(roll), -sin(roll), sin(roll), cos(roll)) * rd.xy;
    rd.yz = mat2(cos(pitch), -sin(pitch), sin(pitch), cos(pitch)) * rd.yz;
    rd.xz = mat2(cos(yaw), -sin(yaw), sin(yaw), cos(yaw)) * rd.xz;

    vec3 skyc = horizon(rd, sky(rd), 1.0);
    vec3 col = skyc;
    if (rd.y < 0.003) {
      vec3 p; float d = trace(ro, rd, p);
      vec3 w = water(p, normal(p, d), rd);
      w = mix(w, uHor * 0.92, 1.0 - exp(-d * 0.006));
      col = mix(w, skyc, smoothstep(-0.0015, 0.003, rd.y));
    }
    col *= 0.9;
    col = clamp((col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14), 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    col = smoothstep(0.015, 1.0, col);
    float l = dot(col, vec3(0.299, 0.587, 0.114));
    col *= mix(vec3(0.94, 1.0, 1.07), vec3(1.05, 1.0, 0.94), smoothstep(0.1, 0.7, l));
    vec2 q = gl_FragCoord.xy / uRes;
    col *= 0.6 + 0.4 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.25);
    o = vec4(col, 1.0);
  }`;

export type GradeValues = { zen: number[]; hor: number[]; glow: number[]; gaz: number; gel: number; gamt: number; lights: number; stars: number; moon: number; water: number[]; shore: number[] };

// Time of day per chapter. Colours are linear, before tonemapping.
export const GRADES: Record<Grade, GradeValues> = {
  dusk:  { zen: [.005, .011, .042], hor: [.17, .115, .15], glow: [1.0, .4, .18], gaz: -.28, gel: -.025, gamt: 1.15, lights: .7, stars: .15, moon: 0, water: [.004, .011, .024], shore: [.03, .028, .045] },
  night: { zen: [.0025, .004, .012], hor: [.028, .034, .056], glow: [.62, .7, .92], gaz: .17, gel: .115, gamt: .26, lights: 1.0, stars: 1.0, moon: 1.0, water: [.002, .005, .011], shore: [.008, .009, .016] },
  deep:  { zen: [.0015, .0025, .008], hor: [.016, .02, .034], glow: [.62, .7, .92], gaz: .22, gel: .16, gamt: .12, lights: .9, stars: 1.3, moon: .3, water: [.0015, .0035, .008], shore: [.005, .006, .011] },
  dawn:  { zen: [.05, .075, .16], hor: [.58, .37, .28], glow: [1.0, .55, .28], gaz: .3, gel: .012, gamt: 1.4, lights: .1, stars: 0, moon: 0, water: [.035, .045, .07], shore: [.16, .13, .16] }
};

// A canvas keeps its context for life, so StrictMode's second mount must reuse the first Sea.
const made = new WeakMap<HTMLCanvasElement, Sea>();

const UNIFORMS = ["uRes", "uLook", "uTime", "uTravel", "uGlowAz", "uGlowEl", "uGlowAmt", "uLights", "uStars", "uMoon", "uAz", "uPix", "uZen", "uHor", "uGlow", "uWater", "uShore"] as const;

export class Sea {
  private gl: WebGL2RenderingContext;
  private u: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
  width = 0;
  height = 0;

  private constructor(gl: WebGL2RenderingContext, prog: WebGLProgram) {
    this.gl = gl;
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());
    this.u = Object.fromEntries(UNIFORMS.map(n => [n, gl.getUniformLocation(prog, n)])) as Sea["u"];
  }

  /** Returns null when WebGL2 or the shader is unavailable; the page then shows its poster. */
  static create(canvas: HTMLCanvasElement): Sea | null {
    const known = made.get(canvas);
    if (known) return known;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return null;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader compile failed");
      return s;
    };
    try {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link failed");
      const sea = new Sea(gl, prog);
      made.set(canvas, sea);
      return sea;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  resize(width: number, height: number) {
    this.width = width; this.height = height;
    const c = this.gl.canvas as HTMLCanvasElement;
    c.width = width; c.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  render(s: { time: number; travel: number; look: [number, number]; az: number; portrait: boolean; g: GradeValues }) {
    const { gl, u } = this, g = s.g;
    gl.uniform2f(u.uRes, this.width, this.height);
    gl.uniform2f(u.uLook, s.look[0], s.look[1]);
    gl.uniform1f(u.uTime, s.time);
    gl.uniform1f(u.uTravel, s.travel);
    gl.uniform1f(u.uAz, s.az);
    gl.uniform1f(u.uPix, (2 * (s.portrait ? 0.62 : 0.27)) / this.height); // radians per pixel, for anti-aliased silhouettes
    gl.uniform1f(u.uGlowAz, g.gaz); gl.uniform1f(u.uGlowEl, g.gel); gl.uniform1f(u.uGlowAmt, g.gamt);
    gl.uniform1f(u.uLights, g.lights); gl.uniform1f(u.uStars, g.stars); gl.uniform1f(u.uMoon, g.moon);
    gl.uniform3fv(u.uZen, g.zen); gl.uniform3fv(u.uHor, g.hor); gl.uniform3fv(u.uGlow, g.glow);
    gl.uniform3fv(u.uWater, g.water); gl.uniform3fv(u.uShore, g.shore);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
