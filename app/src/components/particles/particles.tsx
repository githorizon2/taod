import BaseParticles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import { options } from "./consts";

export const Particles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      setInit(true);
    };

    init();
  }, []);

  if (init) {
    return <BaseParticles id="tsparticles" options={options} />;
  }

  return <></>;
};
