import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    const encryptedBlob = await decryptFile(
      "/models/character.enc",
      "Character3D#@"
    );
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        blobUrl,
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = false;
              child.receiveShadow = false;
              child.frustumCulled = true;
              if (child.material && !Array.isArray(child.material)) {
                (child.material as THREE.ShaderMaterial).precision = "mediump";
              }
            }
          });
          resolve(gltf);
          const rightFoot = character.getObjectByName("footR");
          const leftFoot = character.getObjectByName("footL");
          if (rightFoot) rightFoot.position.y = 3.36;
          if (leftFoot) leftFoot.position.y = 3.36;
          URL.revokeObjectURL(blobUrl);
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          URL.revokeObjectURL(blobUrl);
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
