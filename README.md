# Mirroware   (Alpha)

Mirroware is a hybrid between two rendering systems: it takes the idea of traditional raycasting and combines it with raytracing concepts, such as reflections. This is the perfect combination between retro and modern graphics; you can make a game such as the classic <i>Wolfenstein 3D</i> with the plus of having mirrors in a modern fashion!

![Mirroware - a mirror simulator](https://github.com/WebAxol/Mirroware/blob/main/img/image5.png)

<h3>Main features (experimental)</h3>

- 🏹 Raycasting 
- 🪞 Mirrors
- 🎁 Textures
- 🌒 Darkening effect
- 🎨 Texture plus color layer
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

- Implementing to an existing project which uses a different framework or architecture could be a challenge.
- Only orthogonal lines are supported (just vertical and horizontal lines)
- Geometry is static 
 
<h2> What is Missing? </h2>

- Raycast optimization
- Complete and correct texturing system
- Further test raycasting algorithms
