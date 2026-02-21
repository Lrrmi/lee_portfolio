import { RigidBodyType } from "@dimforge/rapier3d-compat";
import { useGLTF } from "@react-three/drei";
import { type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { getRandomIntInclusive } from "./FallingFurnitureScene";

type FallingCubeProps = {
	canvasRef: RefObject<HTMLDivElement | null>;
	glbPath: string;
	index: number;
};

const RANDOMMIN = -50;
const RANDOMMAX = 50;
const SPAWNHEIGHT = 250;

// TODO Clean this function up
export const Furniture = ({ index, canvasRef, glbPath }: FallingCubeProps) => {
	const furnitureRef = useRef<RapierRigidBody | null>(null);
	const dragging = useRef(false);
	const dragTarget = useRef(new THREE.Vector3());
	const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
	const gltf = useGLTF(glbPath);
	const spawn = useRef({
		x: getRandomIntInclusive(RANDOMMIN, RANDOMMAX),
		y: SPAWNHEIGHT + index * 250,
		z: 0,
	});

	const groundPos = -1000;
	const { camera, mouse, raycaster } = useThree();

	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		if (!furnitureRef.current) return;

		dragging.current = true;
		furnitureRef.current.setBodyType(
			RigidBodyType.KinematicVelocityBased,
			true,
		);
		furnitureRef.current.setGravityScale(0, true);
		const current = furnitureRef.current.translation();
		const currentVec3 = new THREE.Vector3(current.x, current.y, current.z);

		dragPlane.current.setFromNormalAndCoplanarPoint(
			camera.getWorldDirection(new THREE.Vector3()).negate(),
			currentVec3,
		);
	};

	useEffect(() => {
		const release = () => {
			if (!dragging.current || !furnitureRef.current) return;

			dragging.current = false;

			furnitureRef.current.setGravityScale(1, true);
			furnitureRef.current.setBodyType(RigidBodyType.Dynamic, true);
		};

		if (!furnitureRef.current) return;

		furnitureRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

		furnitureRef.current.setAngvel(
			{
				x: Math.random() * 4 - 1,
				y: Math.random() * 4 - 1,
				z: Math.random() * 2 - 1,
			},
			true,
		);

		window.addEventListener("pointerup", release);
		return () => window.removeEventListener("pointerup", release);
	}, []);

	useFrame(() => {
		if (!dragging.current) return;

		raycaster.setFromCamera(mouse, camera);
		raycaster.ray.intersectPlane(dragPlane.current, dragTarget.current);
	});

	useFrame(({ camera }) => {
		if (!furnitureRef.current || dragging.current) return;

		const { y } = furnitureRef.current.translation();

		if (y < groundPos) {
			let width = 0;
			let height = 0;

			if (canvasRef.current) {
				const rect = canvasRef.current.getBoundingClientRect();
				width = rect.width;
				height = rect.height;
			}

			const distance = SPAWNHEIGHT - camera.position.y;
			// @ts-ignore
			const fov = camera.fov;
			const aspect = width / height;
			const visibleHeight = 2 * distance * Math.tan((fov * Math.PI) / 180 / 2);
			const visibleWidth = visibleHeight * aspect;
			const randomX = (Math.random() - 0.5) * visibleWidth;

			furnitureRef.current.setTranslation(
				{
					x: randomX,
					y: SPAWNHEIGHT,
					z: 0,
				},
				true,
			);

			furnitureRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
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
		if (!dragging.current || !furnitureRef.current) return;

		const current = furnitureRef.current.translation();
		const target = dragTarget.current;
		raycaster.setFromCamera(mouse, camera);
		raycaster.ray.intersectPlane(dragPlane.current, dragTarget.current);

		furnitureRef.current.setLinvel(
			{
				x: (target.x - current.x) * 10,
				y: (target.y - current.y) * 10,
				z: 0,
			},
			true,
		);
	});

	return (
		<RigidBody
			ref={furnitureRef}
			colliders="cuboid"
			restitution={0}
			friction={1.2}
			mass={8}
			linearDamping={0.5}
			angularDamping={0.5}
			enabledTranslations={[true, true, false]}
			enabledRotations={[true, true, true]}
			position={[spawn.current.x, spawn.current.y, spawn.current.z]}
		>
			<primitive object={gltf.scene} onPointerDown={handlePointerDown} />
		</RigidBody>
	);
};
