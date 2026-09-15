#include "interpolation.hpp"

glm::vec3
interpolation::evalLERP(glm::vec3 const& p0, glm::vec3 const& p1, float const x)
{
	//! \todo Implement this function
	return p0 *(1-x) + p1*x;
}

glm::vec3
interpolation::evalCatmullRom(glm::vec3 const& p0, glm::vec3 const& p1,
                              glm::vec3 const& p2, glm::vec3 const& p3,
                              float const t, float const x)
{
	//! \todo Implement this function
	
	glm::vec4 a(0, -1*t, 2*t, -1*t);
	glm::vec4 b(1, 0, t-3, 2-t);
	glm::vec4 c(0, t, 3-2*t, t-2);
	glm::vec4 d(0, 0, -1*t, t);
	glm::vec4 vx(1,x,x*x, x*x*x);
	glm::mat4x4 hm(a,b,c,d);
	glm::mat4x3 p(p0, p1, p2, p3);

	glm::vec3 res = vx*hm*glm::transpose(p);
	return res;
	//return glm::vec3();
}
