import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const WatchScene = () => {
  const dialRef = useRef<Mesh>(null)
  const minuteHandRef = useRef<Mesh>(null)
  const hourHandRef = useRef<Mesh>(null)

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()

    if (dialRef.current) {
      dialRef.current.rotation.y = elapsed * 0.2
      dialRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.2
    }

    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -elapsed * 0.8
    }

    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -elapsed * 0.2
    }
  })

  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.4, 1.4, 0.05, 48]} />
        <meshStandardMaterial color="#05060A" transparent opacity={0.35} />
      </mesh>

      <group>
        <mesh ref={dialRef} castShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.42, 64]} />
          <meshPhysicalMaterial
            color="#B89648"
            roughness={0.2}
            metalness={1}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0, 0.25]} castShadow>
          <cylinderGeometry args={[1, 1, 0.08, 64]} />
          <meshPhysicalMaterial color="#05060A" roughness={0.4} metalness={0.3} />
        </mesh>

        <mesh position={[0, 0, 0.32]}>
          <icosahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#F5F1E6" emissive="#F5F1E6" emissiveIntensity={0.2} />
        </mesh>

        <mesh ref={minuteHandRef} position={[0, 0, 0.36]} castShadow>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
          <meshStandardMaterial color="#F5F1E6" />
        </mesh>

        <mesh ref={hourHandRef} position={[0, 0, 0.34]} castShadow>
          <boxGeometry args={[0.08, 0.6, 0.06]} />
          <meshStandardMaterial color="#F5F1E6" />
        </mesh>
      </group>

      <group position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.9, 0.16, 32, 100]} />
          <meshStandardMaterial color="#232733" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.2]} castShadow>
          <torusGeometry args={[0.9, 0.12, 32, 100]} />
          <meshStandardMaterial color="#0B0D12" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      <group position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.9, 0.16, 32, 100]} />
          <meshStandardMaterial color="#232733" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.2]} castShadow>
          <torusGeometry args={[0.9, 0.12, 32, 100]} />
          <meshStandardMaterial color="#0B0D12" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

export default WatchScene
