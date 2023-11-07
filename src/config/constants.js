const baseUrl = 'http://localhost:5000'

export const Constants = {
    baseUrl,
    url_register: baseUrl + "/api/auth/register",
    url_login: baseUrl + "/api/auth/login",
    url_requestResetPassword: baseUrl + '/api/auth/request-reset-password',
    url_resetPassword:baseUrl+"/api/auth/reset-password",
    url_products: baseUrl + "/api/product/products",
    url_profile: baseUrl + "/api/profile/profiles",
    url_profilePic:baseUrl+"/api/profile//profiles/profile-pic"
}




