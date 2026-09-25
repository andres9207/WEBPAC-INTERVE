import httpCliente from "../services/httpCliente";
import { idempotencyConfig } from "utils/idempotency";

export const paginationDocsApi = (params) => {
    return httpCliente.post(`app/documents/pagination`, params);
};

// idempotencyKey: obligatoria al crear (ver utils/idempotency.js).
export const saveDocApi = (params, idempotencyKey) => {
    return httpCliente.post(`app/documents/save`, params, idempotencyConfig(idempotencyKey));
};

export const deleteDocApi = (params) => {
    return httpCliente.put(`app/documents/delete`, params);
};
