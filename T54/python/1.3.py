import numpy as np
import matplotlib.pyplot as plt
import math
theta = np.arange(0, 2*np.pi, 0.02)
plt.subplot(polar=True)
for i in range(200, 2000 ,200):
	r = math.sqrt(i/8.89)
	plt.plot(theta,0*theta+r,linewidth=2)
for i in range(2000, 0 ,-200):
	r = math.sqrt(450112.51/i)
	plt.plot(theta,0*theta+r,linewidth=2)
plt.show()