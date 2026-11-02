"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { soundFx } from "@/lib/sound";

export default function Keypad3D({ className = "" }) {
  const mountRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0.7, y: 0.33 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 460;
    let height = mount.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 1.7, 6.2);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // Strictly no shadows as requested
    mount.appendChild(renderer.domElement);

    // 2. Lighting setup for clean specular highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main Specular Key Light (sharp rim & bevel highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 7.5, 6.0);
    scene.add(keyLight);

    // Sharp specular rim light specifically catching the curved top bevels
    const bevelRimLight = new THREE.DirectionalLight(0xfff8ee, 2.0);
    bevelRimLight.position.set(-3, 7, 4);
    scene.add(bevelRimLight);

    // Soft Ambient Fill Light from bottom-left
    const fillLight = new THREE.DirectionalLight(0xe8e4dc, 1.0);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Subtle Crimson Accent rim light
    const rimCrimson = new THREE.PointLight(0xd7193a, 1.8, 8);
    rimCrimson.position.set(2, -1, 2.5);
    scene.add(rimCrimson);

    // Ground shadows completely removed per user request ("remove shadows")

    // 4. Main Macro Keyboard Root Group
    const keyboardGroup = new THREE.Group();
    keyboardGroup.rotation.x = -0.38;
    keyboardGroup.rotation.y = 0.22;
    keyboardGroup.rotation.z = -0.05;
    scene.add(keyboardGroup);

    // Helper: Rounded Rectangle Shape for chassis with curved corners
    const createRoundedShape = (w, h, r) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return shape;
    };

    // 5. Rounded Cream-White Chassis (Beveled Curved Corners matching reference)
    const chassisShape = createRoundedShape(3.5, 2.04, 0.28);
    const chassisExtrude = {
      steps: 2,
      depth: 0.36,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelOffset: 0,
      bevelSegments: 8,
    };
    const chassisGeo = new THREE.ExtrudeGeometry(chassisShape, chassisExtrude);
    chassisGeo.center();

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xf7f5f0, // Clean warm cream white matching reference
      roughness: 0.24,
      metalness: 0.04,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    keyboardGroup.add(chassisMesh);

    // Dark under-chassis base layer
    const baseShape = createRoundedShape(3.52, 2.06, 0.28);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.05,
      bevelEnabled: false,
    });
    baseGeo.center();
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x161514,
      roughness: 0.7,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.z = -0.21;
    keyboardGroup.add(baseMesh);

    // 6. Top Screen Bezel & Animated Typing Display (Positioned on top-left above columns 0, 1, 2)
    const screenFrameShape = createRoundedShape(1.48, 0.38, 0.06);
    const screenFrameGeo = new THREE.ExtrudeGeometry(screenFrameShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
    });
    screenFrameGeo.center();
    const screenFrameMat = new THREE.MeshStandardMaterial({
      color: 0x11100f,
      roughness: 0.5,
      metalness: 0.3,
    });
    const screenFrame = new THREE.Mesh(screenFrameGeo, screenFrameMat);
    screenFrame.position.set(-0.68, 0.54, 0.29);
    keyboardGroup.add(screenFrame);

    // Canvas for dynamic typing text: "design. develop. launch."
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 128;
    const screenCtx = screenCanvas.getContext("2d");
    const screenTexture = new THREE.CanvasTexture(screenCanvas);

    let frameCount = 0;
    const phrases = [
      "hi",
      "design. develop. launch.",
      "all possibilities. one sphere.",
      "full sphere // active 60fps",
    ];
    let phraseIndex = 0;
    let isDeleting = false;
    let currentText = "hi";
    let charIndex = currentText.length;

    const updateScreenCanvas = () => {
      screenCtx.fillStyle = "#0e0d0d";
      screenCtx.fillRect(0, 0, 512, 128);

      // Left signature red brand icon (Matching reference 'W' logo)
      screenCtx.font = "bold 24px -apple-system, sans-serif";
      screenCtx.fillStyle = "#d7193a";
      screenCtx.textAlign = "left";
      screenCtx.fillText("FS", 22, 40);

      screenCtx.font = "12px monospace";
      screenCtx.fillStyle = "#9c9590";
      screenCtx.textAlign = "right";
      screenCtx.fillText("INDIA / GLOBAL", 490, 36);

      // Main Animated Headline
      screenCtx.font = "bold 36px 'Host Grotesk', -apple-system, sans-serif";
      screenCtx.fillStyle = "#f5f3ed";
      screenCtx.textAlign = "left";
      screenCtx.textBaseline = "middle";

      const cursor = Math.floor(frameCount / 24) % 2 === 0 ? "|" : "";
      screenCtx.fillText(currentText + cursor, 22, 86);

      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.needsUpdate = true;
    };

    // Initial canvas render
    updateScreenCanvas();

    const screenPlaneGeo = new THREE.PlaneGeometry(1.42, 0.32);
    const screenPlaneMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const screenPlane = new THREE.Mesh(screenPlaneGeo, screenPlaneMat);
    screenPlane.position.set(-0.68, 0.54, 0.34);
    keyboardGroup.add(screenPlane);

    // 7. Red Status Indicator LED (Positioned beside screen above Col 3)
    const ledGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xd7193a,
      emissive: 0xd7193a,
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0.32, 0.54, 0.29);
    keyboardGroup.add(ledMesh);

    // 8. 2D Rotary Volume Dial Regulator (Positioned at top right above Col 5)
    const knobWellGeo = new THREE.CylinderGeometry(0.33, 0.33, 0.03, 32);
    const knobWellMat = new THREE.MeshStandardMaterial({ color: 0x121110, roughness: 0.8 });
    const knobWell = new THREE.Mesh(knobWellGeo, knobWellMat);
    knobWell.rotation.x = Math.PI / 2;
    knobWell.position.set(1.08, 0.54, 0.27);
    keyboardGroup.add(knobWell);

    // The Volume Regulator Knob Group (aligned parallel to keyboard face, rotates in 2D)
    const knobGroup = new THREE.Group();
    knobGroup.position.set(1.08, 0.54, 0.30);
    keyboardGroup.add(knobGroup);

    // Flat circular disc regulator dial
    const knobGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.08, 32);
    const knobMat = new THREE.MeshStandardMaterial({
      color: 0x1c1a19,
      roughness: 0.32,
      metalness: 0.35,
    });
    const knobCylinder = new THREE.Mesh(knobGeo, knobMat);
    knobCylinder.rotation.x = Math.PI / 2;
    knobGroup.add(knobCylinder);

    // Red radial indicator line on top flat surface of the knob
    const notchGeo = new THREE.BoxGeometry(0.032, 0.11, 0.015);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0xd7193a });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(0, 0.075, 0.045);
    knobGroup.add(notchMesh);

    // 9. Curved Mechanical Keycaps: Exactly 6 columns x 2 rows = 12 keys
    // Spaced with generous breathing room below the display and knob
    // - Top row: Col 0 & Col 1 are WHITE keys!
    // - Bottom row: Col 5 is CRIMSON RED key!
    // - All other keys are matte CHARCOAL!
    const keysArray = [];
    const keyShape = createRoundedShape(0.40, 0.34, 0.07);
    const keyExtrudeSettings = {
      steps: 1,
      depth: 0.11,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 5,
    };
    const keyCapGeo = new THREE.ExtrudeGeometry(keyShape, keyExtrudeSettings);
    keyCapGeo.center();

    const darkKeyMat = new THREE.MeshStandardMaterial({
      color: 0x22201f, // Matte charcoal
      roughness: 0.35,
      metalness: 0.15,
    });

    const whiteKeyMat = new THREE.MeshStandardMaterial({
      color: 0xf8f7f4, // Clean off-white keycap
      roughness: 0.30,
      metalness: 0.05,
    });

    const crimsonKeyMat = new THREE.MeshStandardMaterial({
      color: 0xb0142c, // Signature Crimson Red
      roughness: 0.25,
      metalness: 0.1,
    });

    // 6 columns across width with distinct gap between each keycap
    const colOffsets = [-1.30, -0.78, -0.26, 0.26, 0.78, 1.30];
    // Moved down below display with generous spacing (top row at y = -0.06, bottom row at y = -0.54)
    const rowOffsets = [-0.06, -0.54];

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 6; c++) {
        // Col 0 & Col 1 top are WHITE keys
        const isWhiteKey = r === 0 && (c === 0 || c === 1);
        // Bottom right key (Col 5) is CRIMSON RED key
        const isCrimsonKey = r === 1 && c === 5;

        let matToUse = darkKeyMat;
        if (isWhiteKey) matToUse = whiteKeyMat;
        if (isCrimsonKey) matToUse = crimsonKeyMat;

        const keyMesh = new THREE.Mesh(keyCapGeo, matToUse);

        const posX = colOffsets[c];
        const posY = rowOffsets[r];
        const posZ = 0.32;

        keyMesh.position.set(posX, posY, posZ);
        keyMesh.userData = {
          id: `key_${r}_${c}`,
          baseZ: posZ,
          isWhite: isWhiteKey,
          isAccent: isCrimsonKey,
          label: isCrimsonKey ? "ENTER" : `K${r * 6 + c + 1}`,
        };

        keyboardGroup.add(keyMesh);
        keysArray.push(keyMesh);
      }
    }

    // 10. Interactive Raycaster & Mouse Parallax
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    let targetRotX = -0.38;
    let targetRotY = 0.22;

    const onMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      const normX = Math.max(0, Math.min(1, clientX / rect.width));
      const normY = Math.max(0, Math.min(1, clientY / rect.height));

      setCoords({
        x: parseFloat((0.5 + normX * 0.4).toFixed(2)),
        y: parseFloat((0.2 + normY * 0.3).toFixed(2)),
      });

      mouseVector.x = (clientX / rect.width) * 2 - 1;
      mouseVector.y = -(clientY / rect.height) * 2 + 1;

      targetRotY = 0.22 + mouseVector.x * 0.18;
      targetRotX = -0.38 - mouseVector.y * 0.12;
    };

    const handlePointerDown = (event) => {
      const rect = mount.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouseVector.x = (clientX / rect.width) * 2 - 1;
      mouseVector.y = -(clientY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(keysArray);

      if (intersects.length > 0) {
        const hitKey = intersects[0].object;

        hitKey.position.z = hitKey.userData.baseZ - 0.08;
        soundFx.playClick();
        ledMat.emissiveIntensity = 4.5;

        // Rotary knob turns 2D like an actual volume dial click
        knobGroup.rotation.z += 0.52;

        setTimeout(() => {
          hitKey.position.z = hitKey.userData.baseZ;
          ledMat.emissiveIntensity = 2.2;
        }, 120);

        currentText = hitKey.userData.isAccent ? "LAUNCHING..." : "INTERACTION OK";
        screenTexture.needsUpdate = true;
      }
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("pointerdown", handlePointerDown);

    // 11. Mathematical Responsive Camera Framing (Guarantees zero clipping on ANY viewport/aspect-ratio)
    const updateCameraDistance = () => {
      if (!mount) return;
      width = mount.clientWidth || 460;
      height = mount.clientHeight || 360;
      const aspect = width / height;
      camera.aspect = aspect;

      // Vertical FOV is 30 degrees
      const halfFovRad = (camera.fov / 2) * (Math.PI / 180);
      const tanHalf = Math.tan(halfFovRad);

      // Chassis width is 3.5 units + bezel margin + tilt rotation ~ 4.6 units
      // Height is ~ 2.9 units
      const reqW = 4.6;
      const reqH = 2.9;

      const distH = reqW / (2 * tanHalf * aspect);
      const distV = reqH / (2 * tanHalf);

      const targetDistance = Math.max(distH, distV, 6.2);

      camera.position.set(0, 1.7, targetDistance);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateCameraDistance();
    window.addEventListener("resize", updateCameraDistance);

    // 12. Continuous Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frameCount++;
      const elapsedTime = clock.getElapsedTime();

      // Continuous typing / erasing text engine for "hi" / "design. develop. launch."
      if (frameCount % 6 === 0) {
        const fullPhrase = phrases[phraseIndex];
        if (!isDeleting) {
          charIndex++;
          currentText = fullPhrase.substring(0, charIndex);
          if (charIndex >= fullPhrase.length) {
            isDeleting = true;
            charIndex += 14;
          }
        } else {
          if (charIndex <= fullPhrase.length) {
            charIndex--;
            currentText = fullPhrase.substring(0, charIndex);
          } else {
            charIndex--;
          }
          if (charIndex <= 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }
        updateScreenCanvas();
      }

      // Smooth 2D rotation of the volume knob around its face (Z-axis in local space)
      knobGroup.rotation.z += 0.008;

      // Mouse-tracking parallax smooth lerp
      keyboardGroup.rotation.y += (targetRotY - keyboardGroup.rotation.y) * 0.08;
      keyboardGroup.rotation.x += (targetRotX - keyboardGroup.rotation.x) * 0.08;

      // Gentle floating breathing animation
      keyboardGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateCameraDistance);
      if (mount) {
        mount.removeEventListener("mousemove", onMouseMove);
        mount.removeEventListener("pointerdown", handlePointerDown);
        if (renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* Background Technical Crosshairs and Radial Grid Circle (Matching reference WebDrift image) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Outer Circular Coordinate Ring */}
        <div className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-dashed border-[#f3f1ec15] relative">
          {/* Subtle Crosshairs */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#f3f1ec10]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#f3f1ec10]" />
          {/* Coordinate Readouts */}
          <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#9c9590]">
            y {coords.y}
          </span>
          <span className="absolute -right-6 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#9c9590]">
            x {coords.x}
          </span>
        </div>
      </div>

      {/* Top Figure Tag: ■ Fig. 01 · Keypad */}
      <div className="w-full max-w-[480px] flex justify-end text-[11px] font-mono tracking-wider text-[#9c9590] mb-1 z-10 pr-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#d7193a] inline-block" />
          <span>Fig. 01 · Keypad</span>
        </div>
      </div>

      {/* 3D WebGL Canvas with generous bounds so keyboard is NEVER clipped */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[400px] md:h-[440px] max-w-[540px] cursor-pointer relative z-10"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
