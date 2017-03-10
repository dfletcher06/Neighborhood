/**
 * Created by fletcher on 2/24/17.
 */

class Sidewalk{

    constructor(gl, location){

        let col1 = vec3.fromValues(169/256, 169/256, 169/256);
        let roadCol = vec3.fromValues(119/256, 136/256, 153/256);

        this.path = new Cube(gl, .2, 1, col1, col1, col1);
        this.road = new Cube(gl, .3, 1, roadCol, roadCol, roadCol);
        this.tmp = mat4.create();
        this.roadTransform = mat4.create();
        this.pathTransform = mat4.create();

        mat4.translate(this.pathTransform, this.pathTransform, vec3.fromValues (1, location, -.001));
        //mat4.translate(this.roadTransform, this.roadTransform, vec3.fromValues(.5, .5, -.0000001));

    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.pathTransform);
        this.path.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        //mat4.mul(this.tmp, coordFrame, this.roadTransform);
        //this.road.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

    }
}