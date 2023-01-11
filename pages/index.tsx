import Head from "next/head";
import { useEffect, useState } from "react";
import { loss, flops, n_opt, d_opt } from "../lib/llm";
import { hparams, models } from "../lib/presets";
import ModelSelector from "../components/ModelSelector";
import ModeSelector from "../components/ModeSelector";

export default function Home() {
  const [preset, setPreset] = useState("palm");

  const [n, setN] = useState(0);
  const [d, setD] = useState(0);
  const [f, setF] = useState(0);
  const [l, setL] = useState(0);
  const [nopt, setNopt] = useState(0);
  const [dopt, setDopt] = useState(0);

  const [mode, setMode] = useState("optimal");

  useEffect(() => {
    // Update all our predictions based on n and d
    const f = flops(n, d);
    const l = loss(n, d);
    setF(f);
    setL(l);
    setNopt(n_opt(f));
    setDopt(d_opt(f));

    console.group("LLM Computations");
    console.log("f", f);
    console.log("l", l);
    console.log("n + n_opt", n, n_opt(f));
    console.log("d + d_opt", d, d_opt(f));
    console.groupEnd();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, n]);

  const switchPreset = (preset: string) => {
    setPreset(preset);
    setN(hparams[preset].n);
    setD(hparams[preset].d);
  };

  return (
    <>
      <Head>
        <title>Compute-Optimal LLMs</title>
        <meta name="description" content="Chinchilla changed everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-5">
        <h1 className="text-3xl text-gray-200">Compute-Optimal LLMs</h1>
        <p className="text-base text-gray-300">
          This tool helps you find the optimal LLM given your compute budget.
          Alternatively, you can also use it to find the optimal compute budget
          for a planned model.
        </p>
      </main>
      <section className="w-full md:w-1/2 m-5">
        <ModelSelector model={preset} models={models} setModel={switchPreset} />
        <ModeSelector setMode={setMode} />
        {mode === "optimal" && (
          <div>
            <h3 className="text-white text-xl">Optimal Model Size</h3>
          </div>
        )}
        {mode === "cost" && (
          <div>
            <h3 className="text-white text-xl">Model Cost Finder</h3>
          </div>
        )}
      </section>
    </>
  );
}
