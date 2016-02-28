import numpy as np
import matplotlib.pyplot as plt
import math
pi = math.pi
Y,X = np.mgrid[-10:10:100j, -10:10:100j]
U = (2/(2*pi))*X/(X**2+Y**2)-2/(2*pi*(-2));
V = (2/(2*pi))*Y/(X**2+Y**2);
speed = np.sqrt(U*U + V*V)

fig0, ax0 = plt.subplots()
strm = ax0.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=plt.cm.autumn)
fig0.colorbar(strm.lines)
lw = 5*speed / speed.max()

plt.show()