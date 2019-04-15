//Constructor
Vec3 = function(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}

//Add method
Vec3.prototype.add = function(v){
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

//Sum method
Vec3.prototype.sum = function(){
    return this.x + this.y + this.z;
}

//Min method
Vec3.prototype.min = function(){
    min = this.x;
    if(min > this.y){
	min = this.y;
    }
    if(min > this.z){
	min = this.z;
    }
    return min;
}

//Max method
Vec3.prototype.max = function(){
    max = this.x;
    if(max < this.y){
	max = this.y;
    }
    if(max < this.z){
	max = this.z;
    }
    return max;
}

//Mid method
Vec3.prototype.mid = function(){
    mid = this.sum() - this.min() - this.max();
    return mid;
}

//distance
Vec3.prototype.dis = function(v){
    a = this.x - v.x;
    b = this.y - v.y;
    c = this.z - v.z;
    return(Math.sqrt((a * a) + (b * b) + (c * c)));
}

//tyuten
Vec3.prototype.midpoint = function(v){
    return new Vec3((this.x + v.x)/2, (this.y + v.y)/2, (this.z + v.z)/2);
}

Vec3.prototype.AreaOfTriangle = function(vi, vj){
    var teihen = this.dis(vi);
    var takasa = (this.midpoint(vi)).dis(vj);
    return (teihen * takasa)/2;
}

