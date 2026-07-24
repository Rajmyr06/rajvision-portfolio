import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";

const MOBILE_MODEL_BREAKPOINT = 1024;

const MobileScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.innerWidth > MOBILE_MODEL_BREAKPOINT) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 200);
    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    const characterGroup = new THREE.Group();

    let renderer: THREE.WebGLRenderer | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let headBone: THREE.Object3D | null = null;
    let modelSize = new THREE.Vector3(1, 1, 1);
    let animationFrame = 0;
    let isVisible = true;
    let isDisposed = false;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;

    const renderOnce = () => {
      if (!renderer || isDisposed) return;
      renderer.render(scene, camera);
    };

    const frameCamera = () => {
      if (!renderer) return;

      const { width, height } = mount.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov =
        2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const compositionHeight = modelSize.y * 0.45;
      const compositionWidth = modelSize.x * 0.82;
      const targetY = modelSize.y * 0.25;
      const heightDistance =
        compositionHeight / (2 * Math.tan(verticalFov / 2));
      const widthDistance =
        compositionWidth / (2 * Math.tan(horizontalFov / 2));
      const distance =
        Math.max(heightDistance, widthDistance) * 1.03 + modelSize.z * 0.35;

      camera.position.set(0, targetY, distance);
      camera.lookAt(0, targetY, 0);
      camera.updateProjectionMatrix();
      renderOnce();
    };

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const animate = () => {
      if (
        isDisposed ||
        !renderer ||
        !isVisible ||
        document.visibilityState === "hidden"
      ) {
        animationFrame = 0;
        return;
      }

      animationFrame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      mixer?.update(delta);
      pointer.lerp(targetPointer, 0.075);

      characterGroup.rotation.y = THREE.MathUtils.lerp(
        characterGroup.rotation.y,
        -0.08 + pointer.x * 0.14,
        0.07
      );
      characterGroup.rotation.x = THREE.MathUtils.lerp(
        characterGroup.rotation.x,
        pointer.y * 0.035,
        0.07
      );
      characterGroup.position.y = reducedMotion
        ? 0
        : Math.sin(elapsed * 0.85) * modelSize.y * 0.006;

      if (headBone && !reducedMotion) {
        headBone.rotation.y = THREE.MathUtils.lerp(
          headBone.rotation.y,
          pointer.x * 0.16,
          0.045
        );
        headBone.rotation.x = THREE.MathUtils.lerp(
          headBone.rotation.x,
          -pointer.y * 0.08,
          0.045
        );
      }

      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (reducedMotion) {
        renderOnce();
        return;
      }
      if (!animationFrame && isVisible) {
        clock.getDelta();
        animate();
      }
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      targetPointer.set(
        THREE.MathUtils.clamp(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -1,
          1
        ),
        THREE.MathUtils.clamp(
          -(((event.clientY - rect.top) / rect.height) * 2 - 1),
          -1,
          1
        )
      );
    };

    const resetPointer = () => targetPointer.set(0, 0);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Mobile WebGL initialization failed:", error);
      setHasWebGLError(true);
      return;
    }

    scene.add(characterGroup);

    const softLight = new THREE.HemisphereLight(0xf5eaff, 0x180d22, 1.85);
    const keyLight = new THREE.DirectionalLight(0xf2b2ff, 3.1);
    const rimLight = new THREE.DirectionalLight(0x7e4dff, 2.4);
    keyLight.position.set(4, 8, 7);
    rimLight.position.set(-5, 6, -4);
    scene.add(softLight, keyLight, rimLight);

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter()
      .then((gltf) => {
        if (!gltf || isDisposed) return;

        const character = gltf.scene;
        const desktopOnlyObjects = [
          "Cube.002",
          "screenlight",
          "Plane",
          "ground",
          "Plane.002",
          "Plane.003",
          "Plane.004",
        ];
        desktopOnlyObjects.forEach((name) => {
          const object =
            character.getObjectByName(name) ||
            character.getObjectByName(name.replace(/\./g, ""));
          object?.parent?.remove(object);
        });

        const bounds = new THREE.Box3().setFromObject(character);
        const center = bounds.getCenter(new THREE.Vector3());
        modelSize = bounds.getSize(new THREE.Vector3());

        character.position.sub(center);
        characterGroup.add(character);
        characterGroup.rotation.y = -0.08;

        headBone =
          character.getObjectByName("spine.006") ||
          character.getObjectByName("spine006") ||
          null;

        mixer = new THREE.AnimationMixer(character);
        const introClip = THREE.AnimationClip.findByName(
          gltf.animations,
          "introAnimation"
        );
        const typingClip = THREE.AnimationClip.findByName(
          gltf.animations,
          "typing"
        );
        const blinkClip = THREE.AnimationClip.findByName(
          gltf.animations,
          "Blink"
        );

        if (reducedMotion && introClip) {
          const introAction = mixer.clipAction(introClip);
          introAction.play();
          mixer.setTime(Math.max(0, introClip.duration - 0.01));
        } else {
          if (introClip) {
            const introAction = mixer.clipAction(introClip);
            introAction.setLoop(THREE.LoopOnce, 1);
            introAction.clampWhenFinished = true;
            introAction.play();
          }
          if (typingClip) {
            mixer.clipAction(typingClip).play().fadeIn(0.5);
          }
          if (blinkClip) {
            mixer.clipAction(blinkClip).play();
          }
        }

        frameCamera();
        renderer?.render(scene, camera);
        setIsReady(true);
        startAnimation();
      })
      .catch((error) => {
        console.error("Mobile character failed to load:", error);
        setHasWebGLError(true);
      });

    resizeObserver = new ResizeObserver(frameCamera);
    resizeObserver.observe(mount);

    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(mount);

    if (!reducedMotion) {
      mount.addEventListener("pointermove", updatePointer, { passive: true });
      mount.addEventListener("pointerleave", resetPointer);
      mount.addEventListener("pointerup", resetPointer);
      mount.addEventListener("pointercancel", resetPointer);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isDisposed = true;
      stopAnimation();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mount.removeEventListener("pointermove", updatePointer);
      mount.removeEventListener("pointerleave", resetPointer);
      mount.removeEventListener("pointerup", resetPointer);
      mount.removeEventListener("pointercancel", resetPointer);

      mixer?.stopAllAction();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      });

      renderer?.dispose();
      if (renderer?.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  if (hasWebGLError) {
    return (
      <div className="mobile-character-fallback">
        <img
          src="/images/profile/rohit-raj-mark.webp"
          alt=""
          width="720"
          height="720"
        />
      </div>
    );
  }

  return (
    <div
      className={`mobile-character-scene ${isReady ? "is-ready" : ""}`}
      ref={mountRef}
      role="img"
      aria-label="Interactive 3D developer character representing Rohit Raj"
    >
      <div className="mobile-character-glow" aria-hidden="true" />
      {!isReady && (
        <div className="mobile-character-loader" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
};

export default MobileScene;
