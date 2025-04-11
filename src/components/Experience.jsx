import { OrbitControls, Environment } from "@react-three/drei";
import { insertCoin, onPlayerJoin, Joystick } from "playroomkit";
import { Map } from "./Map";
import { useEffect, useState } from "react";


export const Experience = () => {
  const [players, setPlayers] = useState([]);

  const start = async () => {
    await insertCoin();
  }

  useEffect(() => {
    start();

    onPlayerJoin((state) => {
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "fire", label: "Shoot" }],
      });
      const newPlayer = { state, joystick };
      state.setState("health", 100);
      state.setState("deaths", 0);
      state.setState("kills", 0);
      setPlayers((players) => [...players, newPlayer]);
      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id));
      });
    });
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
