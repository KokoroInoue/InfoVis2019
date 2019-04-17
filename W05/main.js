function main(){

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

    geometry.faces.push(new THREE.Face3( 0, 3, 1));
    geometry.faces.push(new THREE.Face3( 2, 1, 3));
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

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 2, 2, 2 );
    scene.add( light );
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.001;
        renderer.render( scene, camera );
	//light.position.set(1, 1, 1);
    }
}

//4.17
//light���ѹ�
