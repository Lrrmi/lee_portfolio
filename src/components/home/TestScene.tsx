import { RigidBodyType } from "@dimforge/rapier3d-compat";
import { DragControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type RefObject, Suspense, useRef } from "react";
import * as THREE from "three";
import furnitures from "../../images.json";

// recolor te model
// fix the physics so touch and grab can happen
// Add walls(?)
// Randomize models to appear
// Add loading icon for suspense
type FallingCubeProps = {
	initialPosition: [number, number, number];
	canvasRef: RefObject<HTMLDivElement | null>;
	glbPath: string;
};

function getRandomIntInclusive(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const RANDOMMIN = -50;
const RANDOMMAX = 50;

function Furniture({ initialPosition, canvasRef, glbPath }: FallingCubeProps) {
	const furnitureRef = useRef<RapierRigidBody | null>(null);
    const dragging = useRef(false)
    const dragTarget = useRef(new THREE.Vector3());
    const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0,1,0), 0))
	const gltf = useGLTF(glbPath);
	const spawnHeight = 250;
	const groundPos = -1000;
    const { camera, mouse, raycaster } = useThree();

    const handlePointerDown = (e) => {
  e.stopPropagation()
  dragging.current = true
  furnitureRef.current.setBodyType(RigidBodyType.KinematicVelocityBased, true)
  furnitureRef.current.setGravityScale(0, true)
  const current =furnitureRef.current.translation()
  const currentVec3 = new THREE.Vector3(current.x, current.y, current.z)

  dragPlane.current.setFromNormalAndCoplanarPoint(
    camera.getWorldDirection(new THREE.Vector3()).negate(),
    currentVec3
  )
}

const handlePointerUp = (e) => {
  dragging.current = false
  furnitureRef.current.setGravityScale(1, true)
  furnitureRef.current.setBodyType(RigidBodyType.Dynamic, true)
}

      useFrame(() => {
    if (!dragging.current) return

    raycaster.setFromCamera(mouse, camera)
    raycaster.ray.intersectPlane(
      dragPlane.current,
      dragTarget.current
    )
  })

	useFrame(({ camera }) => {
		if (!furnitureRef.current || dragging.current) return;
        console.log("camera and not dragging(?)", dragging.current)

		const { y } = furnitureRef.current.translation();

		if (y < groundPos) {
			let width = 0;
			let height = 0;

			if (canvasRef.current) {
				const rect = canvasRef.current.getBoundingClientRect();
				width = rect.width;
				height = rect.height;
			}

			const distance = spawnHeight - camera.position.y;
			const fov = camera.fov;
			const aspect = width / height;
			const visibleHeight = 2 * distance * Math.tan((fov * Math.PI) / 180 / 2);
			const visibleWidth = visibleHeight * aspect;
			const randomX = (Math.random() - 0.5) * visibleWidth;

			furnitureRef.current.setTranslation(
				{
					x: randomX,
					y: spawnHeight,
					z: initialPosition[2],
				},
				true,
			);

			// Adding a little more spin factor for good measure
			furnitureRef.current.setLinvel(
				{ x: getRandomIntInclusive(RANDOMMIN, RANDOMMAX), y: 0, z: 0 },
				true,
			);
			furnitureRef.current.setAngvel(
				{
					x: Math.random() * 4 - 1,
					y: Math.random() * 4 - 1,
					z: Math.random() * 2 - 1,
				},
				true,
			);
			furnitureRef.current.wakeUp();
		}
	});

    useFrame(() => {
        if (!dragging.current || !furnitureRef.current) return 

        const current = furnitureRef.current.translation();
        const target = dragTarget.current;
        raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(dragPlane.current, dragTarget.current)

        furnitureRef.current.setLinvel(
    {
      x: (target.x - current.x) * 10,
      y: (target.y - current.y) * 10,
      z: 0,
    },
    true
  )
    })

	return (
		<DragControls
			objects={furnitureRef.current ? [furnitureRef.current] : []}
			tranformGroup={false}
			// onDragStart={() => {
			// 	if (furnitureRef.current) {
            //         dragging.current = true;
			// 		furnitureRef.current.setBodyType(
			// 			RigidBodyType.KinematicVelocityBased,
			// 			true,
			// 		);
            //         furnitureRef.current.setGravityScale(0, true)
            //         furnitureRef.current.setLinvel({ x: 0, y: 0, z: 0}, true)
            //         dragPlane.current.set(new THREE.Vector3(0, 1, 0), -furnitureRef.current.translation().y)
			// 	}
			// }}
			// onDragEnd={() => {
			// 	if (furnitureRef.current) {
            //         dragging.current = false; 
            //         furnitureRef.current.setGravityScale(1, true);
			// 		furnitureRef.current.setBodyType(RigidBodyType.Dynamic, true);
			// 	}
			// }}
		>
			<RigidBody
				ref={furnitureRef}
				colliders="cuboid"
				restitution={2}
				angularDamping={0.2}
				angularVelocity={[0.3, 0.3, 0]}
				position={initialPosition}
			>
				<primitive object={gltf.scene} onPointerUp={handlePointerUp} onPointerDown={handlePointerDown}/>
			</RigidBody>
		</DragControls>
	);
}

export const TestScene = () => {
	const projects = furnitures.map(({ glb: [glb] }) => glb);
	const canvasRef = useRef<HTMLDivElement>(null);
	const gravity = getRandomIntInclusive(RANDOMMIN, RANDOMMAX);

	return (
		<div className="h-screen w-full" ref={canvasRef}>
			<Canvas camera={{ position: [0, 0, 300] }}>
				<ambientLight intensity={0.1} />
				<directionalLight color="#dfdedf" position={[0, 0, 5]} />
				<Suspense>
					<Physics gravity={[gravity, -20, 0]} debug>
						{projects.map((project) => {
							return (
								<Furniture
									key={project}
									initialPosition={[
										getRandomIntInclusive(RANDOMMIN, RANDOMMAX),
										250,
										0,
									]}
									canvasRef={canvasRef}
									glbPath={project}
								/>
							);
						})}
					</Physics>
				</Suspense>
			</Canvas>
		</div>
	);
};
