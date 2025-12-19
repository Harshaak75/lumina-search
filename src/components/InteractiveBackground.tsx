import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
}

function InteractiveParticles({ mouse }: { mouse: MousePosition }) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 800;

  const { positions, originalPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Gradient colors from blue to purple to cyan
      const hue = 0.55 + Math.random() * 0.15;
      const color = new THREE.Color().setHSL(hue, 0.6, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    return { positions, originalPositions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      const positionAttribute = geometry.attributes.position;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Calculate distance from mouse (normalized -1 to 1)
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];

        // Mouse influence
        const mouseX = mouse.x * 10;
        const mouseY = mouse.y * 10;
        const dist = Math.sqrt(Math.pow(ox - mouseX, 2) + Math.pow(oy - mouseY, 2));
        const influence = Math.max(0, 1 - dist / 8);

        // Push particles away from mouse
        const angle = Math.atan2(oy - mouseY, ox - mouseX);
        const pushStrength = influence * 2;

        const targetX = ox + Math.cos(angle) * pushStrength;
        const targetY = oy + Math.sin(angle) * pushStrength;

        // Smooth lerp back to original position
        positionAttribute.array[i3] += (targetX - positionAttribute.array[i3]) * 0.05;
        positionAttribute.array[i3 + 1] += (targetY - positionAttribute.array[i3 + 1]) * 0.05;

        // Subtle floating motion
        positionAttribute.array[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }

      positionAttribute.needsUpdate = true;

      // Slow rotation
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowingOrbs({ mouse }: { mouse: MousePosition }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRefs = useRef<THREE.Mesh[]>([]);

  const orbData = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      position: [
        Math.sin((i / 8) * Math.PI * 2) * 5,
        Math.cos((i / 8) * Math.PI * 2) * 3,
        Math.sin((i / 8) * Math.PI * 2 + 1) * 4,
      ] as [number, number, number],
      size: 0.2 + Math.random() * 0.15,
      hue: 0.55 + i * 0.03,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // React to mouse
      groupRef.current.rotation.x = mouse.y * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mouse.x * 0.3;
    }

    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const data = orbData[i];
        orb.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * data.speed + i) * 0.5;
        orb.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {orbData.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) orbRefs.current[i] = el; }}
          position={orb.position}
        >
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(orb.hue, 0.7, 0.6)}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionLines({ mouse }: { mouse: MousePosition }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const nodeCount = 30;
    const nodes: [number, number, number][] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push([
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
      ]);
    }

    const lines: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );

        if (dist < 6) {
          lines.push(...nodes[i], ...nodes[j]);
          const opacity = 1 - dist / 6;
          lineColors.push(0.4, 0.6, 0.9, 0.4, 0.6, 0.9);
        }
      }
    }

    return {
      positions: new Float32Array(lines),
      colors: new Float32Array(lineColors),
    };
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.x = mouse.y * 0.1;
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.x * 0.1;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.15} />
    </lineSegments>
  );
}

export function InteractiveBackground() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMouse({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <InteractiveParticles mouse={mouse} />
        <GlowingOrbs mouse={mouse} />
        <ConnectionLines mouse={mouse} />
      </Canvas>
    </div>
  );
}
