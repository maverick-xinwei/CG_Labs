#version 410

in VertShader_OUT {
    vec3  normal;
    vec3 texcoord;
    vec3 tagent;
    vec3 binormal;
    vec3 vertex;
    vec3 fragPos;
} vs_in;

uniform sampler2D diffuse_texture;
uniform sampler2D specular_texture;
uniform sampler2D normal_map_texture;
uniform vec3 light_position;
uniform vec3 camera_position;
uniform bool use_normal_mapping;

uniform vec3 diffuse_colour;
uniform vec3 specular_colour;
uniform vec3 ambient_colour;
uniform float shininess_value;

out vec4 fragColor;
void main()
{
    vec3 normalized_light_dir = normalize(vs_in.fragPos - light_position);
    vec3 normalized_view_dir = normalize(camera_position-vs_in.fragPos);

    // normal mapping
    vec3 normal_tex = normalize(texture(normal_map_texture, vs_in.texcoord.xy).rgb - 0.5);
    mat3 m_tbn =  mat3(vs_in.tagent, vs_in.binormal, vs_in.normal); 
    vec3 tbn_normal = normalize(m_tbn*normal_tex.xyz);

    vec3 _normal = use_normal_mapping ?  tbn_normal:vs_in.normal;

    vec3 rflct_light = normalize(reflect(normalized_light_dir, _normal));

    // ambient
    vec3 abmient_light = ambient_colour; //*(1.0, 1.0, 1.0)

    // diffuse
    float diffuse_l = max(dot(-normalized_light_dir, _normal),0);
    vec3 diffuse_light = diffuse_colour*diffuse_l*vec3(texture(diffuse_texture, vs_in.texcoord.xy));

    // specular
    float specular_l;
    specular_l = diffuse_l >0.0 ? pow(max(dot(normalized_view_dir, rflct_light), 0), shininess_value): 0.0;
    vec3 specular_light = specular_colour* specular_l*vec3(texture(specular_texture, vs_in.texcoord.xy));

    // normal map
    fragColor  = vec4(abmient_light + diffuse_light + specular_light , 1.0);
    //fragColor  = vec4(ambient_colour + diffuse_colour , 1.0);
}