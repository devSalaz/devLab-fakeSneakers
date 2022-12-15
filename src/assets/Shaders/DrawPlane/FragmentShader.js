export default /*glsl*/ `
varying vec2 vUv;
uniform float uValue;
uniform float uTime;
uniform float uValueRadius;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uColor;
uniform float uHelper;
uniform vec3 uColorValue1;
uniform vec3 uColorValue2;

void main()
{
    float PI = 3.1415926535897932384626433832795;
    float clampedTime = clamp(0.5, 1.0, sin(1.0 + uTime * 0.05));
    float angle = atan(vUv.x - 0.5 + (0.0 * uOffsetX), vUv.y - 0.5 + (0.0 * uOffsetY)) / (PI * 1.5 - (uHelper * 0.75)) + 0.5;
    float radius = 0.3 + (uHelper * 0.1) + sin(angle  * 50.0 + 1.68 ) * 0.04 + (0.02 * uHelper);
    float strength = 1.0 - step(0.01 + (0.3 * uValueRadius), abs(distance(vUv, vec2(0.5 + (0.035 * uOffsetX), 0.5 + (0.035 * uOffsetY))) - radius * uValue));

    vec4 colorYellow = vec4( uColorValue1.rgb, 1.0);
    vec4 colorBlue = vec4( uColorValue2.rgb, 1.0);
    vec4 colorFinal = mix(colorBlue, colorYellow, uColor);
    vec4 colorGrey = vec4(1.0, 1.0, 1.0, 0.0);
    vec4 mixedColor = mix( colorGrey, colorFinal, strength);
    gl_FragColor = vec4( mixedColor);
}
`;
