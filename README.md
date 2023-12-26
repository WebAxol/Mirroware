<div align="center">
<pre>
888b     d888 8888888 8888888b.  8888888b.   .d88888b.  888       888        d8888 8888888b.  8888888888 
8888b   d8888   888   888   Y88b 888   Y88b d88P" "Y88b 888   o   888       d88888 888   Y88b 888        
88888b.d88888   888   888    888 888    888 888     888 888  d8b  888      d88P888 888    888 888        
888Y88888P888   888   888   d88P 888   d88P 888     888 888 d888b 888     d88P 888 888   d88P 8888888    
888 Y888P 888   888   8888888P"  8888888P"  888     888 888d88888b888    d88P  888 8888888P"  888        
888  Y8P  888   888   888 T88b   888 T88b   888     888 88888P Y88888   d88P   888 888 T88b   888        
888   "   888   888   888  T88b  888  T88b  Y88b. .d88P 8888P   Y8888  d8888888888 888  T88b  888        
888       888 8888888 888   T88b 888   T88b  "Y88888P"  888P     Y888 d88P     888 888   T88b 8888888888 

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
