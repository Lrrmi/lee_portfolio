import { DragControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { RigidBodyType } from "@dimforge/rapier3d-compat"
import { type RefObject, Suspense, useRef } from "react";
import furnitures from "../../images.json";

// recolor te model
// fix the physics so touch and grab can happen
// Add walls(?)
// Randomize models to appear
// Add loading icon for suspense
type FallingCubeProps = {
	initialPosition: [number, number, number];
	spawnHeight: number;
	groundPos: number;
	canvasRef: RefObject<HTMLDivElement | null>;
	glbPath: string;
	furnitureRef: RefObject<RapierRigidBody | null>;
};

function getRandomIntInclusive(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const RANDOMMIN = -50;
const RANDOMMAX = 50;

function Furniture({
	initialPosition,
	spawnHeight,
	groundPos,
	canvasRef,
	glbPath,
	furnitureRef
}: FallingCubeProps) {

	const gltf = useGLTF(glbPath);

	useFrame(({ camera }) => {
		if (!furnitureRef.current) return;

		const { y } = furnitureRef.current.translation()

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

	return (
		<RigidBody
			ref={furnitureRef}
			colliders="cuboid"
			restitution={2}
			angularDamping={0.2}
			angularVelocity={[0.3, 0.3, 0]}
			position={initialPosition}
		>
			<primitive object={gltf.scene.clone()} />
		</RigidBody>
	);
}

export const TestScene = () => {
	const projects = furnitures.map(({ glb: [glb] }) => glb);
	const canvasRef = useRef<HTMLDivElement>(null);
	const furnitureRef = useRef<RapierRigidBody | null>(null);

	const spawnHeight = 250;
	const groundPos = -1000;
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
								<DragControls
									key={project+"dragcontrol"}
									objects={furnitureRef.current ? [furnitureRef.current] : []}
									tranformGroup={false}
									onDragStart={() => {
											if (furnitureRef.current) {
												furnitureRef.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
											}
										
									}}
									onDragEnd={() => {
											if (furnitureRef.current) {
                                                furnitureRef.current.setBodyType(RigidBodyType.Dynamic, true);
                                            }
									}}
								>
									<Furniture
										initialPosition={[
											getRandomIntInclusive(RANDOMMIN, RANDOMMAX),
											250,
											0,
										]}
										spawnHeight={spawnHeight}
										groundPos={groundPos}
										canvasRef={canvasRef}
										glbPath={project}
										furnitureRef={furnitureRef}
									/>
								</DragControls>
							);
						})}
					</Physics>
				</Suspense>
			</Canvas>
		</div>
	);
};
