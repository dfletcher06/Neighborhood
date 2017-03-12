/**
 * Created by Hans Dulimarta on 1/31/17.
 */

var gl;
var glCanvas, textOut;
var orthoProjMat, persProjMat, viewMat, ringCF;
//var topViewMat;
var axisBuff, tmpMat;
var globalAxes;
var plane, house, garage, pool, cement, pole;
var trees = [];
var treesNum = 50;

/* Vertex shader attribute variables */
var posAttr, colAttr;

/* Shader uniform variables */
var projUnif, viewUnif, modelUnif;

const IDENTITY = mat4.create();
var coneSpinAngle;
var shaderProg;

function main() {
    glCanvas = document.getElementById("gl-canvas");
    textOut = document.getElementById("msg");
    gl = WebGLUtils.setupWebGL(glCanvas, null);
    axisBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, axisBuff);
    window.addEventListener("resize", resizeHandler, false);
    window.addEventListener("keypress", keyboardHandler, false);
    ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
        .then (prog => {
            shaderProg = prog;
            gl.useProgram(prog);
            gl.clearColor(0, 0, 0, 1);
            gl.enable(gl.DEPTH_TEST);    /* enable hidden surface removal */
            gl.enable(gl.CULL_FACE);     /* cull back facing polygons */
            gl.cullFace(gl.BACK);
            posAttr = gl.getAttribLocation(prog, "vertexPos");
            colAttr = gl.getAttribLocation(prog, "vertexCol");
            projUnif = gl.getUniformLocation(prog, "projection");
            viewUnif = gl.getUniformLocation(prog, "view");
            modelUnif = gl.getUniformLocation(prog, "modelCF");
            gl.enableVertexAttribArray(posAttr);
            gl.enableVertexAttribArray(colAttr);
            orthoProjMat = mat4.create();
            persProjMat = mat4.create();
            viewMat = mat4.create();
            //topViewMat = mat4.create();
            ringCF = mat4.create();
            tmpMat = mat4.create();
            mat4.lookAt(viewMat,
                vec3.fromValues(2, 2, 3), /* eye */
                vec3.fromValues(0, 0, 0), /* focal point */
                vec3.fromValues(0, 0, 1)); /* up */
            // mat4.lookAt(topViewMat,
            //     vec3.fromValues(0,0,2),
            //     vec3.fromValues(0,0,0),
            //     vec3.fromValues(0,1,0)
            // );
            gl.uniformMatrix4fv(modelUnif, false, ringCF);

            plane = new Plane(gl);
            house = new House(gl);
            garage = new Garage(gl);
            pool = new Pool(gl);
            pole = new TelephonePole(gl);
            cement = new Cement(gl);

            for (i = 0; i < treesNum; i++) {
                trees.push(new Tree(gl));
            }

            globalAxes = new Axes(gl);
            //mat4.rotateX(ringCF, ringCF, -Math.PI/2);
            //coneSpinAngle = 0;
            resizeHandler();
            render();
        });
}

function resizeHandler() {
    glCanvas.width = window.innerWidth;
    glCanvas.height = 0.9 * window.innerHeight;
    if (glCanvas.width > glCanvas.height) { /* landscape */
        let ratio = 2 * glCanvas.height / glCanvas.width;
        console.log("Landscape mode, ratio is " + ratio);
        mat4.ortho(orthoProjMat, -3, 3, -3 * ratio, 3 * ratio, -5, 5);
        mat4.perspective(persProjMat,
            Math.PI/3,  /* 60 degrees vertical field of view */
            1/ratio,    /* must be width/height ratio */
            1,          /* near plane at Z=1 */
            20);        /* far plane at Z=20 */
    } else {
        alert ("Window is too narrow!");
    }

}

var x = 0;
var y = 0;

function keyboardHandler(event) {
    switch (event.key) {
        case "w":
            y+=.1;
            break;
        case "s":
            y+=-.1;
            break;
        case "a":
            x-=-.1;
            break;
        case "d":
            x-=.1;
            break;
    }
    mat4.lookAt(viewMat,
        vec3.fromValues(2+x, 2+y, 3), /* eye */
        vec3.fromValues(0, 0, 0), /* focal point */
        vec3.fromValues(0, 0, 1)); /* up */
    // textOut.innerHTML = "Ring origin (" + ringCF[12].toFixed(1) + ", "
    //     + ringCF[13].toFixed(1) + ", "
    //     + ringCF[14].toFixed(1) + ")";
}

function render() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    draw3D();
    //drawTopView(); /* looking at the XY plane, Z-axis points towards the viewer */
    //coneSpinAngle += 1;  /* add 1 degree */
    requestAnimationFrame(render);
}

function drawScene() {
    //draw axes on screen
    globalAxes.draw(posAttr, colAttr, modelUnif, IDENTITY);

    mat4.fromTranslation(tmpMat, vec3.fromValues(0, 0, 0));
    mat4.multiply(tmpMat, ringCF, tmpMat);   // tmp = ringCF * tmpMat

    plane.draw(posAttr, colAttr, modelUnif, tmpMat);
    house.draw(posAttr, colAttr, modelUnif, tmpMat);
    garage.draw(posAttr, colAttr, modelUnif, tmpMat);
    pool.draw(posAttr, colAttr, modelUnif, tmpMat);
    cement.draw(posAttr, colAttr, modelUnif, tmpMat);
    pole.draw(posAttr, colAttr, modelUnif, tmpMat);


    for (i = 0; i < trees.length; i++) {
        //trees[i].draw(posAttr, colAttr, modelUnif, tmpMat);
    }
}

function draw3D() {
    /* We must update the projection and view matrices in the shader */
    gl.uniformMatrix4fv(projUnif, false, persProjMat);
    gl.uniformMatrix4fv(viewUnif, false, viewMat);
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    drawScene();
}

// function drawTopView() {
//     /* We must update the projection and view matrices in the shader */
//     gl.uniformMatrix4fv(projUnif, false, orthoProjMat);
//     gl.uniformMatrix4fv(viewUnif, false, topViewMat);
//     gl.viewport(glCanvas.width/2, 0, glCanvas.width/2, glCanvas.height);
//     drawScene();
// }
