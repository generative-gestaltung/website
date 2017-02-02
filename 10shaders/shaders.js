var passA_vertex = `
	attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec2 aTextureCoord;

    varying vec2 vTextureCoord;
    varying vec3 vColor;

    void main(void) {
        vColor = aVertexColor;
        vTextureCoord = aTextureCoord;
        gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);
    }
`;

var passA_fragment = `
	precision mediump float;

  	varying vec2 vTextureCoord;
  	varying vec3 vColor;

  	uniform sampler2D uSampler0;
	uniform sampler2D uSampler1;

	uniform float uTime;

	void main(void) {

		float min0 = 99999.0;
		float min1 = 99999.0;
		
		float d[30];
		float max = sin(uTime*250.0)*14.0+16.0;
		int maxI = int(max);

		for (int i=0; i<30; i++) {

			if (i<maxI) {
				//float spread = float(i)*max/300.0;
				vec4 c0 = texture2D (uSampler0, vec2(float(i)/30.0,float(i)*0.01+uTime*10.0));
				
				vec2 pos = mix (vec2(512.0), c0.xy*1024.0, max/30.0);
				
				d[i] = distance(pos, gl_FragCoord.xy) / 240.0;
				if (d[i]<min0)
					min0 = d[i];
			}
		}

		for (int i=0; i<30; i++) {
			if (d[i]<min1 && d[i]>min0)
				min1 = d[i];
		}
		vec3 c1 = vec3(min1,0.0,1.0); //texture2D (uSampler0, vTextureCoord).xyz;
		float b = 1.0-(1.1*min0*min0); //min1 - min0;
		b = b*b;
		gl_FragColor = vec4 (b*c1, 1.0);
	}
`;


var passB_fragment = `
	precision mediump float;

  	varying vec2 vTextureCoord;
  	varying vec3 vColor;

  	uniform sampler2D uSampler0;
	uniform sampler2D uSampler1;
	uniform vec3 randSeed;
	uniform float uTime;
	uniform vec2 sSize;

	float rand(vec2 co){
    	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	float quant (float x, float n) {
		return floor (x*n) / n;
	}

	vec2 quant (vec2 x, float n) {
		return floor (x*n) / n;	
	}

	void main(void) {

		vec4 noise0 = texture2D (uSampler0, vTextureCoord);
		vec4 noiseY = texture2D (uSampler0, vec2(uTime*10.0, vTextureCoord.y*0.4));

		float d[16];
		float min0 = 99999.0;
		float min1 = 99999.0;

		for (int i=0; i<25; i++) {	
			vec2 p = vec2(mod(float(i),5.0), float(i/5));
			p += vec2(rand(p)-0.5, rand(p+vec2(0,200.0)-0.5));
			vec2 pos = p*sSize/3.0 + sSize/3.0;
			d[i] = distance(pos, gl_FragCoord.xy) / 250.0;
			if (d[i]<min0)
				min0 = d[i];
		}

		for (int i=0; i<16; i++) {
			if (d[i]<min1 && d[i]>min0)
				min1 = d[i];
		}

		float b = (min1-min0) - noise0.z*0.1;
		float r = rand (vTextureCoord*0.0001*noiseY.x+randSeed.xy);

		//float bb = sin(uTime*4200.0*sin(uTime*2800.0+vTextureCoord.x*0.01))*0.5+0.5;
		
		float tx = vTextureCoord.x*11.0*noiseY.x;

		float bb = sin(noiseY.x*6.3+noiseY.z*2.5*sin(noise0.x)+noise0.x)*0.5+0.5; // + uTime*1000.0 + noiseY.x*1.0)*0.5+0.5;
		
		vec3 out0 = vec3(bb+r*0.4-0.15,bb,bb+r*0.5-0.15); //vec3(0.5)+(vec3(r,0.0,r)*0.4-vec3(bb));
		vec3 out1 = vec3 (noiseY.a);

		float t = sin(uTime*400.0)*0.5+0.5;
		if (t<0.0) t = 0.0;
		if (t>1.0) t = 1.0;
		
		if (b>sin(uTime*400.0)*0.7+0.5)
			gl_FragColor = vec4 (out0, 1.0);
		else
			gl_FragColor = vec4 (out1, 1.0);
		
		//gl_FragColor = vec4(mix(out0, out1, 0.0),1.0);
	}
`;

var passC_fragment = `
	precision mediump float;

  	varying vec2 vTextureCoord;
  	varying vec3 vColor;

  	uniform sampler2D uSampler0;
	uniform sampler2D uSampler1;
	uniform vec3 randSeed;
	uniform float uTime;
	uniform vec2 sSize;

	float rand(vec2 co){
    	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	float quant (float x, float n) {
		return floor (x*n) / n;
	}

	vec2 quant (vec2 x, float n) {
		return floor (x*n) / n;	
	}

	void main(void) {

		vec4 noise0 = texture2D (uSampler0, vTextureCoord);
		vec4 noiseY = texture2D (uSampler0, vec2(uTime*10.0, vTextureCoord.y*0.4));

		float r = rand (vTextureCoord*0.0001*noiseY.x+randSeed.xy);
		
		float tx = vTextureCoord.x*11.0*noiseY.x;
		float bb = sin(noise0.x*6.3+noiseY.z*2.5*sin(noise0.x)+noise0.x)*0.5+0.5; // + uTime*1000.0 + noiseY.x*1.0)*0.5+0.5;
		
		float b = vTextureCoord.x - noiseY.z*0.1 - noiseY.x*0.4;
		if (b>sin(uTime*400.0)*0.7+0.5)
			gl_FragColor = vec4 (1.0, r, r, 1.0);
		else
		
			gl_FragColor = vec4(bb, bb, bb, 1.0);
	}
`;