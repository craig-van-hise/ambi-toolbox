import numpy as np

# Test einsum for cov and eig
F = 4
N = 10
X_m = np.random.randn(F, 2) + 1j * np.random.randn(F, 2)
R_m = np.einsum('fi,fj->fij', X_m, X_m.conj())

evals, evecs = np.linalg.eigh(R_m)
w1 = evecs[..., 1]
comp_P = np.einsum('fi,fi->f', w1.conj(), X_m)
P = w1 * comp_P[:, None]
print("Shape of P:", P.shape)
