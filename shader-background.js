/**
 * Shader Background implementation mimicking ShaderGradient
 * Colors: #606080, #8d7dca, #212121
 * Parameters: uSpeed: 0.3, uStrength: 1.5, uDensity: 1.5
 */

const vertexShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;
    uniform float uSpeed;
    uniform float uStrength;
    uniform float uDensity;

    // Simplex 3D Noise 
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1. + 3. * C.xxx;

      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vUv = uv;
        
        float noise = snoise(vec3(uv * uDensity, uTime * uSpeed));
        vDistortion = noise * uStrength;
        
        vec3 pos = position;
        pos.z += vDistortion;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;
    
    vec3 color1 = vec3(0.008, 0.008, 0.016); // #020204
    vec3 color2 = vec3(0.0, 0.2, 0.4);       // Deep Cyan
    vec3 color3 = vec3(0.1, 0.05, 0.2);      // Deep Purple

    void main() {
        float mix1 = smoothstep(-1.0, 1.0, vDistortion);
        float mix2 = smoothstep(-0.5, 0.5, sin(vUv.x * 10.0 + uTime * 0.2));
        
        vec3 finalColor = mix(color1, color2, mix1);
        finalColor = mix(finalColor, color3, mix2 * 0.5);
        
        // Add some grain
        float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += (grain - 0.5) * 0.05;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

class GradientBackground {
    constructor() {
        this.canvas = document.getElementById('gradient-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });
        this.renderer.setClearColor(0x020204);
        
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        
        this.scene = new THREE.Scene();
        
        this.geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: 0.3 },
                uStrength: { value: 1.5 },
                uDensity: { value: 1.5 }
            },
            side: THREE.DoubleSide
        });
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        // Apply rotations from parameters
        this.mesh.rotation.x = THREE.MathUtils.degToRad(50);
        this.mesh.rotation.z = THREE.MathUtils.degToRad(-60);
        
        this.scene.add(this.mesh);
        
        this.onResize();
        window.addEventListener('resize', () => this.onResize());
        
        this.animate();
    }
    
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    
    animate() {
        const time = performance.now() * 0.001;
        this.material.uniforms.uTime.value = time;
        
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GradientBackground();
});
