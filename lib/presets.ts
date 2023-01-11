interface HParams {
  [key: string]: {
    n: number;
    d: number;
  };
}

const models = ["chinchilla", "gopher", "gpt3", "lamda", "mt_nlg", "palm"];

const hparams: HParams = {
  chinchilla: {
    n: 70,
    d: 1400,
  },
  gopher: {
    n: 280,
    d: 300,
  },
  gpt3: {
    n: 175,
    d: 300,
  },
  lamda: {
    n: 137,
    d: 168,
  },
  mt_nlg: {
    n: 530,
    d: 270,
  },
  palm: {
    n: 540,
    d: 780,
  },
};

export { models, hparams };
