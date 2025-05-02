# 3D Shooter Game

A multiplayer 3D shooter game built with React Three Fiber, Rapier Physics, and PlayroomKit.

## Features

- 🎮 Real-time multiplayer gameplay
- 🎯 First-person shooter mechanics
- 🏃‍♂️ Character movement with joystick controls
- 🎨 Customizable character colors
- 🌍 Physics-based movement and collisions
- 🎥 Dynamic camera controls
- 🔫 Weapon system with fire rate control
- 💀 Death and respawn mechanics

To have it accessible from your mobile run
```
yarn dev --host
```
_It must be connected to the same network_

![image](https://user-images.githubusercontent.com/6551176/221732091-23ee52cb-4150-42fa-b998-43628d7a6b0d.png)

## Tech Stack

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) - Physics engine
- [@react-three/drei](https://github.com/pmndrs/drei) - Useful helpers for React Three Fiber
- [PlayroomKit](https://playroomkit.dev/) - Multiplayer functionality
- [Three.js](https://threejs.org/) - 3D graphics library
- [Vite](https://vitejs.dev/) - Build tool and dev server

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
yarn
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Controls

- **Movement**: Use the joystick to move your character
- **Shooting**: Click the "Shoot" button on the joystick
- **Camera**: The camera follows your character automatically

## Project Structure

```
src/
├── components/
│   ├── CharacterController.jsx  # Player movement and controls
│   ├── CharacterSoldier.jsx     # Character model and animations
│   ├── Experience.jsx          # Main game scene
│   └── Map.jsx                 # Game map and environment
├── App.jsx                     # Root component
└── main.jsx                    # Entry point
```

## Physics and Movement

The game uses Rapier Physics for realistic movement and collisions:
- Characters use `RigidBody` with `CapsuleCollider` for collision detection
- Movement is physics-based with impulse forces
- Characters have locked rotations to prevent tipping
- Network synchronization of player positions

## Multiplayer Features

- Real-time player synchronization
- Player state management (health, deaths, kills)
- Host/client architecture for physics calculations
- Player join/quit handling

## Development

The project uses Vite for fast development and building. Key development features:
- Hot Module Replacement (HMR)
- TypeScript support
- Optimized production builds
- Development server with automatic reloading

