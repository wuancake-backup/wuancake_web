import numpy as np
import matplotlib.pyplot as plt
Y, X = np.mgrid[0:10:100j, 0:10:100j]
U = 2*((X-2)/((X-2)**2+(Y-2)**2)+(X+2)/((X+2)**2+(Y-2)**2)+(X-2)/((X-2)**2+(Y+2)**2)+(X+2)/((X+2)**2+(Y+2)**2))
V = 2*((Y-2)/((X-2)**2+(Y-2)**2)+(Y-2)/((X+2)**2+(Y-2)**2)+(Y+2)/((X-2)**2+(Y+2)**2)+(Y+2)/((X+2)**2+(Y+2)**2))
fig0, ax0 = plt.subplots()
strm = ax0.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=plt.cm.autumn)
fig0.colorbar(strm.lines)
plt.show()