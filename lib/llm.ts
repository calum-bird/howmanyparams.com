const A = 406.4;
const B = 410.7;

const alpha = 0.34;
const beta = 0.28;
//const alpha = 0.5;
//const beta = 0.5;

// Funcs for pre-existing models

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
  return 1.69 + A_ / n ** alpha_ + B_ / d ** beta_;
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

// Funcs for optimal models
const G = ((alpha * A) / (beta * B)) ** (1 / (alpha + beta));

const a = beta / (alpha + beta);
const b = alpha / (alpha + beta);

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

export { loss, flops, n_opt, d_opt };
