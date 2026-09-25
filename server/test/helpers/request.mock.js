// req de Express mínimo para tests de controllers: agrega `req.get(nombre)`
// (encabezados, sin distinguir mayúsculas), que usan los controllers para
// leer p. ej. Idempotency-Key.
export const mockReq = (req, headers = {}) => {
  const lower = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  return { ...req, get: (name) => lower[String(name).toLowerCase()] };
};
