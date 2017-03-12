/**
 * Created by fletcher on 2/24/17.
 */

class Cement{

    constructor(gl){

        let black = vec3.fromValues(105/256, 105/256, 105/256);
        let grey = vec3.fromValues(211/256, 211/256, 211/256);
        let yellow = vec3.fromValues(255/256, 255/256, 0/256);
        let darkgrey = vec3.fromValues(169/256, 169/256, 169/256);

        this.road = new Rectangle(gl, 4, .001, .7, 1, black, black, black);
        this.roadLines = new Rectangle(gl, .2, .02, .05, 1, yellow, yellow, yellow);
        this.sidewalk = new Rectangle(gl, 4, .001, .2, 1, grey, grey, grey);
        this.driveway = new Rectangle(gl, .3, .001, 1, 1, darkgrey, darkgrey, darkgrey);
        this.walkway = new Rectangle(gl, .1, .001, .5, 1, darkgrey, darkgrey, darkgrey);

        this.tmp = mat4.create();
        this.roadTransform = mat4.create();
        this.roadLinesTransform = mat4.create();
        this.lines2 = mat4.create();
        this.lines3 = mat4.create();
        this.lines4 = mat4.create();
        this.sidewalkTransform = mat4.create();
        this.drivewayTransform = mat4.create();
        this.walkwayTransform = mat4.create();

        mat4.translate(this.roadTransform, this.roadTransform, vec3.fromValues (1.5, 0, .01));
        mat4.translate(this.roadLinesTransform, this.roadLinesTransform, vec3.fromValues(1.5, 0.5, .1));
        mat4.translate(this.lines2, this.lines2, vec3.fromValues(1.5, 1.4, .1));
        mat4.translate(this.lines3, this.lines3, vec3.fromValues(1.5, -.5, .1));
        mat4.translate(this.lines4, this.lines4, vec3.fromValues(1.5, -1.4, .1))
        mat4.translate(this.sidewalkTransform, this.sidewalkTransform, vec3.fromValues(.8, 0, .01));
        mat4.translate(this.drivewayTransform, this.drivewayTransform, vec3.fromValues(.65, 0.5, .02));
        mat4.translate(this.walkwayTransform, this.walkwayTransform, vec3.fromValues(.48, 0, .01));


    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.roadTransform);
        this.road.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.roadLinesTransform);
        this.roadLines.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.lines2);
        this.roadLines.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.lines3);
        this.roadLines.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.lines4);
        this.roadLines.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.sidewalkTransform);
        this.sidewalk.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.drivewayTransform);
        this.driveway.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.walkwayTransform);
        this.walkway.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}/**
 * Created by fletcher on 3/11/17.
 */
