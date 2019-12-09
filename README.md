# Photo Colorization Net

## Info:
This a personal project of mine. The goal was to design, train and use a neural network for the task of human grayscale photo colorization.
Few words about the network design. It is a three-network architecture of encoder-decoder nets, each network takes as input the luminance of the grayscale image 
and its task is to estimate one of the three RGB channels. The design is quite simple!

The overall design and training was performed in tensorflow and keras. For the scope of this repository the trained network was converted to tensorflow.js format with the goal of incorporating it into a web-page app. The outcome of this idea is the website: 

https://bouclas.github.io/ColorizationNet/

Edit: although everything regarding the network estimation works, due to some issues (will work on them at some point) the input image to the tensorflow.js version of the model does lead to the expected result (colorization of image). :( 

BUT for the time being I have put together a demo in the Google Colab platform! Feel free to play!

