const fragment = `
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_var;

vec3 cosPalette( float t, vec3 brightness, vec3 contrast, vec3 osc, vec3 phase){
    return brightness + contrast*cos( 6.28318 * (osc*t+phase));
    }


void main(){
   vec2 uv = gl_FragCoord.xy/u_resolution;



   float radius = length(uv);
   

   float ring = sin(u_time - radius * 10.);
   
   

   float angle = sin(atan(uv.x,uv.y)+u_time);    
   

   float swirl = sin(ring - cos(angle) + u_time);
   
   

   vec3 brightness = vec3(0.3);
   vec3 contrast = vec3(0.5);
   vec3 osc = vec3(0.5,sin(1.+u_time),sin(0.1 + u_time/2.0));
   vec3 phase = vec3(0.5,0.9,0.5);
   
   

   vec3 palette = cosPalette(angle + swirl + ring, brightness, contrast, osc, phase);



    vec3 color = vec3(0.0,0.0,uv.x);
    if( u_var == 0.0 ){
        color = vec3(0.0,1.0,0.0);
    };

    if( u_var == 1.0 ){
        color = vec3(1.0,0.0,0.0);
    }

    gl_FragColor = vec4(palette,1.0);
}
`;
export default fragment;
