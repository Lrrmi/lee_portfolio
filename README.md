# Portfolio

This project showcases my skills, work, and projects in a clean, modern, and interactive interface

---

## Tech Stack

* **Frontend:** React, TanstackRouter
* **Styling:** Tailwind CSS, shadcn UI components
* **Routing:** Client-side routing for project pages
* **3D Web Effects:** React Three Fiber, Rapier, Drei

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/lrrmi/lee_portfolio.git
cd lee_portfolio
```

2. Install dependencies:

```bash
pnpm install
```

3. Run locally:

```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Update Assets 

### Adding project images
1. Inside [src/assets/images](src/assets/images) create a new folder prefixed with a number and the title of the project
2. Drag and drop the jpgs, png, and glb into the newly created folder
3. Create a meta.json file and insert a title and description in the format similar to the below example 
```bash{
	"title": "Seville",
	"description": "Seville’s modern style is designed to appeal to a broad audience through its configurable nature and clean form that allows it to take to various finishes."
}
```
4. Run script


### Adding potpourri images
1. Inside [src/assets/images/potpourri](src/assets/images/potpourri) drag and drop a jpg file in this file location 
2. Run script by opening up a new terminal and running the command `pnpm prebuild`
You should see after it runs something that says `images.json generated, ignoring folders:`...

### Adding models
1. Inside [src/assets/models](src/assets/models) drag and drop a glb file in this file location
(you do not need to run script for this)

---

## Deploy project
1. Run `pnpm deploy`

---

## License

This project is open source under the [MIT License](LICENSE).

---

## Contact

* **Email:** [rmladams25@gmail.com](mailto:rmladams25@gmail.com)
* **GitHub:** [github.com/lrrmi](https://github.com/yourusername)
* **LinkedIn:** [linkedin.com/in/robertleeadams](https://www.linkedin.com/in/robertleeadams)
