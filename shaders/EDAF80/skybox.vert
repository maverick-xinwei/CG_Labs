#version 410
layout (location=0) in vec3 vertex;
layout (location=1) in vec3 normal;
layout (location=2) in vec3 texcoord;
layout (location=3) in vec3 tagent;
layout (location=4) in vec3 binormal;

uniform mat4 vertex_model_to_world;
uniform mat4 normal_model_to_world;
uniform mat4 vertex_world_to_clip;

out VertShader_OUT {
    vec3  normal;
    vec3 texcoord;
    vec3 tagent;
    vec3 binormal;
    vec3 vertex;
} vertshader_out;

void main()
{
    vertshader_out.normal = normalize(vec3(normal_model_to_world*vec4(normal, 0.0)));
    vertshader_out.texcoord = texcoord;
    vertshader_out.tagent = normalize(vec3(normal_model_to_world*vec4(tagent, 0.0)));
    vertshader_out.binormal = normalize(vec3(normal_model_to_world*vec4(binormal, 0.0)));
    vertshader_out.vertex = vertex;

	gl_Position = vertex_world_to_clip * vertex_model_to_world * vec4(vertex, 1.0);

}


