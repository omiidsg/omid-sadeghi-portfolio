"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

import { Container } from "@/components/ui/container";
import { galaxySkills as skills } from "@/data/skills";

type SkillNode = {
  label: string;
  radius: number;
  speed: number;
  phase: number;
  y: number;
  size: number;
};

type SkillOrbProps = {
  node: SkillNode;
  index: number;
};

function SkillOrb({ node, index }: SkillOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const labelTexture = useMemo(() => createTextTexture(node.label, hovered), [node.label, hovered]);

  useEffect(() => {
    return () => labelTexture.dispose();
  }, [labelTexture]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * node.speed + node.phase;
    const depthWave = Math.sin(angle * 1.4 + index) * 0.45;

    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(angle) * node.radius,
        node.y + Math.sin(angle * 0.8) * 0.45,
        Math.sin(angle) * node.radius * 0.58 + depthWave,
      );
      groupRef.current.rotation.y = -angle;
      groupRef.current.scale.setScalar(hovered ? 1.18 : 1);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = elapsed * 0.7 + index;
      meshRef.current.rotation.y = elapsed * 0.9;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <icosahedronGeometry args={[node.size, 0]} />
        <meshStandardMaterial
          color={hovered ? "#7B61FF" : "#00BFFF"}
          emissive={hovered ? "#7B61FF" : "#00BFFF"}
          emissiveIntensity={hovered ? 1.2 : 0.42}
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>
      <sprite scale={[hovered ? 2.5 : 2.1, hovered ? 0.72 : 0.62, 1]} position={[0, -0.9, 0]}>
        <spriteMaterial
          map={labelTexture}
          transparent
          depthWrite={false}
          opacity={hovered ? 1 : 0.86}
        />
      </sprite>
    </group>
  );
}

function createTextTexture(label: string, active: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;

  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = active ? "rgba(123, 97, 255, 0.28)" : "rgba(5, 8, 22, 0.58)";
  context.strokeStyle = active ? "rgba(123, 97, 255, 0.85)" : "rgba(0, 191, 255, 0.42)";
  context.lineWidth = 2;

  roundRect(context, 42, 38, 428, 84, 42);
  context.fill();
  context.stroke();

  context.font = "700 44px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = active ? "#FFFFFF" : "#D8E6FF";
  context.fillText(label, 256, 82);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function GalaxyScene() {
  const galaxyRef = useRef<THREE.Group>(null);
  const centerTexture = useMemo(() => createTextTexture("OMID SADEGHI", true), []);
  const nodes = useMemo(
    () =>
      skills.map((label, index) => ({
        label,
        radius: 3.1 + (index % 3) * 0.82,
        speed: 0.2 + (index % 4) * 0.045,
        phase: (index / skills.length) * Math.PI * 2,
        y: (index % 4 - 1.5) * 0.58,
        size: 0.22 + (index % 3) * 0.035,
      })),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!galaxyRef.current) return;

    galaxyRef.current.rotation.y = clock.getElapsedTime() * 0.08 + pointer.x * 0.28;
    galaxyRef.current.rotation.x = pointer.y * -0.16;
  });

  useEffect(() => {
    return () => centerTexture.dispose();
  }, [centerTexture]);

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 7, 15]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3.5, 4, 5]} intensity={18} color="#00BFFF" />
      <pointLight position={[-4, -2, 3]} intensity={10} color="#7B61FF" />
      <spotLight position={[0, 5, 2]} angle={0.5} penumbra={1} intensity={20} color="#FFFFFF" />

      <group ref={galaxyRef}>
        <mesh>
          <sphereGeometry args={[0.92, 32, 32]} />
          <meshStandardMaterial
            color="#050816"
            emissive="#00BFFF"
            emissiveIntensity={0.42}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[0.96, 32, 32]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.08} wireframe />
        </mesh>

        <sprite scale={[3.6, 0.82, 1]} position={[0, 0, 1.08]}>
          <spriteMaterial map={centerTexture} transparent depthWrite={false} />
        </sprite>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.006, 8, 120]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, 0.2, 0]}>
          <torusGeometry args={[4, 0.006, 8, 128]} />
          <meshBasicMaterial color="#7B61FF" transparent opacity={0.24} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, -0.55, 0.4]}>
          <torusGeometry args={[4.8, 0.006, 8, 128]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.13} />
        </mesh>

        {nodes.map((node, index) => (
          <SkillOrb key={node.label} node={node} index={index} />
        ))}
      </group>
    </>
  );
}

export function SkillsGalaxySection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="absolute right-[-12rem] top-12 h-96 w-96 rounded-full bg-accent-purple/14 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
            Skills
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.65rem,12vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white sm:leading-[0.85] sm:tracking-[-0.08em]">
            Tools In Motion
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
            A focused map of frontend, API, automation and delivery tools used across client
            projects and internal tooling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 h-[34rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] shadow-[0_36px_130px_rgba(0,191,255,0.12)] backdrop-blur-2xl sm:h-[42rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.12),transparent_42%)]" />
          {mounted ? (
            <Canvas
              camera={{ position: [0, 1.2, 9.5], fov: 48 }}
              dpr={[1, 1.5]}
              performance={{ min: 0.5 }}
              gl={{ antialias: true, alpha: true }}
              className="relative z-10"
            >
              <Suspense fallback={null}>
                <GalaxyScene />
              </Suspense>
            </Canvas>
          ) : (
            <div className="relative z-10 grid h-full place-items-center">
              <div className="h-24 w-24 rounded-full border border-primary-blue/30 border-t-primary-blue shadow-[0_0_50px_rgba(0,191,255,0.28)]" />
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

export default SkillsGalaxySection;
