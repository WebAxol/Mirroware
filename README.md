# Mirroware   (Alpha)

Mirroware is a hybrid between two rendering systems: it takes the idea of traditional raycasting and combines it with raytracing concepts, such as reflections. This is the perfect combination of retro and modern graphics; you can make a game such as the classic <i>Wolfenstein 3D</i> with the plus of having mirrors in a modern fashion!

<h3>Normal</h3>

![Mirroware - a mirror simulator](https://github.com/WebAxol/Mirroware/blob/main/img/image10.png)

<h3>Blur (Analog) Effect</h3>

![Mirroware - a mirror simulator](https://github.com/WebAxol/Mirroware/blob/main/img/image8.png)


<h3>Main features (experimental)</h3>

- 🏹 Raycasting 
- 🪞 Mirrors
- 🎁 Textures
- 🌒 Light-effects
- 🎨 Texture & RGBA layers
- 🎮 Input handling
- 🎥 Camera free displacement

Features to be implemented:

- Sprite rendering
- Text rendering

<h3>Technical considerations</h3>

- Implemented with <a href="https://github.com/WebAxol/PlugLightJS" >PlugLightJS</a> framework
    - Offers a microkernel architecture
    - Easy to integrate new services/systems
    - Can be a good base to make a new project
  
 <h3>Limitations</h3>

- Implementing inside an existing project that uses a different framework or architecture could be a challenge.
- Only orthogonal (axis-aligned) lines and circles are supported as primitives
- Geometry is static 
 
<h2> What is Missing? </h2>

- Raycast optimization
- Complete and correct texturing system
- Further test raycasting algorithms
