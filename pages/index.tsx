import Head from "next/head";
import { useState } from "react";
import ModeSelector from "../components/ModeSelector";
import Modalities from "../components/Modalities";
import Calculator from "../components/Calculator";
import { setModality } from "../lib/llm";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState("Params");

  const modalities = ["code", "image", "speech", "text"];
  const [selectedModality, setSelectedModality] = useState(modalities[0]);

  const setGlobalModality = (modality: string) => {
    setSelectedModality(modality);
    setModality(modality);
  };

  return (
    <>
      <Head>
        <title>Compute-Optimal LLMs</title>
        <meta name="description" content="Chinchilla changed everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-2/3 m-5 mx-auto">
        <h1 className="text-3xl text-gray-200">Compute-Optimal LLMs</h1>
        <p className="text-base text-gray-300">
          This tool helps you find the optimal LLM given your compute budget.
          Alternatively, you can also use it to find the optimal compute budget
          for a planned model. The tool is highly based on the work of{" "}
          <a
            className="text-blue-300 hover:border-b hover:border-blue-300"
            href="https://arxiv.org/abs/2001.08361"
          >
            Kaplan et. al (2020)
          </a>
          ,{" "}
          <a
            className="text-blue-300 hover:border-b hover:border-blue-300"
            href="https://arxiv.org/abs/2203.15556"
          >
            Hoffman et. al (2022)
          </a>
          , and most recently with new results on varying modalities,{" "}
          <a
            className="text-blue-300 hover:border-b hover:border-blue-300"
            href="https://arxiv.org/abs/2301.03728"
          >
            Aghajanyan et. al (2023)
          </a>
          . I do not make any claims about the accuracy of these predictions,
          but merely provide a tool to try to easily calculate what these
          predictions actually mean for your model.
        </p>
      </main>
      <section className="w-2/3 m-5 mx-auto">
        {/* <ModelSelector model={preset} models={models} setModel={switchPreset} /> */}
        <h3 className="text-lg text-gray-200 ml-0 pt-2 border-t border-gray-200">
          Choose a modality (data type)
        </h3>
        <Modalities
          modalities={modalities}
          modality={selectedModality}
          setModality={setGlobalModality}
        />
        <h3 className="text-lg text-gray-200 ml-0 mt-3">
          What do you want to calculate?
        </h3>
        <ModeSelector selected={selectedMode} setSelected={setSelectedMode} />
        <div className="mt-5">
          <Calculator
            modality={selectedModality}
            mode={selectedMode}
            preset={"test"}
          />
        </div>
      </section>

      <footer>
        <p className="text-gray-300 text-sm text-center">
          Made by{" "}
          <a
            className="text-blue-300 hover:border-b hover:border-blue-300"
            href="https://twitter.com/calum-birdo"
          >
            Calum Bird
          </a>
          . Source code available on{" "}
          <a
            className="text-blue-300 hover:border-b hover:border-blue-300"
            href="https://github.com/calum-bird/howmanyparams.com"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </>
  );
}
