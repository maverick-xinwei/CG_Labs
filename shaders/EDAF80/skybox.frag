#version 410

in VertShader_OUT {
    vec3  normal;
    vec3 texcoord;
    vec3 tagent;
    vec3 binormal;
    vec3 vertex;
} vertshader_in;


out vec4 fragColor;

uniform samplerCube texture_cube;
uniform bool has_texture_cube;

void main()
{
    fragColor = texture(texture_cube, vertshader_in.vertex);
}