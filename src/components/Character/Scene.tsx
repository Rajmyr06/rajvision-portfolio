import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import {
  setAllTimeline,
  setCharTimeline,
} from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasElement = canvasDiv.current;
    if (canvasElement) {
      let disposed = false;
      const rect = canvasElement.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasElement.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshStandardMaterial
      > | null = null;
      let loadedCharacter: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;
      let cleanupHover: (() => void) | undefined;
      let animationFrameId = 0;
      let introTimer = 0;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf && !disposed) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            cleanupHover = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          loadedCharacter = character;
          scene.add(character);
          setCharTimeline(character, camera);
          setAllTimeline();
          headBone = character.getObjectByName("spine006") || null;
          const screenLightObject = character.getObjectByName("screenlight");
          screenLight =
            screenLightObject instanceof THREE.Mesh
              ? (screenLightObject as THREE.Mesh<
                  THREE.BufferGeometry,
                  THREE.MeshStandardMaterial
                >)
              : null;
          progress.loaded().then(() => {
            if (disposed) return;
            introTimer = window.setTimeout(() => {
              if (disposed) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        } else if (gltf) {
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];
              materials.forEach((material) => material.dispose());
            }
          });
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        debounce = setTimeout(() => {
          handleTouchMove(event, (x, y) => (mouse = { x, y }));
        }, 200);
      };
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      const onResize = () => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchmove", onTouchMove);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        disposed = true;
        clearTimeout(debounce);
        clearTimeout(introTimer);
        progress.cancel();
        cancelAnimationFrame(animationFrameId);
        cleanupHover?.();
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (renderer.domElement.parentElement === canvasElement) {
          canvasElement.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchmove", onTouchMove);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
