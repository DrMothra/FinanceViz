/**
 * Created by DrTone on 04/12/2014.
 */
//Visualisation framework
var PLANE_WIDTH = 5000, PLANE_HEIGHT = 5000;
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
    plane.position.y = 5800;
    this.scene.add(plane);

    //Load in data
    var _this = this;
    this.dataLoader = new dataLoader();
    this.dataLoader.load("data/ftseData.json", function(data) {
        console.log("FTSE data loaded");
        _this.data = data;

        //Render data
        var radius = 5, segments = 32;
        var sphereGeom = new THREE.SphereGeometry(radius, segments, segments);
        var mat = new THREE.MeshPhongMaterial({color: 0xb5b5b5, transparent: false, opacity: 0.5});
        var sphere;
        var x = 0, z = 0;
        var xInc = 20;
        for(var i=0; i<23; ++i) {
            sphere = new THREE.Mesh(sphereGeom, mat);
            sphere.position.set(x, _this.data[i]["Adj Close"], z);
            _this.scene.add(sphere);
            x += xInc;
        }
    });

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