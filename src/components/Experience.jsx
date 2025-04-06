import { OrbitControls, Environment } from "@react-three/drei";
import { Map } from "./Map";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Map />
      <Environment preset="sunset" />
    </>
  );
};
