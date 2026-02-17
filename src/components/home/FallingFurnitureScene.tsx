import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { Furnitures } from "./Furnitures";

export const getRandomIntInclusive = (min: number, max: number) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export const FallingFurnitureScene = () => {
	const canvasRef = useRef<HTMLDivElement>(null);

	return (
		<div className="h-screen w-full touch-none" ref={canvasRef}>
			<Canvas camera={{ position: [0, 0, 300] }}>
				<ambientLight intensity={0.1} />
				<directionalLight color="#dfdedf" position={[0, 0, 5]} />
				<Suspense fallback={null}>
					<Physics gravity={[0, -20, 0]}>
						<Furnitures canvasRef={canvasRef} />
					</Physics>
				</Suspense>
			</Canvas>
		</div>
	);
};
