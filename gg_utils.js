var Util = {};


Util.sign = function(v) {
  if (v<0) return -1;
  else return 1;
}

/*
* calculate length of 2d vector
*/
Util.len = function (v) {
  return Math.sqrt (v.x*v.x + v.y*v.y);
}

Util.len3 = function (v) {
  return Math.sqrt (v.x*v.x + v.y*v.y + v.z*v.z); 
}
/*
* distance between two points
*/
Util.dist = function (v0, v1) {
  d = {x: (v0.x - v1.x), y: (v0.y - v1.y)};
  return Util.len(d);
}

/*
 * map value v from range [xmin, xmax] to range [0,1]
 */
Util.map = function (v, xmin, xmax) {
    return (v - xmin) / (xmax - xmin);
}

/*
* linear interpolate between x0 and x1 t=0..1
*/
Util.blend = function (x0, x1, t) {
	return x0*(1-t) + x1*t;
}

Util.blend2d = function (v0, v1, t) {
  return {x: blend(v0.x, v1.x, t),
          y: blend(v0.y, v1.y, t)}
}

/*
* clamp input value between min and max
*/
Util.constrain = function (v, min, max) {
  if (v<min) return min;
  if (v>max) return max;
  return v;
}

/*
* get random value between min and max
*/
Util.rand = function (min, max) {
	return Math.random()*(max-min) + min;
}

/*
* rounded integer value
*/
Util.randI = function (min, max) {
  return Math.round(Math.random()*(max-min) + min);
}


/*
* quantize input value 0..1 in n steps
*/
Util.quantize = function (x, n) {
  if (n==0) return 0;
  return Math.round(x*n)/n;
}


/*
* force of attractor
*/
Util.calcAttraction = function (pos0, pos1, m) {
	var force = {x: (pos0.x - pos1.x), y: (pos0.y - pos1.y)};
  	var dist = Util.len(force);
  	force.x = -force.x / (Math.pow(dist,2)) * m;
  	force.y = -force.y / (Math.pow(dist,2)) * m;

  	return force;
}

/*
* force of 3d attractor
*/
Util.calcAttraction3 = function (pos0, pos1, m) {
  var force = {x: (pos0.x - pos1.x), 
               y: (pos0.y - pos1.y),
               z: (pos0.z - pos1.z)};

  var dist = Util.len3(force);
  if (dist==0) dist = 0.01;

  force.x = -force.x / (Math.pow(dist,2)) * m;
  force.y = -force.y / (Math.pow(dist,2)) * m;
  force.z = -force.z / (Math.pow(dist,2)) * m;

  return force;
}
