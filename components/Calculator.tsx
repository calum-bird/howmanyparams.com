import { useEffect, useState } from "react";
import { setModality, loss, flops, n_opt, d_opt } from "../lib/llm";
import { hparams, models } from "../lib/presets";

interface CalculatorConfig {
  [key: string]: {
    enable_n: boolean;
    enable_d: boolean;
    enable_f: boolean;
    enable_l: boolean;
  };
}

const configs: CalculatorConfig = {
  Params: {
    enable_n: false,
    enable_d: false,
    enable_f: true,
    enable_l: false,
  },
  FLOPs: {
    enable_n: true,
    enable_d: true,
    enable_f: false,
    enable_l: false,
  },
  Loss: {
    enable_n: true,
    enable_d: true,
    enable_f: false,
    enable_l: false,
  },
};

export default function Calculator({
  modality,
  mode,
  preset,
}: {
  modality: string;
  mode: string;
  preset: string;
}) {
  const config = configs[mode];

  const [n, setN] = useState(0);
  const [d, setD] = useState(0);
  const [f, setF] = useState(0);
  const [l, setL] = useState(0);

  useEffect(() => {
    // Set defaults to preset
    if (hparams[preset] !== undefined) {
      setN(hparams[preset].n);
      setD(hparams[preset].d);
    }

    if (config.enable_n) {
      setN(n);
    }
    if (config.enable_d) {
      setD(d);
    }
    if (config.enable_n && config.enable_d) {
      let f = flops(n, d);
      setF(f);
    }
    if (config.enable_f) {
      setF(f);
    }
    if (config.enable_l) {
      setL(l);
    }

    if (mode === "Params") {
      let n = n_opt(f);
      let d = d_opt(f);
      let l = loss(n, d);
      setL(l);
      setN(n);
      setD(d);
    }
    if (mode === "FLOPs") {
      let f = flops(n, d);
      let l = loss(n, d);
      setF(f);
      setL(l);
    }
    if (mode === "Loss") {
      setN(n);
      setD(d);
      setL(loss(n, d));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, d, f, l, mode, preset, modality]);

  return (
    <form className="space-y-8 divide-y divide-gray-500">
      <div className="space-y-8 divide-y divide-gray-500">
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-300">
              {mode === "Params" &&
                "Calculate the optimal model size given a training budget."}
              {mode === "FLOPs" &&
                "Calculate the FLOPs required to optimally train a model."}
              {mode === "Loss" &&
                "Calculate the predicted loss of an optimally-trained model."}
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-300"
              >
                Parameters (model size, billions)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  disabled={!config.enable_n}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm disabled:bg-gray-400"
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-300"
              >
                Tokens (trained on, billions)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  disabled={!config.enable_d}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm disabled:bg-gray-400"
                  value={d}
                  onChange={(e) => setD(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-300"
              >
                FLOPs (training budget, e21)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  disabled={!config.enable_f}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm disabled:bg-gray-400"
                  value={f == 0 ? "" : (f / 1e21).toFixed(2)}
                  onChange={(e) => setF(parseInt(e.target.value) * 1e21)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-300"
              >
                Loss (optimally-trained model)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  disabled={!config.enable_l}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300 sm:text-sm disabled:bg-gray-400"
                  value={l}
                  onChange={(e) => setL(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
