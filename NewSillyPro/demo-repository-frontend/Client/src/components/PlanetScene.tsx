import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Stars, Sparkles, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useEffect, Suspense, useState } from "react";

/* ------------------------------
   Planet Model
------------------------------ */
function Planet() {
  const { scene } = useGLTF("/models/planet.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Add some emissive color to make it pop if it's too dark
        if ((child as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1;
          mat.roughness = 0.8;
          mat.metalness = 0.1;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={2.5} position={[0, -0.5, 0]} />;
}

/* ------------------------------
   Moving Rocks
------------------------------ */
function Rocks() {
  const rocksRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (rocksRef.current) {
      rocksRef.current.rotation.y += delta * 0.02;
    }
  });

  const rocks = useMemo(() => {
    return new Array(15).fill(0).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <group ref={rocksRef}>
      {rocks.map((rock, i) => (
        <mesh key={i} position={rock.position} scale={rock.scale} receiveShadow castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#666" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------
   Player Controller
------------------------------ */

function Player({
  mouse,
  isHovering
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
  isHovering: React.MutableRefObject<boolean>;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const { scene, animations } = useGLTF("/models/player.glb");
  const { actions } = useAnimations(animations, group);

  /* Animation Control */
  useEffect(() => {
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const action = actions[actionNames[0]];
      action?.reset().fadeIn(0.5).play();
    }
    return () => {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.fadeOut(0.5);
      }
    }
  }, [actions]);

  /* Movement State */
  const planetCenter = useMemo(() => new THREE.Vector3(0, -0.5, 0), []);
  const planetRadius = 2.5;
  const playerHeight = planetRadius + 0.05;

  const pos = useRef(new THREE.Vector3(0, playerHeight, 0)); // Start at top of planet
  const vel = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3(0, playerHeight, 0));
  const isMoving = useRef(false);

  // Initialize position once
  useEffect(() => {
    if (group.current) {
      group.current.position.copy(pos.current);
    }
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame((state, dt) => {
    if (!group.current) return;

    /* Mouse → Planet Surface */
    raycaster.setFromCamera(mouse.current, camera);

    const sphere = new THREE.Sphere(planetCenter, planetRadius);
    const hit = new THREE.Vector3();

    const intersect = raycaster.ray.intersectSphere(sphere, hit);

    if (intersect && isHovering.current) {
      target.current.copy(hit);
    }

    /* Tangent Movement Logic */
    const currentPosOnSphere = pos.current.clone().sub(planetCenter).normalize().multiplyScalar(planetRadius).add(planetCenter);
    const directionToTarget = target.current.clone().sub(currentPosOnSphere);

    // Check distance to target
    const dist = directionToTarget.length();

    if (dist < 0.1) {
      isMoving.current = false;
      vel.current.lerp(new THREE.Vector3(0, 0, 0), 0.1);
    } else {
      isMoving.current = true;

      const normal = pos.current.clone().sub(planetCenter).normalize();
      const tangent = directionToTarget.projectOnPlane(normal).normalize();

      vel.current.lerp(tangent.multiplyScalar(2.5), 0.1);
    }

    pos.current.addScaledVector(vel.current, dt);

    /* Constraint: Lock to sphere surface */
    const vectorFromCenter = pos.current.clone().sub(planetCenter);
    // Ensure we stay at playerHeight from center
    vectorFromCenter.normalize().multiplyScalar(planetRadius); // Snap to surface level for calculation

    // We actually want the group position to be slightly above surface
    // But for the physics of 'walking', we track the surface point usually.
    // Let's stick to the previous simple logic: place object at radius + epsilon
    pos.current.copy(planetCenter).add(vectorFromCenter.normalize().multiplyScalar(planetRadius)); // On surface

    group.current.position.copy(pos.current);

    /* Rotation - Align 'up' with normal */
    const normal = pos.current.clone().sub(planetCenter).normalize();

    if (isMoving.current) {
      // Look where we are going
      const lookTarget = pos.current.clone().add(vel.current);
      const dummy = new THREE.Object3D();
      dummy.position.copy(pos.current);
      dummy.up.copy(normal);
      dummy.lookAt(lookTarget);
      group.current.quaternion.slerp(dummy.quaternion, 0.15);
    } else {
      // Just align to up vector to match curvature
      const dummy = new THREE.Object3D();
      dummy.position.copy(pos.current);
      dummy.up.copy(normal);

      // Try to maintain current forward direction projected on new plane
      // We get current forward from quaternion
      const currentForward = new THREE.Vector3(0, 0, 1).applyQuaternion(group.current.quaternion);
      // Project onto new normal plane
      const newForward = currentForward.projectOnPlane(normal).normalize();

      if (newForward.length() > 0.01) {
        const lookTarget = pos.current.clone().add(newForward);
        dummy.lookAt(lookTarget);
      }

      group.current.quaternion.slerp(dummy.quaternion, 0.1);
    }

    /* Animation Time Scaling */
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const firstAction = actions[actionNames[0]];
      if (firstAction) {
        const targetScale = isMoving.current ? 1.2 : 0;
        // We can't set paused effectively if we want to crossfade or have idle, 
        // but for a single walk loop, changing timeScale to 0 stops it.
        // If there is an idle animation, we should crossfade. 
        // Assuming single animation 'Walk' or similar.
        firstAction.paused = !isMoving.current;
        firstAction.timeScale = THREE.MathUtils.lerp(firstAction.timeScale, targetScale, 0.1);
      }
    }
  });

  return (
    <group ref={group} scale={0.25} dispose={null}>
      <primitive object={scene} castShadow />
    </group>
  );
}

/* ------------------------------
   Main Scene
------------------------------ */
export default function PlanetScene() {
  // Use a ref for mouse coordinates to avoid re-renders
  const mouse = useRef(new THREE.Vector2(0, 0));
  // Track if mouse is actually over the canvas/planet area effectively
  const isHovering = useRef(false);

  function onMouseMove(e: React.MouseEvent) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.set(x, y);
    isHovering.current = true;
  }

  function onMouseLeave() {
    isHovering.current = false;
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4, 8], fov: 45 }}
      >
        <Suspense fallback={null}>
          {/* Atmosphere / Fog */}
          <fog attach="fog" args={['#101020', 5, 30]} />

          {/* Lighting */}
          <ambientLight intensity={0.2} color="#4444ff" /> {/* Blue tint for atmosphere */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            color="#ffffff"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Rim light for planet */}
          <spotLight position={[-5, 5, -5]} intensity={1} color="#ffaa00" angle={0.5} penumbra={1} />

          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
          <Sparkles count={800} scale={15} size={2} speed={0.2} opacity={0.4} color="#88ccff" />
          <Environment preset="night" />

          {/* Objects */}
          <Rocks />
          <Planet />
          <Player mouse={mouse} isHovering={isHovering} />

          {/* Controls - Zoom Disabled */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>

      
    </div>
  );
}