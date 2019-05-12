function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();
    var sceneEdge = new THREE.Scene();
    

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );
    sceneEdge.add(camera);

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );
    sceneEdge.add(light);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.debug.checkShaderError = true;
    document.body.appendChild( renderer.domElement );
    
    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material = new THREE.ShaderMaterial({
	vertexColors: THREE.VertexColors,
	vertexShader: document.getElementById('shader.vert').text,
	fragmentShader: document.getElementById('shader.frag').text,
	uniforms: {
	    edgeColor: {type: 'v4', value: new THREE.Vector4(0.0,0.0,0.0,0.0)},
	    edge: {type: 'i', value: true},
	    texture: {type: 't', value: THREE.TextureLoader('textures/toon.png')},
	    light_position: { type: 'v3', value: light.position },
	    camera_position: { type: 'v3', value: camera.position }
	}
    });
    
    var torus_knot = new THREE.Mesh( geometry, material );
    torus_knot_edge = torus_knot.clone();
    scene.add( torus_knot );
    sceneEdge.add(torus_knot_edge);
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
	torus_knot_edge.rotation.x += 0.01;
        torus_knot_edge.rotation.y += 0.01;
	
	renderer.clear();
	
	if(edge){
	torus_knot_edge.material.side = THREE.FrontSide;
	torus_knot.material.uniforms.edgeColor.value = new THREE.Vector4(0, 0, 0, 0);
	torus_knot.material.uniforms.edge.value = false;
	renderer.render(scene, camera);
	}
	if(edge){
	torus_knot_edge.material.side = THREE.BackSide;
	torus_knot_edge.material.uniforms.edgeColor.value = new THREE.Vector4(0, 0, 0, 1);
	torus_knot_edge.material.uniforms.edge.value = true;
	renderer.render(sceneEdge, camera);
	}
        //renderer.render( scene, camera );
    }
}
