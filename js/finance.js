/**
 * Created by DrTone on 04/12/2014.
 */
//Visualisation framework
var PLANE_WIDTH = 500, PLANE_HEIGHT = 100;
//Init this app from base
function Framework() {
    BaseApp.call(this);
}

Framework.prototype = new BaseApp();

Framework.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
    //GUI
    this.guiControls = null;
    this.gui = null;
};

Framework.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Create ground plane
    var planeGeom = new THREE.PlaneBufferGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    var planeMat = new THREE.MeshPhongMaterial( {color: 0x3a3a3a} );
    var plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -100;
    this.scene.add(plane);

    //Dummy object data
    var data = [6, 12, 18, 24, 30, 36];

    //Load example object
    var radius = 5, segments = 32;
    var sphereGeom = new THREE.SphereGeometry(radius, segments, segments);
    var mat = new THREE.MeshPhongMaterial({color: 0xb5b5b5, transparent: false, opacity: 0.5});
    var sphere;
    var x = 0, z = 0;
    var xInc = 20;
    for(var i=0; i<data.length; ++i) {
        sphere = new THREE.Mesh(sphereGeom, mat);
        sphere.position.set(x, data[i], z);
        this.scene.add(sphere);
        x += xInc;
    }
};

Framework.prototype.createGUI = function() {
    //GUI - using dat.GUI
    this.guiControls = new function() {

    };

    var gui = new dat.GUI();

    //Add some folders
    this.guiAppear = gui.addFolder("Appearance");
    this.guiData = gui.addFolder("Data");
    this.gui = gui;
};

Framework.prototype.update = function() {
    //Perform any updates

    BaseApp.prototype.update.call(this);
};

$(document).ready(function() {
    //Initialise app
    var container = document.getElementById("WebGL-output");
    var app = new Framework();
    app.init(container);
    app.createScene();

    //GUI callbacks

    app.run();
});