import { Separator } from "@/components/ui/separator";

export const ContactPage = () => {
	return (
		<div className="w-5/6 mx-auto">
			<div className="flex flex-row flex-1 text-[#dfdedf]">
				<div className="contact">
					<div>
						<br />
						<h2 className="text-4xl">Contact</h2>
						<br />
						<p>
							For inquire about new projects or design services please email me
							at:
						</p>
						<br />
						<div>
							<p>
								LinkedIn:
								<a
									className="underline ml-1 md:ml-25"
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									https://www.linkedin.com/in/robertleeadams
								</a>
							</p>
						</div>
						<br />
						<div>
							<p>
								Email:
								<span className="ml-1 md:ml-30">rmladams25@gmail.com</span>
							</p>
						</div>
						<br />
						<br />
						<h2 className="text-4xl">Services</h2>
						<br />
						<div>
							<p>Product & Furniture Design Services</p>
							<br />
							<p>3D Concept/Render Modeling & Production Modeling</p>
							<br />
							<p>Rendering & Drafting</p>
							<br />
							<p>Small & Full Scale Prototyping services</p>
							<br />
							<br />
							<br />
						</div>

						<br />
					</div>
				</div>
			</div>

			<Separator />
			<br />
			<br />
		</div>
	);
};
