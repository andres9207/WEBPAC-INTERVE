import { contactsToForm, contactsToPayload } from 'utils/contacts';

/**
 * Modelo del formulario de un proveedor (ADR-0012, DEC-031): identidad, datos
 * generales y contactos, enviados juntos en una sola petición. El servidor
 * guarda los contactos por diferencial.
 */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMPTY_FORM = {
  iddId: '',
  identification: '',
  name: '',
  pvtIds: [],
  serviceType: '',
  email: '',
  observation: '',
  contacts: []
};

/** Pestaña donde se edita cada campo; el resto, en "Datos del proveedor". */
export const FIELD_TAB = { contacts: 'contacts' };

export const text = (value) => String(value ?? '').trim();

export const toForm = (provider) => ({
  iddId: provider.iddId,
  identification: provider.identification,
  name: provider.name,
  pvtIds: provider.pvtIds ?? [],
  serviceType: provider.serviceType ?? '',
  email: provider.email ?? '',
  observation: provider.observation ?? '',
  contacts: contactsToForm(provider.contacts)
});

export const toPayload = (prvId, form) => ({
  prvId,
  iddId: form.iddId,
  identification: text(form.identification),
  name: text(form.name),
  pvtIds: form.pvtIds,
  serviceType: text(form.serviceType),
  email: text(form.email),
  observation: text(form.observation),
  contacts: contactsToPayload(form.contacts)
});
