"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { soundFx } from "@/lib/sound";

export default function Sphere3D({ className = "" }) {
  const mountRef = useRef(null);
  const [telemetry, setTelemetry] = useState({ az: "142.4°", el: "34.8°", r: "1.00" });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 380;
    let height = mount.clientHeight || 440;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Main Root Sphere Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Central Core: Glowing Crimson & Wireframe Sphere
    // Inner solid core
    const innerCoreGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x120507,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rootGroup.add(innerCore);

    // Wireframe Sphere Mesh
    const wireGeo = new THREE.IcosahedronGeometry(1.22, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd7193a,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // Outer Geodesic Lattice Sphere
    const outerGeo = new THREE.IcosahedronGeometry(1.36, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xf3f1ec,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    rootGroup.add(outerMesh);

    // 4. Orbital Rings (Full Sphere signature orbital equator & meridian)
    const createRing = (radius, tiltX, tiltY, color = 0xd7193a, opacity = 0.6) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      rootGroup.add(ringMesh);
      return ringMesh;
    };

    const ringEquator = createRing(1.5, Math.PI / 2, 0, 0xd7193a, 0.7);
    const ringInclined = createRing(1.65, Math.PI / 3, Math.PI / 6, 0xf3f1ec, 0.35);
    const ringPolar = createRing(1.58, 0, Math.PI / 4, 0xd7193a, 0.4);

    // 5. Constellation Nodes (Interactive Glowing Points on the Sphere)
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 1.25;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf3f1ec,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 6. Interactive Mouse Parallax & Target Tracking
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;

      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.6;

      const az = (142.4 + mouseX * 45).toFixed(1);
      const el = (34.8 + mouseY * 30).toFixed(1);
      setTelemetry({ az: `${az}°`, el: `${el}°`, r: "1.00" });
    };

    // Click Shockwave Animation
    const onClick = () => {
      soundFx.playClick();
      // Temporary expansion pulse
      rootGroup.scale.set(1.15, 1.15, 1.15);
      wireMat.opacity = 0.9;
      setTimeout(() => {
        rootGroup.scale.set(1.0, 1.0, 1.0);
        wireMat.opacity = 0.45;
      }, 250);
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("click", onClick);

    // 7. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || 380;
      height = mount.clientHeight || 440;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Constant ambient rotation
      wireMesh.rotation.y = elapsedTime * 0.2;
      wireMesh.rotation.x = elapsedTime * 0.1;

      outerMesh.rotation.y = -elapsedTime * 0.15;
      outerMesh.rotation.z = elapsedTime * 0.08;

      ringEquator.rotation.z = elapsedTime * 0.3;
      ringInclined.rotation.z = -elapsedTime * 0.25;
      ringPolar.rotation.y = elapsedTime * 0.18;

      // Mouse parallax smooth lerp
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.06;

      // Gentle floating breathing oscillation
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (mount) {
        mount.removeEventListener("mousemove", onMouseMove);
        mount.removeEventListener("click", onClick);
        if (renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[420px] md:h-[460px] max-w-[460px] cursor-pointer relative"
        style={{ touchAction: "none" }}
      />

      {/* Telemetry Footer */}
      <div className="w-full max-w-[360px] flex items-center justify-between text-[11px] font-mono tracking-wider text-[#9c9590] border-t border-[#f3f1ec20] pt-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d7193a] animate-pulse" />
          <span className="text-[#f3f1ec] font-medium">FULL SPHERE // Fig. 01</span>
        </div>
        <div className="flex items-center gap-3">
          <span>AZ {telemetry.az}</span>
          <span>EL {telemetry.el}</span>
          <span className="text-[#d7193a] font-semibold">CORE ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
