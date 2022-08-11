# Boids Experient
## Made with Vite | React 18 | Tailwind CSS | TypeScript | HTML5 Canvas

### What is this?

A quick experiment to play about with the latest React hooks feaures as well as
have fun with some 2D physics and collision detection.

#### Features
x You can spawn lots of boids which collide with each other and the canvas bounds
x You can clear them
x You can toggle an interactive heat map grid
x You can toggle between high/low performance modes
x You can see and toggle an FPS display
x No WebGL or anthing fancy, just standard HTML5 Canvas
x Reasonably clean...

## How to use?

1. Clone this Git Repo
2. cd to the 'boids' folder
3. npm install
4. npm run dev
5. A localhost instance should be generated for you

## Anything interesting?

There is a low and high performance mode that can be toggled via the UI,
what this does is swap between a O(n^2) collision sweep and a O(2^n) complexity
which significanly improves the end result.

The boids collide fairly well even in the optmized settings and the code is clean
enough for people to learn from if they woud like to.
 
