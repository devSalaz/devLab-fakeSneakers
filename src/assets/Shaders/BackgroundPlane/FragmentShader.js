export default /*glsl*/ `

uniform float uValue;
uniform float uTime;
uniform vec3 uColorValue1;
uniform vec3 uColorValue2;
varying vec2 vUv;

void main()
{
    float PI = 3.1415926535897932384626433832795;
    
    vec4 colorRed = vec4(uColorValue2.rgb, 1.0);
    vec4 colorPurple = vec4(uColorValue1.rgb, 1.0);



    float strength = smoothstep(uValue, uValue + 0.3 , (vUv.x + vUv.y) / 2.0);
    
    vec4 colorMixed = mix(colorRed, colorPurple, strength);

    gl_FragColor = vec4(colorMixed);
}
`;
