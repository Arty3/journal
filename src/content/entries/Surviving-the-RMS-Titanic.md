---
title: Surviving the RMS Titanic
description: Who needs PyTorch anyways?
tags:
  - Machine Learning
  - Data Science
  - Math
draft: false
written: Aug 2026
project: 2024
status: Concluded
---

## Preliminaries

I don't have a lot of time today, so I thought I would write about one of the first times I properly "lifted the hood" on machine learning.

Today, I work as an AI Engineer. A large part of my job revolves around building systems and applications around machine-learning models, so data science is hardly foreign territory to me anymore.

But, as with all things, it once was.

Before this project, I had already spent years experimenting with machine learning. Unfortunately, much of that work has since been lost to a faulty hard drive. At the time, though, I approached machine learning almost entirely as a practical tool: I had some crazy idea, a model could help me realize it, and that was usually enough.

Then I got my hands on an assignment from a university bachelor's programme on non-linear optimization.

There was no PyTorch. No TensorFlow. No Keras. Just NumPy.

If you've read some of my other entries, you'll know that I often return to the subject of abstractions. Machine-learning frameworks are enormous abstractions: underneath the convenient calls to `fit()` lies mathematics, numerical optimization, carefully engineered software, and eventually hardware.

None of this was some revelation about the nature of machine learning. I simply hadn't spent much time thinking about it before.

So I decided to work through the assignment myself.

The project itself is not particularly remarkable. Logistic regression is elementary material in statistics and machine learning, and what follows would be routine to someone formally studying either subject.

That's partly why I want to record it.

I tend to think of my own work as having crossed a gradual threshold somewhere around this period. Earlier, curiosity mostly meant wanting to **make things**. I didn't particularly care why something worked, what sat underneath it, or whether there was a better way to do it. If an idea sounded fun, I wanted to see whether I could make it real.

There is nothing wrong with that. In fact, that instinct is still very much there.

What changed was that I increasingly became interested in the layers underneath those ideas as well. Why does this work? What assumptions are being made? What is the abstraction hiding? Could I build the thing underneath the thing I am using?

There is, however, a second reason to why I want to record this entry. This was one of the earliest times I formally worked through a problem like this — perhaps even the earliest.

I worked through the problem on paper, wrote out the mathematics, cleaned up the reasoning, and only then translated it into a direct implementation. That process has since become a habit in much of my work, and one I now consider important. And you know, I was quite literally the worst student in my math classes growing up. And while I'm no mathematician now — I still need to pull out a calculator more often than I should — I've slowly been developing my skills further, which is something I pride myself with very much.

Unfortunately, after looking through my old documents, the original paper where I worked through the problem seems to be lost. It would have been nice to include a photo of it here, both as part of the process and as a small record of how I approached the work at the time, with all of my scribbles and terrible diagonal writing.

This little exercise was one of the earlier examples I can remember of deliberately doing that.

I will write more about this change in the future, but for now, with that context out of the way, let's sink the Titanic.

## Surviving the Titanic

In April 1912, the RMS Titanic departed Southampton for New York City, stopping at Cherbourg and Queenstown before beginning its crossing of the Atlantic.

The ship famously never arrived.

More than 1,500 of the roughly 2,200 passengers and crew aboard died in the disaster.

For our purposes, survival was not distributed uniformly among the people aboard. Factors such as passenger class, sex, age, family relationships, and fare were associated with substantially different survival outcomes.

That makes the Titanic dataset a convenient binary-classification problem: given what we know about a passenger, can we estimate whether that passenger survived?

