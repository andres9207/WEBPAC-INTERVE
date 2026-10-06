/**
 * Contactos tipificados (ADR-0009), comunes a proveedor y obra: el servidor
 * los devuelve con la misma forma (`contactId`, `adtId`, `addressType`,
 * campos de texto y `main`) y los recibe igual. ContactsEditor los edita en
 * memoria; estas funciones los pasan del detalle al formulario y de vuelta.
 */

const TEXT_FIELDS = ['name', 'position', 'address', 'phone', 'mobile', 'fax', 'email', 'observation'];
const text = (value) => String(value ?? '').trim();

/** Del detalle al formulario: filas con `key` y textos vacíos en vez de null. */
export const contactsToForm = (contacts = []) =>
  contacts.map((c) => ({
    key: `c-${c.contactId}`,
    ...c,
    ...Object.fromEntries(TEXT_FIELDS.map((field) => [field, c[field] ?? '']))
  }));

/** Del formulario al payload: sin `key` ni nombre del tipo; `contactId` solo en los existentes. */
export const contactsToPayload = (rows = []) =>
  rows.map((c) => ({
    ...(c.contactId ? { contactId: c.contactId } : {}),
    adtId: c.adtId,
    ...Object.fromEntries(TEXT_FIELDS.map((field) => [field, text(c[field])])),
    main: Boolean(c.main)
  }));

/** Medios de contacto para mostrar, en orden. */
export const contactChannels = (c) =>
  [c.address, c.phone && `Tel. ${c.phone}`, c.mobile && `Cel. ${c.mobile}`, c.fax && `Fax ${c.fax}`, c.email].filter(Boolean);
