import { Environment } from "@react-three/drei";
import { insertCoin, isHost, onPlayerJoin, Joystick, myPlayer, useMultiplayerState } from "playroomkit";
import { Map } from "./Map";
import { useEffect, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Bullet } from "./Bullet";
import { BulletHit } from "./BulletHit";


export const Experience = ({ downgradePerformance = false }) => {
  const [players, setPlayers] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [networkBullets, setNetworkBullets] = useMultiplayerState("bullets", []);

  const [hits, setHits] = useState([]);
  const [networkHits, setNetworkHits] = useMultiplayerState("hits", []);

  const start = async () => {
    await insertCoin();
    console.log("Game started");

    onPlayerJoin((state) => {
      console.log("Player joined:", state.id);
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "shoot", label: "Shoot" }],
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
  };

  useEffect(() => {
    start();
  }, [])

  const onFire = (bullet) => {
    setBullets((bullets) => [...bullets, bullet]);
  };

  const onHit = (bulletId, position) => {
    setBullets((bullets) => bullets.filter((b) => b.id !== bulletId));
    setHits((hits) => [...hits, { id: bulletId, position }]);
  };

  const onHitEnded = (hitId) => {
    setHits((hits) => hits.filter((h) => h.id !== hitId));
  };

  useEffect(() => {
    setNetworkBullets(bullets);
  }, [bullets]);

  useEffect(() => {
    setNetworkHits(hits);
  }, [hits]);

  const onKilled = (_victim, killer) => {
    const killerState = players.find((p) => p.state.id === killer).state;
    killerState.setState("kills", killerState.state.kills + 1);
  };

  return (
    <>
      <Map />
      {players.map(({state, joystick}, index) => (
        <CharacterController 
          key={state.id} 
          state={state} 
          joystick={joystick} 
          userPlayer={state.id === myPlayer()?.id}
          onFire={onFire}
          onKilled={onKilled}
          downgradePerformance={downgradePerformance}
        />
      ))}
      {(isHost() ? bullets : networkBullets).map((bullet) => (
        <Bullet key={bullet.id} {...bullet} onHit={() => onHit(bullet.id)} />
      ))}
      {(isHost() ? hits : networkHits).map((hit) => (
        <BulletHit key={hit.id} {...hit} onHitEnded={(position) => onEnded(hit.id, position)} />
      ))}
      <Environment preset="sunset" />
    </>
  );
};
