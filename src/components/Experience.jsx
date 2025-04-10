import { OrbitControls, Environment } from "@react-three/drei";
import { insertCoin } from "playroomkit";
import { Map } from "./Map";
import { useEffect } from "react";


export const Experience = () => {
  const start = async () => {
    await insertCoin();
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <directionalLight
        position={[25, 18, -25]}
        intensity={0.3}
        castShadow
        shadow-camera-near={0}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0001}
      />
      <OrbitControls />
      <Map />
      <Environment preset="sunset" />
    </>
  );
};
