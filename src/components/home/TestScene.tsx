import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import furnitures from "../../images.json";
import { Furniture } from "./Furniture";

export const getRandomIntInclusive = (min: number, max: number) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const RANDOMMIN = -50;
const RANDOMMAX = 50;

export const TestScene = () => {
	const projects = furnitures.map(({ glb: [glb] }) => glb);
	const canvasRef = useRef<HTMLDivElement>(null);
	const gravity = getRandomIntInclusive(RANDOMMIN, RANDOMMAX);

	return (
		<div className="h-screen w-full" ref={canvasRef}>
			<Canvas camera={{ position: [0, 0, 300] }}>
				<ambientLight intensity={0.1} />
				<directionalLight color="#dfdedf" position={[0, 0, 5]} />
				<Suspense fallback={null}>
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
