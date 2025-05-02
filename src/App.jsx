import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, SoftShadows, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Physics } from "@react-three/rapier";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  const [downgradePerformance, setDowngradePerformance] = useState(false);

  return (
    <>
      <Loader />
      <Leaderboard />
      <Canvas shadows camera={{ position: [0, 30, 0], fov: 30, near: 2 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#242424"]} />
        <SoftShadows size={42} />
        <PerformanceMonitor
          onDecline={(fps) => {
            setDowngradePerformance(true);
          }}
        />
        <Suspense>
          <Physics>
            <Experience downgradePerformance={downgradePerformance} />
          </Physics>
        </Suspense>
        {!downgradePerformance && (
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </>
  );
}

export default App;
