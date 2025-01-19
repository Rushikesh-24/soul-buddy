"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const WavyText = () => {
  const containerRef = useRef(null);
  let scene, camera, renderer, planeMesh;

  useEffect(() => {
    const textContainer = containerRef.current;

    const easeFactor = 0.03;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prevPosition = { x: 0.5, y: 0.5 };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;

      void main() {
        vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUV + vec2(1.0 / 40.0, 1.0 / 40.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);

        float strength = smoothstep(0.2, 0.0, pixelDistanceToMouse);
        vec2 uvOffset = strength * -mouseDirection * 0.3;
        vec2 uv = vUv - uvOffset;

        vec4 color = texture2D(u_texture, uv);
        gl_FragColor = color;
      }
    `;

    function createTexture(text, font="Clarendon", size, color, fontWeight = "100") {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const canvasWidth = window.innerWidth * 2;
      const canvasHeight = window.innerHeight * 2;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.fillStyle = color || "#ffffff";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      const fontSize = size || Math.floor(canvasWidth / 8);

      context.fillStyle = "#1a1a1a";
      context.font = `${fontWeight} ${fontSize}px ${font || "Clarendon"}`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      const textMetrics = context.measureText(text);
      const textWidth = textMetrics.width || 0;

      const scaleFactor = Math.min(0.4, canvasWidth / textWidth);
      const aspectCorrection = canvasWidth / canvasHeight;

      context.setTransform(
        scaleFactor,
        0,
        0,
        scaleFactor * aspectCorrection,
        canvasWidth / 2,
        canvasHeight / 2
      );

      context.strokeStyle = "#1a1a1a";
      context.lineWidth = fontSize * 0.005;
      for (let i = 0; i < 3; i++) {
        context.strokeText(text, 0, 0);
      }
      context.fillText(text, 0, 0);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    function initializeScene(texture) {
      scene = new THREE.Scene();

      const aspectRatio = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(
        -1,
        1,
        1 / aspectRatio,
        -1 / aspectRatio,
        0.1,
        1000
      );
      camera.position.z = 1;

      const shaderUniforms = {
        u_mouse: { value: new THREE.Vector2() },
        u_prevMouse: { value: new THREE.Vector2() },
        u_texture: { value: texture },
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      textContainer.appendChild(renderer.domElement);
    }

    function reloadTexture() {
      const newTexture = createTexture(
        "Soul Buddy",
        "Clarendon",
        null,
        "#ffffff",
        "100"
      );

      planeMesh.material.uniforms.u_texture.value = newTexture;
    }

    initializeScene(
      createTexture("Soul Buddy", "Clarendon", null, "#ffffff", "100")
    );

    function animateScene() {
      mousePosition.x +=
        (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y +=
        (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );

      renderer.render(scene, camera);
      requestAnimationFrame(animateScene);
    }

    function handleMouseMove(event) {
      let rect = textContainer.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };
      targetMousePosition = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    }

    function handleResize() {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -1;
      camera.right = 1;
      camera.top = 1 / aspectRatio;
      camera.bottom = -1 / aspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      reloadTexture();
    }

    animateScene();
    textContainer.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      textContainer.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute h-full w-full overflow-hidden font-kobe2" />
  );
};

export default WavyText;




