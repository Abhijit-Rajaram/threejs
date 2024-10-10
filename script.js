const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// Create a material for the filled shape
const material = new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide });

// Create the M shape using `THREE.Shape`
const mShape = new THREE.Shape();

// Start on the left side
mShape.moveTo(-10, 10);
console.log()
// Left curve for the M
mShape.bezierCurveTo(-7, 15, -3, 15, 0, 10);  // Right curved peak

// Right curve for the M
mShape.bezierCurveTo(3, 15, 7, 15, 10, 10);  // Left curved peak

mShape.bezierCurveTo(11, 6, 9, 4, 7, 0);  // Left curved peak down

mShape.bezierCurveTo(6, -2, 4, -5, 3, -7);  // Right curved peak
mShape.bezierCurveTo(1, -10, -1, -10, -3, -7);  // Right curved peak
mShape.bezierCurveTo(-4, -5, -5, -4, -6, -2);  // Right curved peak
mShape.bezierCurveTo(-7, 0, -8, 1, -9, 3);  // Right curved peak
mShape.bezierCurveTo(-10, 4, -11, 6, -10, 10);  // Right curved peak

// Create extrude settings with bevel
const extrudeSettings = {
    // depth: 10, // Half of the total thickness
    bevelEnabled: true, // Enable beveling
    bevelThickness: 2, // Thickness of the bevel
    bevelSize: 2, // Size of the bevel
    bevelSegments: 10, // Number of segments for the bevel
};

// Create geometry from the shape with extrusion
const geometry = new THREE.ExtrudeGeometry(mShape, extrudeSettings);

// Create a mesh object from the geometry and material (to fill)
const mMesh = new THREE.Mesh(geometry, material);
scene.add(mMesh);




// const snakeSegments = [];
// const segmentCount = 50;
// const segmentLength = 1;
// const segmentGeometry = new THREE.CylinderGeometry(0.2, 0.2, segmentLength, 8);
// const snakeMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

// for (let i = 0; i < segmentCount; i++) {
//     const segment = new THREE.Mesh(segmentGeometry, snakeMaterial);
//     segment.position.y = -i * segmentLength;
//     snakeSegments.push(segment);
//     scene.add(segment);
// }

// let direction = new THREE.Vector3(Math.random(), Math.random(), 0).normalize();
// let position = new THREE.Vector3(0, 0, 0);
// let angle = 0; // Initialize angle for curved movement

// // Calculate boundaries based on camera position
// function calculateBoundaries() {
//     const boundaryDistance = camera.position.z; // Distance of the camera from the origin
//     const fov = camera.fov * (Math.PI / 180); // Convert fov to radians
//     const height = 2 * boundaryDistance * Math.tan(fov / 2);
//     const width = height * camera.aspect;
//     return { width, height };
// }

// console.log(extrudeSettings.depth/2,'extrudeSettings.depth')
// Center the mesh in the Z-axis
// mMesh.position.z = extrudeSettings.depth / 2; // Adjust the position to center it

// Animation loop for continuous rendering
function animate() {
    requestAnimationFrame(animate);

    // Optional: Rotate the M shape
    mMesh.rotation.y += 0.01; // Rotate on Y axis
    // position.rotation.z += 0.01;
    // Update controls
    // controls.update();

    // // Update the position of the snake with curved movement
    // angle += 0.05; // Increment the angle for curvature
    // position.x = 5 * Math.sin(angle); // X position follows a sine wave
    // position.y = 5 * Math.cos(angle); // Y position follows a cosine wave

    // // Move each segment to the previous segment's position
    // for (let i = snakeSegments.length - 1; i > 0; i--) {
    //     snakeSegments[i].position.copy(snakeSegments[i - 1].position);
    // }
    // snakeSegments[0].position.copy(position);

    // // Check for boundaries and change direction if needed
    // const { width, height } = calculateBoundaries(); // Recalculate boundaries each frame
    // if (Math.abs(position.x) > width / 2 || Math.abs(position.y) > height / 2) {
    //     // If the snake goes outside the boundaries, reverse its direction
    //     angle += Math.PI; // Reverse the angle for a smooth curve
    // }


    // Render the scene
    renderer.render(scene, camera);
}
animate(); // Start the loop

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
