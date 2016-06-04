import numpy as np
import matplotlib.pyplot as plt
Y, X = np.mgrid[-10:10:100j, -10:10:100j]
U = 2*((X+1)/((X+1)**2+Y**2)-(X-1)/((X-1)**2+Y**2))
V = 2*(Y/((X+1)**2+Y**2)-Y/((X-1)**2+Y**2))
fig0, ax0 = plt.subplots()
strm = ax0.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=plt.cm.autumn)
fig0.colorbar(strm.lines)
plt.show()