// Default to code.
let A = 611.91;
let B = 4484.08;
let E = 0.16;

let alpha = 0.37;
let beta = 0.32;

// Funcs for optimal models
const GetG = (_alpha: number, _A: number, _beta: number, _B: number) => {
  return ((_alpha * _A) / (_beta * _B)) ** (1 / (_alpha + _beta));
};

let G = GetG(alpha, A, beta, B);
let a = beta / (alpha + beta);
let b = alpha / (alpha + beta);

const setModality = (modality: string) => {
  switch (modality) {
    case "code":
      A = 611.91;
      B = 4484.08;
      E = 0.16;
      alpha = 0.37;
      beta = 0.32;
      break;
    case "text":
      A = 492.51;
      B = 1987.4;
      E = 2.42;
      alpha = 0.18;
      beta = 0.22;
      break;
    case "image":
      A = 340.96;
      B = 875.3;
      E = 2.84;
      alpha = 0.13;
      beta = 0.13;
    case "speech":
      A = 154.45;
      B = 205.1;
      E = 3.02;
      alpha = 0.31;
      beta = 0.24;
      break;
    default:
      throw new Error("Invalid modality");
  }

  G = GetG(alpha, A, beta, B);
  a = beta / (alpha + beta);
  b = alpha / (alpha + beta);
};

/**
 * Compute the predicted loss for a model trained with `n` billion parameters, on `d` billion tokens
 */
const loss = (
  n: number,
  d: number,
  A_ = A,
  B_ = B,
  alpha_ = alpha,
  beta_ = beta
) => {
  // n, d in billions
  n = n * 1e9;
  d = d * 1e9;
  return E + A_ / n ** alpha_ + B_ / d ** beta_;
};

/**
 * Compute the FLOPS required for a model trained with `n` billion parameters, on `d` billion tokens
 */
const flops = (n: number, d: number) => {
  // n, d in billions
  n = n * 1e9;
  d = d * 1e9;
  return 6 * n * d;
};

/**
 * Compute the optimal number of parameters with which to train a model optimally using `c` FLOPS.
 */
const n_opt = (c: number, G_ = G, a_ = a, b_ = b) => {
  return (G_ * (c / 6) ** a_) / 1e9;
};

/**
 * Compute the optimal number of tokens with which to train a model optimally using `c` FLOPS.
 */
const d_opt = (c: number, G_ = G, a_ = a, b_ = b) => {
  return ((1 / G_) * (c / 6) ** b_) / 1e9;
};

export { setModality, loss, flops, n_opt, d_opt };
