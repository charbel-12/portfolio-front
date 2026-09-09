"use client";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh, WebGLRenderer } from "three";

export default function LogoModel({ src, fallback, paused, phase, onReady }: { src: string; fallback: string; paused: boolean; phase: number; onReady: (src: string) => void }) {
  const host = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(paused);
  const [failed, setFailed] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let renderer: WebGLRenderer | undefined;
    let model: Group | undefined;
    let resize: ResizeObserver | undefined;
    let intersection: IntersectionObserver | undefined;
    let inView = true;
    let frame = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const disposeModel = (object: Group) => object.traverse(child => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => material.dispose());
    });
    async function init() {
      try {
        const [THREE, { GLTFLoader }] = await Promise.all([import("three"), import("three/addons/loaders/GLTFLoader.js")]);
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        element!.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, .1, 30);
        camera.position.z = 5.5;
        scene.add(new THREE.HemisphereLight(0xffffff, 0x516479, 2.5));
        const key = new THREE.DirectionalLight(0xffffff, 4);
        key.position.set(-3, 4, 5);
        const rim = new THREE.DirectionalLight(0x9edfff, 2);
        rim.position.set(4, 1, 3);
        scene.add(key, rim);
        const gltf = await new GLTFLoader().loadAsync(src);
        if (disposed) { disposeModel(gltf.scene); return; }
        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 2.35 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);
        const pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);
        pivot.rotation.set(-.12, .22, -.04);
        const draw = () => renderer?.render(scene, camera);
        let ready = false;
        resize = new ResizeObserver(() => {
          const { width, height } = element!.getBoundingClientRect();
          if (!width || !height) return;
          renderer?.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = Math.max(size.y * scale, size.x * scale / camera.aspect) / (2 * Math.tan(THREE.MathUtils.degToRad(16))) * 1.3 + size.z * scale;
          camera.updateProjectionMatrix();
          draw();
          if (!ready) { ready = true; onReady(src); }
        });
        resize.observe(element!);
        intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
        intersection.observe(element!);
        let previous = performance.now();
        let elapsed = phase;
        const animate = (now: number) => {
          if (disposed) return;
          const delta = Math.min((now - previous) / 1000, .05);
          previous = now;
          if (inView && !document.hidden && !pausedRef.current && !motion.matches) {
            elapsed += delta;
            pivot.rotation.set(-.12 + Math.sin(elapsed * .7) * .09, .22 + Math.sin(elapsed * .55) * .22, Math.sin(elapsed * .45) * .045);
            draw();
          }
          frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      } catch {
        if (!disposed) { renderer?.domElement.remove(); setFailed(true); onReady(src); }
      }
    }
    void init();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      intersection?.disconnect();
      if (model) disposeModel(model);
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [src, phase, onReady]);
  return <span ref={host} className="company-model" aria-hidden="true">{failed && <img src={fallback} alt="" width={120} height={90}/>}</span>;
}
