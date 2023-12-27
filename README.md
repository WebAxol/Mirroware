<div align="center">
<pre>
88b     d88 888888 8888888b.  8888888b.   .d88888b.  88       88        d8888 8888888b.  88888888
888b   d888   88   888   Y88b 888   Y88b d88P" "Y88b 88   o   88       d88888 888   Y88b 888     
8888b.d8888   88   888    888 888    888 888     888 88  d8b  88      d88P888 888    888 888     
88Y88888P88   88   888   d88P 888   d88P 888     888 88 d888b 88     d88P 888 888   d88P 888888  
88 Y888P 88   88   8888888P"  8888888P"  888     888 88d88888b88    d88P  888 8888888P"  888     
88  Y8P  88   88   888 T88b   888 T88b   888     888 8888P Y8888   d88P   888 888 T88b   888     
88   "   88   88   888  T88b  888  T88b  Y88b. .d88P 888P   Y888  d8888888888 888  T88b  888     
 88       88 888888 888   T88b 888   T88b  "Y88888P"  88P     Y88 d88P     888 888   T88b 88888888 

--------------------------------------------------------------------------------------------------------

Advanced TypeScript Raycasting Engine that renders mirrors         
</pre>
</div>


<h3>Main features (experimental)</h3>

- 🏹 Raycasting
- 🪞 Mirrors
- 🎁 Textures
- 🌒 Light-and-Fog Effect
- 🎞️ Blur (Analog-style) effect
- 🎨 Texture & RGBA layers
- 🎮 Input handling
- 🎥 Camera free displacement
- 🎟️ Multi-layer Canvas Manager

<h3>Snapshots</h3>

![Mirroware - a mirror simulator](https://github.com/WebAxol/Mirroware/blob/main/img/image10.png)

![Mirroware - a mirror simulator](https://github.com/WebAxol/Mirroware/blob/main/img/image8.png)

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
