import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import SearchSelect from 'ui-component/extended/SearchSelect';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';

/**
 * Selector de un maestro: carga las opciones con `fetchApi` y las recarga
 * cuando llega `socketEvent` (otro usuario cambió el maestro). Se ve y se
 * comporta como el desplegable con buscador de todo el sistema (SearchSelect).
 *
 * `error` es el objeto de react-hook-form (`{ message }`).
 */
const SelectSocket = ({ value, onChange, error, disabled, label, required, fetchApi, mapOptions, socketEvent, onOptionChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

  const refreshOptions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchApi();
      const data = res?.data ?? res ?? [];
      const mapped = mapOptions ? mapOptions(data) : data;
      setOptions(mapped.map((o) => ({ ...o, value: o.value ?? o.id, label: o.label ?? o.nombre ?? '' })));
    } catch (err) {
      showError(err.response?.data?.message || `Error al cargar ${label?.toLowerCase() ?? 'las opciones'}`);
    } finally {
      setLoading(false);
    }
  }, [fetchApi, mapOptions, label]);

  useEffect(() => {
    refreshOptions();
  }, [refreshOptions]);

  useEffect(() => {
    if (!socket || !socketEvent) return undefined;
    socket.on(socketEvent, refreshOptions);
    return () => socket.off(socketEvent, refreshOptions);
  }, [socket, socketEvent, refreshOptions]);

  return (
    <SearchSelect
      value={value}
      onChange={onChange}
      onOptionChange={onOptionChange}
      options={options}
      loading={loading}
      disabled={disabled}
      label={label}
      required={required}
      error={error?.message}
    />
  );
};

SelectSocket.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  fetchApi: PropTypes.func.isRequired,
  mapOptions: PropTypes.func,
  socketEvent: PropTypes.string,
  onOptionChange: PropTypes.func
};

export default SelectSocket;
