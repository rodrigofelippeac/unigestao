import { useMutation } from '@tanstack/react-query'
import { bancoTalentosService } from '../services/bancoTalentosService'

/**
 * Hook para o cadastro no Banco de Talentos.
 * Usa useMutation do TanStack Query para controlar o ciclo de envio.
 *
 * @param {Object} [options] - Opções adicionais para o useMutation
 * @returns {import('@tanstack/react-query').UseMutationResult}
 *
 * @example
 * const { mutate, isPending, isSuccess, isError, error } = useBancoTalentos()
 * mutate(dadosDoFormulario)
 */
export function useBancoTalentos(options = {}) {
  return useMutation({
    mutationFn: (dados) => bancoTalentosService.cadastrar(dados),
    ...options,
  })
}
