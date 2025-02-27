import React, { useEffect, useRef } from "react";
import * as THREE from "three";
function ThreeScenes() {
  // Reference to the div where Three.js will render
  const mountRef = useRef(null);
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background

    // Create a camera (PerspectiveCamera)
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 5; // Move the camera back so we can view the scene

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //mountRef.current.appendChild(renderer.domElement);
      // Append the renderer to the div
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
  

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animate the cube
    const animate = () => {
      requestAnimationFrame(animate); // Loop animation
      cube.rotation.x += 0.01; // Rotate on X-axis
      cube.rotation.y += 0.01; // Rotate on Y-axis
      renderer.render(scene, camera); // Render scene
    };
    animate(); // Start animation

        // Handle Window Resize
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
          };
          window.addEventListener("resize", handleResize);

    // Cleanup when component unmounts
    // Removes Three.js elements when the component unmounts.
    //If we don’t remove the Three.js renderer, it keeps running in the background.
    //The requestAnimationFrame(animate) keeps looping forever, even though the component is no longer visible.
    //This wastes memory and slows down the browser.
    //If the component is re-rendered without cleanup, a new Three.js renderer is added every time.
    //This can cause performance issues and memory leaks.
    //To prevent this, we remove the Three.js renderer when the component unmounts.
    //In Three.js, the canvas is the HTML element where the 3D scene is drawn. It is created by WebGLRenderer and added to the webpage inside a <div>.
    return () => {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        window.removeEventListener("resize", handleResize);
      };
  }, []);

  return (
    <>
      <div ref={mountRef} />{" "}
      {/*  The div where the 3D scene will be displayed */}
    </>
  );
}

export default ThreeScenes;
