import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconCircleCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react';

import { contractLiquidationApi } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess, showWarn } from 'services/ToastService';

/**
 * Condiciones de liquidación del contrato (ADR-0017, DEC-081). El contrato en
 * liquidación pasa solo a liquidado cuando las cumple todas: al aprobar,
 * anular o eliminar una factura, al modificar el otrosí de liquidación o al
 * registrar una póliza. Aquí se ve cuáles faltan y qué falta en cada una;
 * todo lo calcula el servidor, con las mismas reglas de la transición.
 *
 * "Volver a evaluar" sirve para un contrato que ya cumplía todo antes de que
 * existiera la liquidación automática; lo ofrece el permiso del otrosí de
 * liquidación. El servidor decide.
 */

const ICONS = {
  met: { Icon: IconCircleCheck, color: 'success.dark', text: 'Cumple' },
  unmet: { Icon: IconCircleX, color: 'error.main', text: 'Falta' },
  info: { Icon: IconInfoCircle, color: 'warning.dark', text: 'Verificar' }
};

const statusOf = (condition) => (condition.met ? ICONS.met : condition.blocking ? ICONS.unmet : ICONS.info);

function ConditionRow({ condition }) {
  const { Icon, color, text } = statusOf(condition);
  return (
    <Stack direction="row" spacing={1.5} sx={{ py: 1.25, alignItems: 'flex-start', borderBottom: 1, borderColor: 'divider' }}>
      <Box component="span" sx={{ color, display: 'flex', pt: 0.25 }}>
        <Icon size={20} stroke={1.75} aria-hidden />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
          {condition.label}
          {!condition.blocking && (
            <Typography component="span" variant="caption" color="text.secondary">
              {' '}
              · no impide liquidar
            </Typography>
          )}
        </Typography>
        {condition.detail && (
          <Typography variant="caption" color="text.secondary" component="p">
            {condition.detail}
          </Typography>
        )}
      </Box>
      {/* El color no es la única señal (DESIGN_SYSTEM): el estado va también en texto. */}
      <Typography variant="caption" sx={{ color, fontWeight: 500, flexShrink: 0 }}>
        {text}
      </Typography>
    </Stack>
  );
}

ConditionRow.propTypes = { condition: PropTypes.object.isRequired };

export default function LiquidationTab({ contract, onChanged }) {
  const { permissionsCatalog, hasPermission } = useAuth();
  const canEvaluatePerm = permissionsCatalog.work?.contracts?.createLiquidation;
  const canEvaluate = canEvaluatePerm != null && hasPermission(canEvaluatePerm) && contract.state === 'IN_LIQUIDATION';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data: result } = await contractLiquidationApi.get(contract.ctrId);
      setData(result);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar las condiciones de liquidación');
    } finally {
      setLoading(false);
    }
  }, [contract.ctrId]);

  // Se recarga con el contrato: una factura, una póliza u otro usuario pudieron cambiar las condiciones.
  useEffect(() => {
    load();
  }, [load, contract.updatedAt, contract.state]);

  const evaluate = async () => {
    setEvaluating(true);
    try {
      const { data: result } = await contractLiquidationApi.evaluate(contract.ctrId);
      if (result.contractLiquidated) {
        showSuccess(result.message);
        onChanged();
      } else {
        showWarn(result.message);
        load();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo evaluar la liquidación');
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }
  if (!data) return null;

  const liquidated = data.state === 'LIQUIDATED';

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, minWidth: 240 }}>
          {liquidated
            ? 'El contrato está liquidado. Las condiciones se muestran con los datos de hoy.'
            : 'El contrato pasa solo a liquidado cuando cumple todas las condiciones. Se revisan al aprobar, anular o eliminar una factura, al modificar el otrosí de liquidación y al registrar o renovar una póliza.'}
        </Typography>
        {canEvaluate && (
          <Button variant="outlined" color="secondary" onClick={evaluate} disabled={evaluating}>
            {evaluating ? 'Evaluando…' : 'Volver a evaluar'}
          </Button>
        )}
      </Stack>

      {!liquidated && (
        <Alert severity={data.pending === 0 ? 'success' : 'info'}>
          {data.pending === 0
            ? 'Cumple todas las condiciones. Se liquidará con el próximo hecho, o al volver a evaluar.'
            : `${data.pending === 1 ? 'Falta 1 condición' : `Faltan ${data.pending} condiciones`} para liquidar el contrato.`}
        </Alert>
      )}

      <Box component="section" aria-label="Condiciones de liquidación">
        {data.conditions.map((condition) => (
          <ConditionRow key={condition.key} condition={condition} />
        ))}
      </Box>

      <Typography variant="caption" color="text.secondary">
        El otrosí de liquidación hace de documento de liquidación. El valor contratado es el inicial más los otrosíes antes de IVA, y se
        compara con lo facturado aprobado (normales y liquidación), con una diferencia de hasta el {data.tolerancePct.replace('.', ',')} %.
      </Typography>
    </Stack>
  );
}

LiquidationTab.propTypes = { contract: PropTypes.object.isRequired, onChanged: PropTypes.func.isRequired };
