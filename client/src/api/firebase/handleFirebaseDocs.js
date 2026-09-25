import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { saveDocApi, deleteDocApi } from "api/requests/documentsAPI";
import { newIdempotencyKey } from "utils/idempotency";
import { storage } from "./firebaseConfig";

// El autor (doc_create_by / doc_update_by) lo pone el backend desde la sesión:
// el cliente no lo envía. userName solo se usa para mostrar el archivo recién
// subido en la lista local, antes de recargarla.
//
// idempotencyKey: una por archivo (utils/idempotency.js). Si no se pasa, se
// genera aquí, antes de subir: el reintento automático de httpCliente tras
// renovar la sesión reenvía la misma petición y, con ella, la misma clave.
export const uploadFile = async (moduloId, file, userName, modulo, idempotencyKey = newIdempotencyKey()) => {
    const path = `TEMPLATE/${modulo}/${moduloId}/${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    const { data } = await saveDocApi({
        docType: modulo,
        docIdRef: moduloId,
        nombre: file.name,
        extension: file.name.split(".").pop(),
        mimeType: file.type || "application/octet-stream",
        tamanio: file.size,
        docPathStorage: path,
        url,
    }, idempotencyKey);

    return {
        url,
        path,
        savedDoc: {
            id: data.id,
            nombre: file.name,
            extension: file.name.split(".").pop(),
            mimeType: file.type || "application/octet-stream",
            tamanio: file.size,
            url,
            docPathStorage: path,
            usuReg: userName,
            fecReg: new Date().toISOString(),
            tipo: "archivo",
        },
    };
};

export const deleteFileByPath = async (fullPath, id) => {
    const fileRef = ref(storage, fullPath);
    await deleteObject(fileRef).catch(() => {});
    await deleteDocApi({ id });
};
