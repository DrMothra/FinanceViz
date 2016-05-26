/**
 * Created by DrTone on 04/12/2014.
 */
//Visualisation framework
var PLANE_WIDTH = 5000, PLANE_HEIGHT = 5000;
var ZOOM_INC = 100, MOVE_INC = 10;

//Init this app from base
function Finance() {
    BaseApp.call(this);
}

Finance.prototype = new BaseApp();

Finance.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
    //GUI
    this.guiControls = null;
    this.gui = null;
    this.lookAt = new THREE.Vector3();
};

Finance.prototype.createScene = function() {
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

        _this.preprocessData();

        //Sphere object
        var radius = 5, segments = 32, i;
        var sphereGeom = new THREE.SphereGeometry(radius, segments, segments);
        var sphereMat = new THREE.MeshPhongMaterial({color: 0xb5b5b5, transparent: false, opacity: 0.5});
        var sphere;
        var x = 0, y = 6100, z = 0;
        var xInc = 20;

        //Render data
        //Years
        var yearGroup = new THREE.Object3D();
        _this.scene.add(yearGroup);
        sphere = new THREE.Mesh(sphereGeom, sphereMat);
        sphere.position.set(x, y, z);
        yearGroup.add(sphere);

        //Months
        var monthGroup = new THREE.Object3D();
        _this.scene.add(monthGroup);
        z = -1000;
        for(i=0; i<4; ++i) {
            sphere = new THREE.Mesh(sphereGeom, sphereMat);
            sphere.position.set(x, 6100, z);
            monthGroup.add(sphere);
            x += xInc;
        }

        //Days
        var dayGroup = new THREE.Object3D();
        _this.scene.add(dayGroup);
        x=0, z=-2000;
        for(i=0; i<23; ++i) {
            sphere = new THREE.Mesh(sphereGeom, sphereMat);
            sphere.position.set(x, _this.data[i]["Adj Close"], z);
            dayGroup.add(sphere);
            x += xInc;
        }
    });
};

Finance.prototype.preprocessData = function() {

};

Finance.prototype.createGUI = function() {
    //GUI - using dat.GUI
    this.guiControls = new function() {

    };

    var gui = new dat.GUI();

    //Add some folders
    this.guiAppear = gui.addFolder("Appearance");
    this.guiData = gui.addFolder("Data");
    this.gui = gui;
};

Finance.prototype.update = function() {
    //Perform any updates

    BaseApp.prototype.update.call(this);
};

Finance.prototype.zoomIn = function() {
    this.camera.position.z -= ZOOM_INC;
};

Finance.prototype.zoomOut = function() {
    this.camera.position.z += ZOOM_INC;
};

Finance.prototype.moveRight = function() {
    this.camera.position.x += MOVE_INC;
    this.lookAt = this.controls.getLookAt();
    this.lookAt.position.x += MOVE_INC;
    this.controls.setLookAt(this.lookAt);
};

Finance.prototype.moveLeft = function() {
    this.camera.position.x -= MOVE_INC;
    this.lookAt = this.controls.getLookAt();
    this.lookAt.position.x -= MOVE_INC;
    this.controls.setLookAt(this.lookAt);
};

$(document).ready(function() {
    //Initialise app
    var container = document.getElementById("WebGL-output");
    var app = new Finance();
    app.init(container);
    app.createScene();

    //GUI callbacks
    $('#zoomOut').on("click", function() {
        app.zoomOut();
    });

    $('#zoomIn').on("click", function() {
        app.zoomIn();
    });

    $('#moveRight').on("click", function() {
        app.moveRight();
    });

    $('#moveLeft').on("click", function() {
        app.moveLeft();
    });

    app.run();
});