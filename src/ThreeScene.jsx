import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);

  //   useEffect(() => {
  //     // Create scene
  //     const scene = new THREE.Scene();

  //     // Create camera
  //     const camera = new THREE.PerspectiveCamera(
  //       25,
  //       window.innerWidth / window.innerHeight,
  //       0.1,
  //       1000
  //     );
  //     camera.position.z = 5;

  //     // Create renderer
  //     const renderer = new THREE.WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     mountRef.current.appendChild(renderer.domElement);

  //     // Add a cube
  //     const geometry = new THREE.BoxGeometry();
  //     const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  //     const cube = new THREE.Mesh(geometry, material);
  //     const light = new THREE.PointLight(0xffffff);
  //     scene.add(cube);
  //     light.position.set(2,2,2);
  //     const light2 = new THREE.PointLight(0xffffff,33);
  //     light2.position.set(20,20,-20);
  //     // scene.add(light2);
  //     scene.add(light);
  //     const light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
  // scene.add( light3 );
  //     camera.position.set( 10, 0, 0 );
  //     camera.lookAt(0,0,0);

  //     // Animation loop
  //     const animate = () => {
  //       requestAnimationFrame(animate);

  //       cube.rotation.z -= 0.001;
  //       cube.rotation.y += 0.001;
  //       renderer.render(scene, camera);

  //     };
  //     animate();

  //     // Clean up on component unmount
  //     return () => {
  //       mountRef.current.removeChild(renderer.domElement);
  //     };
  //   }, []);

  // useEffect(()=> {
  //     const scene = new THREE.Scene();

  //     // Camera
  //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //     camera.position.z = 5;

  //     // Renderer
  //     const renderer = new THREE.WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     document.body.appendChild(renderer.domElement);

  //     // Cube
  //     const geometry = new THREE.BoxGeometry();
  //     const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  //     const cube = new THREE.Mesh(geometry, material);
  //     scene.add(cube);
  //     cube.position.set(2,0,0)
  //     const cube2 = cube.clone();
  //     scene.add(cube2);
  //     cube2.position.set(0,0,0);

  //     // Light
  //     const light = new THREE.DirectionalLight(0xffffff, 1);
  //     light.position.set(0, 0, 1).normalize();
  //     scene.add(light);

  //     // Raycaster
  //     const raycaster = new THREE.Raycaster();
  //     const mouse = new THREE.Vector2();

  //     // Mouse move event
  //     function onMouseMove(event) {
  //       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     }

  //     // Click event
  //     function onClick(event) {
  //       raycaster.setFromCamera(mouse, camera);

  //       const intersects = raycaster.intersectObjects(scene.children);

  //       for (let i = 0; i < intersects.length; i++) {
  //         intersects[i].object.material.color.set(0xff0000);
  //       }
  //     }

  //     // Add event listeners
  //     window.addEventListener('mousemove', onMouseMove, false);
  //     window.addEventListener('click', onClick, false);

  //     // Animation loop
  //     function animate() {
  //       requestAnimationFrame(animate);
  //       renderer.render(scene, camera);
  //     }
  //     animate();

  // },[])
  useEffect(() => {
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);


    //satellite
    // const loader = new FBXLoader();
    // loader.load('/models/Moon.fbx', function (object) {
    //     object.position.set(0, 0, 0); // Set the position of the model
    //     camera.position.set(0,0,2);
    //     console.log(object);
    //     console.log(33)
    //     scene.add(object);
    const loader = new GLTFLoader();
    let earth;
    loader.load('/planet/scene.gltf', function (object) {
      // camera.position.set(0, 0, 3);
      scene.add(object.scene);
      object.scene.position.set(0, 0, 5)
      earth = object.scene;
    });
    let rocket;
    loader.load('/rocket/scene.gltf', (obj) => {
      scene.add(obj.scene);
      rocket = obj.scene;
      camera.position.set(0, 0, 8);
      // const direction = new THREE.Vector3(Math.cos(toRadians(30))*Math.cos(toRadians(60)), -Math.cos(60), -(Math.cos(toRadians(30))*Math.cos(toRadians(30)))).normalize(); // Diagonal movement in the x-y plane
      const direction = new THREE.Vector3(1.5,1.2,-3).normalize(); // Diagonal movement in the x-y plane
      // const arrowHelper = new THREE.ArrowHelper(direction, rocket.position, 2, 0xff0000);
      // scene.add(arrowHelper);
      let dir = 0;
      const animate = () =>{
        rocket.position.add(direction.clone().multiplyScalar(0.05)); // Adjust speed as needed
        rocket.rotateY(Math.PI/200);
        if(rocket.position.z < -60)  {
          obj.scene.position.set(getRandomInt(-8,8), getRandomInt(-2,2),5);
        }
        requestAnimationFrame(animate);
      }
      animate();
      rocket.rotateZ(-toRadians(50));
      rocket.rotateX(-toRadians(60));
      rocket.scale.set(0.2, 0.2, 0.2);
      obj.scene.position.set(-8,-1,5);
      // obj.scene.position.set(5,1,3);
      // obj.scene.position.set(0,0,0);
    })

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 6).normalize();
    // scene.add(light);
    const pointLight = new THREE.AmbientLight(0xfffffff, 1);
    scene.add(pointLight);
    const l2 = new THREE.PointLight(0xf8f8f8, 20);
    // l2.position.set(0,0,5);
    // scene.add(l2);


    //stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    // const blueColor = new THREE.PointsMaterial({color: 0x00e3ff})
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // const axesHelper = new THREE.AxesHelper(5); // 5 units long
    // scene.add(axesHelper);

    // Variables to track mouse state
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    // Mouse down event
    function onMouseDown(event) {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }

    // Mouse up event
    function onMouseUp() {
      isDragging = false;
    }

    // Mouse move event
    function onMouseMove(event) {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          0,
          toRadians(deltaMove.x * 0.5),
          0,
        ));

      // cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
      // earth.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
      // rocket.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);


      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    // Add event listeners
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('mousemove', onMouseMove, false);
    cube.position.set(0, 0, 4);
    // Animation loop
    function animate() {
      // cube.position.set(cube.position.x, cube.position.y, cube.position.z - 0.01);
      cube.rotation.x += 0.01;
      if (earth) {
        earth.rotation.y += 0.01
      }
      cube.rotation.y += 0.01;
      cube.position.z -= 0.01
      cube.position.x += 0.007
      if(rocket) {
        // rocket.rotation.y += 0.01;
        // rocket.position.z -= 0.01;
        // rocket.position.x += 0.009;
        // rocket.tanslateX(0.2)
        // rocket.rotation.y += 0.01;
        // rocket.rotateY(Math.PI/200);
      }
      // if(cube.position.z < -40) {
      //     scene.remove(cube)
      // }

      // camera.position.z-=0.002
      stars.position.z += 0.08; // Adjust speed and direction as needed

      // Reset star positions to create a looping effect
      if (stars.position.z > 100) {
        stars.position.z = -1000;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }, [])

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
