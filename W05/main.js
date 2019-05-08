function main(){

    document.addEventListener('mousedown', mouse_down_event);
    
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 1));
    geometry.vertices.push(new THREE.Vector3(0, 0, 1));
    geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry.vertices.push(new THREE.Vector3(1, 1, 0));
    geometry.vertices.push(new THREE.Vector3(1, 1, 1));
    geometry.vertices.push(new THREE.Vector3(0, 1, 1));

    geometry.faces.push(new THREE.Face3( 0, 1, 3));
    geometry.faces.push(new THREE.Face3( 2, 3, 1));
    geometry.faces.push(new THREE.Face3( 4, 0, 7));
    geometry.faces.push(new THREE.Face3( 3, 7, 0));
    geometry.faces.push(new THREE.Face3( 7, 3, 6));
    geometry.faces.push(new THREE.Face3( 2, 6, 3));
    geometry.faces.push(new THREE.Face3( 6, 2, 5));
    geometry.faces.push(new THREE.Face3( 1, 5, 2));
    geometry.faces.push(new THREE.Face3( 5, 1, 4));
    geometry.faces.push(new THREE.Face3( 0, 4, 1));
    geometry.faces.push(new THREE.Face3( 4, 7, 5));
    geometry.faces.push(new THREE.Face3( 6, 5, 7));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    //var material = new THREE.MeshNormalMaterial();
    var material = new THREE.MeshPhongMaterial({color: 0x88FFFF});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light1 = new THREE.DirectionalLight(0xFFFFFF, 1);
    light1.position.set(0.5, 0.5, 3).normalize();
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xFFFFFF, 1);
    light2.position.set(0.5, 0.5, -2).normalize();
    scene.add(light2);
    
    loop();
    
    function loop()
    {
        requestAnimationFrame( loop );
        mesh.rotation.x += 0.01;
        //mesh.rotation.y += 0.01;
	mesh.rotation.z += 0.01;
        renderer.render( scene, camera );
	//light.position.set(1, 1, 1);
    }

    function mouse_down_event(event){
	
	
	var x_win = event.clientX;
	var y_win = event.clientY;
	
	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;
	var x_NDC = 2 * ( x_win - vx ) / vw - 1;
	var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
	
	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
	var p_wld = p_NDC.unproject( camera );
    
	var origin = camera.position;
	var direction = p_wld;
	
	var raycaster = new THREE.Raycaster(origin, direction);
	var intersects = raycaster.intersectObject(triangle);
	if(intersects.length > 0){
	    intersect[0].face.color.setRGB(1, 0, 0);
	    intersect[0].object.geometry.colorsNeedUpdate = true;
	}
	
	
    }
}