> [!NOTE]
> The following work uses the [Titanic dataset](https://www.openml.org/search?type=data&sort=version&status=any&order=asc&exact_name=Titanic&id=40945) from OpenML.

## Data Set Overview

The dataset contains the following variables:

| Feature      | Description                                             |
| ------------ | ------------------------------------------------------- |
| **name**     | Passenger name                                          |
| **survived** | 1 if the passenger survived, 0 otherwise                |
| **pclass**   | Passenger class: 1st, 2nd, or 3rd                       |
| **female**   | 1 if the passenger was female, 0 otherwise              |
| **age**      | Passenger age in years                                  |
| **sibsp**    | Number of siblings and spouses aboard                   |
| **parch**    | Number of parents and children aboard                   |
| **fare**     | Passenger fare                                          |
| **embarkS**  | 1 if the passenger embarked at Southampton, 0 otherwise |
| **embarkC**  | 1 if the passenger embarked at Cherbourg, 0 otherwise   |
| **embarkQ**  | 1 if the passenger embarked at Queenstown, 0 otherwise  |

For the model, `name` is discarded, while `survived` becomes the response variable.

## Working Through the Problem

Let $N$ denote the number of passengers in the dataset. For each passenger $i=1,\ldots,N$, define the binary response variable

```math
y_i =
\begin{cases}
1 & \text{if passenger } i \text{ survived},\\
0 & \text{otherwise}.
\end{cases}
```

The explanatory variables associated with passenger $i$ are collected into a feature vector

```math
x_i \in \mathbb{R}^{p},
```

where $p$ denotes the number of features used by the model.

The complete dataset can therefore be represented by the target vector

```math
\mathbf{y} =
\begin{bmatrix}
y_1\\
\vdots\\
y_N
\end{bmatrix}
```

and the feature matrix

```math
\mathbf{X} =
\begin{bmatrix}
x_1^T\\
\vdots\\
x_N^T
\end{bmatrix}.
```

Since the response variable is binary, we require a model whose output can be interpreted as a probability. Logistic regression achieves this using the sigmoid function

```math
\sigma(t)=\frac{1}{1+e^{-t}},
```

which maps $\mathbb{R}$ onto the interval $(0,1)$.

The sigmoid satisfies

```math
\sigma(0)=\frac{1}{2},
```

and

```math
\lim_{t\to-\infty}\sigma(t)=0,
\qquad
\lim_{t\to+\infty}\sigma(t)=1.
```

It therefore provides a convenient mapping from an unrestricted real-valued score to a probability.

A useful identity that will appear later is

```math
1-\sigma(t)=\sigma(-t).
```

For passenger $i$, define the linear predictor

```math
z_i=w_0+w^Tx_i,
```

where $w_0\in\mathbb{R}$ is the intercept and $w\in\mathbb{R}^{p}$ is the weight vector.

The model then assigns passenger $i$ the survival probability

```math
p_i=\sigma(z_i)=\sigma(w_0+w^Tx_i).
```

Given the observed label $y_i$, the likelihood contribution of observation $i$ is

```math
\ell_i =
\begin{cases}
p_i & \text{if } y_i=1,\\
1-p_i & \text{if } y_i=0.
\end{cases}
```

Because $y_i$ can only take the values $0$ and $1$, this can be written more compactly as

```math
\ell_i=p_i^{y_i}(1-p_i)^{1-y_i}.
```

Assuming the observations are independent, the likelihood of the complete dataset is

```math
L(w_0,w)
=
\prod_{i=1}^{N}
p_i^{y_i}(1-p_i)^{1-y_i}.
```

Rather than maximizing this product directly, it is more convenient both numerically and analytically to maximize its logarithm. The log-likelihood is therefore

```math
\begin{align}
\mathcal{L}(w_0,w)
&=\log L(w_0,w)\\
&=\sum_{i=1}^{N}\log\ell_i\\
&=\sum_{i=1}^{N}
\left[
y_i\log p_i+(1-y_i)\log(1-p_i)
\right].
\end{align}
```

Rearranging the terms gives

```math
\begin{align}
\mathcal{L}(w_0,w)
&=
\sum_{i=1}^{N}
\left[
y_i\log p_i
+
\log(1-p_i)
-
y_i\log(1-p_i)
\right]\\
&=
\sum_{i=1}^{N}
\left[
y_i\log\left(\frac{p_i}{1-p_i}\right)
+
\log(1-p_i)
\right].
\end{align}
```

Since $p_i=\sigma(z_i)$,

```math
\frac{p_i}{1-p_i}
=
e^{z_i},
```

and therefore

```math
\log\left(\frac{p_i}{1-p_i}\right)=z_i.
```

Likewise,

```math
1-p_i
=
\frac{1}{1+e^{z_i}},
```

so that

```math
\log(1-p_i)
=
-\log(1+e^{z_i}).
```

Substituting these identities into the log-likelihood gives

```math
\mathcal{L}(w_0,w)
=
\sum_{i=1}^{N}
\left[
y_i z_i-\log(1+e^{z_i})
\right].
```

Finally, substituting $z_i=w_0+w^Tx_i$ yields

```math
\mathcal{L}(w_0,w)
=
\sum_{i=1}^{N}
\left[
y_i(w_0+w^Tx_i)
-
\log\left(1+e^{w_0+w^Tx_i}\right)
\right].
```

The model parameters are obtained by maximizing this function with respect to $w_0$ and $w$.

For convenience, combine the intercept and weight vector into a single parameter vector,

```math
\bar{w}=
\begin{bmatrix}
w_0\\
w
\end{bmatrix},
```

and augment each feature vector with a leading constant,

```math
\bar{x}_i=
\begin{bmatrix}
1\\
x_i
\end{bmatrix}.
```

The linear predictor can then be written simply as

```math
z_i=\bar{w}^T\bar{x}_i.
```

Differentiating the log-likelihood with respect to $\bar{w}$ gives

```math
\begin{align}
\nabla\mathcal{L}(\bar{w})
&=
\sum_{i=1}^{N}
\left[
y_i\bar{x}_i
-
\frac{e^{z_i}}{1+e^{z_i}}\bar{x}_i
\right]\\
&=
\sum_{i=1}^{N}
\left[
y_i-\sigma(z_i)
\right]\bar{x}_i\\
&=
\sum_{i=1}^{N}
(y_i-p_i)\bar{x}_i.
\end{align}
```

The sigmoid derivative is

```math
\sigma'(t)
=
\sigma(t)[1-\sigma(t)].
```

Differentiating once more therefore gives the Hessian

```math
\nabla^2\mathcal{L}(\bar{w})
=
-\sum_{i=1}^{N}
p_i(1-p_i)
\bar{x}_i\bar{x}_i^T.
```

Since $0<p_i<1$, each coefficient $p_i(1-p_i)$ is positive, while each outer product $\bar{x}_i\bar{x}_i^T$ is positive semidefinite. The negative sum is therefore negative semidefinite.

Consequently, the logistic-regression log-likelihood is concave. Any finite local maximum is therefore also a global maximum.

### Numerical Optimization

Although the objective is well behaved, there is no closed-form solution for the parameter values that maximize the logistic-regression likelihood. They must instead be obtained numerically.

For this implementation, I use BFGS, a quasi-Newton optimization method.

The optimizer itself is formulated as a minimizer, so rather than maximizing $\mathcal{L}$ directly, I define

```math
g(\bar{w})=-\mathcal{L}(\bar{w})
```

and minimize $g$.

At iteration $k$, BFGS maintains an approximation $H_k$ of the inverse Hessian of the objective. Given the gradient

```math
\nabla g(\bar{w}_k),
```

the corresponding search direction is

```math
d_k=-H_k\nabla g(\bar{w}_k).
```

The next iterate is then obtained from

```math
\bar{w}_{k+1}
=
\bar{w}_k+\alpha_k d_k,
```

where $\alpha_k>0$ is the step length.

Choosing this step length is itself an optimization problem. Taking a step that is too small wastes iterations, while taking one that is too large may overshoot a useful region of the objective function.

To perform the line search, define the one-dimensional function

```math
\psi(\alpha)
=
g(\bar{w}_k+\alpha d_k).
```

Its derivative along the search direction is

```math
\psi'(\alpha)
=
\nabla g(\bar{w}_k+\alpha d_k)^Td_k.
```

The step length $\alpha$ is chosen such that the Wolfe conditions are satisfied.

The first condition is

```math
\psi(\alpha)
\leq
\psi(0)+c_1\alpha\psi'(0),
```

which requires the step to produce a sufficient decrease in the objective function.

The second is

```math
\psi'(\alpha)
\geq
c_2\psi'(0),
```

which imposes a curvature condition and prevents the accepted step from being unnecessarily short.

The constants satisfy

```math
0<c_1<c_2<1.
```

Once an acceptable step length has been found, the parameter vector is updated. BFGS then uses the changes in the parameters and gradients,

```math
s_k
=
\bar{w}_{k+1}-\bar{w}_k
```

and

```math
q_k
=
\nabla g(\bar{w}_{k+1})
-
\nabla g(\bar{w}_k),
```

to update its approximation of the inverse Hessian.

Defining

```math
\rho_k
=
\frac{1}{q_k^Ts_k},
```

the BFGS update is

```math
H_{k+1}
=
\left(I-\rho_k s_k q_k^T\right)
H_k
\left(I-\rho_k q_k s_k^T\right)
+
\rho_k s_k s_k^T.
```

This allows curvature information about the objective function to be accumulated between iterations without explicitly computing and inverting the full Hessian at every step.

Repeating this process until convergence gives an estimate

```math
\hat{\bar{w}}=
\begin{bmatrix}
\hat{w}_0\\
\hat{w}
\end{bmatrix}.
```

Once these parameters have been obtained, prediction is straightforward. Passenger $i$ is classified as a survivor whenever the estimated survival probability is at least $1/2$:

```math
\hat{y}_i =
\begin{cases}
1 & \text{if }
\sigma(\hat{w}_0+\hat{w}^Tx_i)\geq\frac{1}{2},\\
0 & \text{otherwise}.
\end{cases}
```

Since $\sigma(0)=1/2$ and the sigmoid is strictly increasing, this is equivalently a threshold on the linear predictor:

```math
\hat{y}_i =
\begin{cases}
1 & \text{if } \hat{w}_0+\hat{w}^Tx_i\geq0,\\
0 & \text{otherwise}.
\end{cases}
```

The predictions can then be collected into

```math
\hat{\mathbf{y}}\in\{0,1\}^N.
```

For this exercise, I evaluate the model using its in-sample accuracy,

```math
\operatorname{accuracy}
=
\frac{1}{N}
\sum_{i=1}^{N}
\mathbf{1}(y_i=\hat{y}_i).
```

This gives the fraction of observations in the dataset that were classified correctly.

It is important to call this **in-sample** accuracy. Since the same observations are used both to estimate the parameters and to evaluate the resulting model, this value should not be interpreted as an estimate of how accurately the model would classify previously unseen passengers.

With the mathematical formulation established, here is my implementation:

```python
# -*- coding utf-8 -*-

from typing import Final, Callable, Tuple, List

from numpy.typing import NDArray
from numpy.linalg import norm

from numpy import (hstack, ones, outer, clip,
				   float64, int64, array, inf,
				   sum, exp, zeros, eye, diag,
				   concatenate, dot, log1p, abs)

from pandas import DataFrame, read_excel

df	: Final[DataFrame]
y	: Final[NDArray[int64]]
X	: Final[NDArray[float64]]

df	= read_excel(
		'../data/titanic.xlsx',
		engine = 'openpyxl')

y	= df['survived'].to_numpy()
X	= df.drop(
		columns=['survived', 'name']
	).to_numpy(dtype=float64)

def func_loglikelihood(wbar: NDArray[float64], X: NDArray[float64], y: NDArray[int64]) -> float64:

	"""
	
	Description
	===========

	Compute the log-likelihood value for logistic regression.
	
	Parameters
	----------

	wbar : NDArray[float64] | Vector-like
		Model parameters (With bias term) ; shape (p + 1,)
	
	X : NDArray[float64] | Matrix-like
		Feature matrix ; shape (N, p)

	y : NDArray[int64] | Vector-like
		Target vector ; shape (N)
	
	Returns
	-------

	float64 : The log-likelyhood value

	"""

	z	: Final[NDArray[float64]]
	z	= clip(wbar[0] + X @ wbar[1:], -500, 500)
	return sum(y * z - log1p(exp(z)))


def grad_loglikelihood(wbar: NDArray[float64], X: NDArray[float64], y: NDArray[int64]) -> NDArray[float64]:

	"""

	Description
	===========

	Compute the gradient of the log-likelihood for
	logistic regression (Sigmoid activation function).

	Parameters
	----------

	wbar : NDArray[float64] | Vector-like
		Model parameters (With bias term) ; shape (p + 1,)

	X : NDArray[float64] | Matrix-like
		Feature matrix ; shape (N, p)

	y : NDArray[int64] | Vector-like
		Target vector ; shape (N)

	Returns
	-------

	NDArray[float64] : Gradient vector ; shape (p + 1,)

	"""

	offsets	: Final[NDArray[float64]]
	offsets	= y - (1 / (1 + exp(-clip(wbar[0] + X @ wbar[1:], -500, 500))))

	return concatenate(([sum(offsets)], X.T @ offsets))


def hes_loglikelihood(wbar: NDArray[float64], X: NDArray[float64]) -> NDArray[float64]:

	"""

	Description
	===========

	Compute the Hessian of the log-likelihood for logistic regression.

	Parameters
	----------

	wbar : NDArray[float64] | Vector-like
		Model parameters (With bias term) ; shape (p + 1,)

	X : NDArray[float64] | Matrix-like
		Feature matrix ; shape (N, p)

	Returns
	-------

	NDArray[float64] : Hessian matrix ; shape (p + 1, p + 1)

	"""

	pred	: Final[NDArray[float64]]
	biasX	: Final[NDArray[float64]]

	pred	= 1 / (1 + exp(-clip(wbar[0] + X @ wbar[1:], -500, 500)))
	biasX	= hstack((ones((X.shape[0], 1)), X))

	return -(biasX.T @ diag(pred * (1 - pred)) @ biasX)


def step_length_Wolfe(
		func		: Callable[[NDArray], float64],
		grad		: Callable[[NDArray], NDArray],
		start		: NDArray,
		direction	: NDArray,
		param		: Tuple[float64, float64, float64],
	) -> float64:

	"""

	Description
	===========

	Compute a step length that satisfies the Wolfe conditions for line search.

	Parameters
	----------

	func : Callable[[NDArray], float64]
		Function g: R^n -> R to minimize.

	grad : Callable[[NDArray], NDArray]
		Gradient of g.

	start : NDArray
		Starting point (s ∈ R^n) for line search.

	direction : NDArray
		Search direction (d ∈ R^n).

	param : Tuple[float64, float64, float64]
		Tuple containing values (c1, c2, α1).

	Returns
	-------
	float64 : Step length α satisfying Wolfe conditions.

	"""

	assert 0 < param[0] < param[1] < 1, \
	"c1 and c2 must satisfy 0 < c1 < c2 < 1."

	a	: float64
	ap	: float64
	an	: float64
	L	: float64
	U	: float64
	
	a	= param[2]
	ap	= 0.0
	an	= a
	L	= ap
	U	= inf

	phi_0	: Final[float64]			= func(start, X, y)
	phip_0	: Final[NDArray[float64]]	= dot(grad(start, X, y), direction)

	def phi(a: float64) -> float64:
		return func(start + a * direction, X, y)

	def phip(a: float64) -> NDArray[float64]:
		return dot(grad(start + a * direction, X, y), direction)

	while True:

		phi_a	= phi(an)
		phip_a	= phip(an)

		if (phi_a > phi_0 + param[0] * an * phip_0) \
			or (phi_a >= phi(ap) and L > 0):
			U = an ; an = 0.5 * (L + U)

		elif abs(phip_a) > param[1] * abs(phip_0):
			L = an; an = 2 * an if U == inf else 0.5 * (L + U)

		else:
			return an

		ap = an

		if abs(U - L) < 1e-8:
			return an


def line_search_BFGS(
		func			: Callable[[NDArray], float64],
		grad			: Callable[[NDArray], NDArray],
		x0				: NDArray,
		H0				: NDArray,
		iteration_limit	: int,
		epsilon			: float64,
		param			: Tuple[float64, float64, float64]
	) -> NDArray:

	"""

	Description
	===========

	Perform line search using the BFGS direction and Wolfe step lengths.

	Parameters
	----------

	func : Callable[[NDArray], float64]
		Function to minimize, defined on R^n.

	grad : Callable[[NDArray], NDArray]
		Gradient of the function to minimize.

	x0 : NDArray
		Starting point of the line search (in R^n).

	H0 : NDArray
		Initial approximation of the inverse Hessian (R^(n x n)).

	iteration_limit : int
		Maximum number of line search steps.

	epsilon : float64
		Gradient norm tolerance for stopping criterion.

	param : Tuple[float64, float64, float64]
		Tuple containing values (c1, c2, α1) for Wolfe step lengths.

	Returns
	-------

	NDArray : A matrix whose columns are the visited iterates, excluding the starting point.

	"""

	x		: NDArray[float64]
	H		: NDArray[float64]
	g		: NDArray[float64]
	s		: NDArray[float64]
	y2		: NDArray[float64]
	x2		: NDArray[float64]
	visited	: List[NDArray[float64]]

	x		= x0
	H		= H0
	visited	= [x]

	for _ in range(iteration_limit):

		g	= grad(x, X, y)

		if norm(g) < epsilon:
			break

		x2	= x + step_length_Wolfe(
				func, grad, x, -H @ g, param) * (-H @ g)

		visited.append(x2)

		s	= x2 - x
		y2	= grad(x2, X, y) - g

		if dot(y2, s) > 1e-10:
			rho	= 1.0 / dot(y2, s)
			V	= eye(x0.shape[0]) - rho * outer(s, y2)
			H	= V @ H @ V.T + rho * outer(s, s)

		x = x2

	return array(visited).T


def logistic_regression(X: NDArray[float64], y: NDArray[float64]) -> NDArray[float64]:

	"""

	Description
	===========

	Perform logistic regression using BFGS to maximize the log-likelihood.

	Parameters
	----------

	X : NDArray[float64]
		Feature matrix (N x p), where N is the number of samples and p is the number of features.

	y : NDArray[float64]
		Target vector (N,), where N is the number of samples.

	Returns
	-------

	NDArray[float64] : Vector w that approximately maximizes the log-likelihood.

	"""

	p		: Final[int64]
	wbar	: Final[NDArray[float64]]

	_, p	= X.shape
	wbar	= zeros(1 + p)

	def maximize_log(
			wbar	: NDArray[float64],
			X		: NDArray[float64],
			y		: NDArray[int64]
			)		-> NDArray[float64]:
		return -func_loglikelihood(wbar, X, y)

	def maximize_grad(
			wbar	: NDArray[float64],
			X		: NDArray[float64],
			y		: NDArray[int64]
		)			-> NDArray[float64]:
		return -grad_loglikelihood(wbar, X, y)

	return line_search_BFGS(
				maximize_log, maximize_grad,
				wbar, eye(p + 1), 1000, 1e-4,
				(1e-3, 0.9, 1e-2))[:, -1]


def logistic_prediction(X: NDArray[float64], wbar: NDArray[float64]) -> NDArray[float64]:

	"""

	Description
	===========

	Compute the prediction vector for a logistic regression model.

	Parameters
	----------

	X : NDArray[np.float64]
		Feature matrix (N x p), where N is the number of samples and p is the number of features.

	wbar : NDArray[np.float64]
		Weight vector (p + 1,), where the first element is the bias (w0), and the rest are weights.

	Returns
	-------

	NDArray[np.float64] : Prediction vector (N,), containing binary predictions (0 or 1).

	"""

	return ((1 / (1 + exp(-(X @ wbar[1:] + wbar[0])))) >= 0.5).astype(float64)


def accuracy(y: NDArray[float64], yhat: NDArray[float64]) -> float:

	"""

	Description
	===========

	Compute the accuracy of a model.

	Parameters
	----------

	y : NDArray[np.float64]
		True labels (N,), where N is the number of samples.

	yhat : NDArray[np.float64]
		Predicted labels (N,), where N is the number of samples.

	Returns
	-------

	float : Accuracy of the model, ranging from 0 to 1.

	"""

	assert y.shape == yhat.shape, \
	'Shapes of y and yhat must match.'

	return sum(y == yhat) / y.size

def main() -> None:

	''' Script entrypoint '''

	print("Training model...")

	weights: Final[NDArray[float64]] = logistic_regression(X, y)
	predictions: Final[NDArray[float64]] = logistic_prediction(X, weights)
	
	print("Model weights:", weights)
	print("Predictions shape:", predictions.shape)
	print("Target shape:", y.shape)
	print("Model accuracy:", accuracy(y, predictions))

if __name__ == '__main__':
	main()
```

## Results

Alright, let's run this:

```sh
# Whatever the file is named...
python main.py
```

The resulting parameter vector is:

```python
[ 1.42230346e+00 -1.00931975e+00  2.60894379e+00 -3.76857249e-02
 -3.48025217e-01  4.98522524e-02  4.63081938e-04  5.03541323e-01
  1.18261077e+00 -2.63848633e-01]
```

The model achieves an in-sample accuracy of roughly 80%.

Again, this number should not be interpreted as a serious measurement of predictive performance: I haven't created a train/test split, performed cross-validation, tuned the model, or done much of anything else that would belong in a proper statistical evaluation.

But that wasn't really the point of the exercise.

I wanted to take something I had previously understood largely through libraries and implement the machinery underneath it myself. Logistic regression happened to provide a small enough problem to make that practical while still forcing me to work through the mathematics, optimization, and implementation directly.

There is nothing particularly special about the resulting model.

Anyway, thank you for reading through!
