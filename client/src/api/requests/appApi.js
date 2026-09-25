import httpCliente from "../services/httpCliente";

export const validateTokenAPI = () => {
    return new Promise((resolve, reject) => {
        httpCliente
            .get("app/verify_token")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// El menú es siempre el del usuario de la sesión: no se envía perfil ni id.
export const getMenuAPI = () => {
    return new Promise((resolve, reject) => {
        httpCliente
            .get("app/get_menu")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getStatusesByScopeAPI = (scope, excludesKeys = []) =>
    httpCliente.get(`app/get_statuses_by_scope`, { scope, excludesKeys });
