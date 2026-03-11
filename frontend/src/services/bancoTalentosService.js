import { api } from './api'

/**
 * Service para o Banco de Talentos.
 *
 * Endpoint planejado: POST /api/banco-talentos
 * TODO: Backend ainda não implementado. Quando disponível, remover o delay simulado
 * e descomentar a chamada real à API.
 */
export const bancoTalentosService = {
  /**
   * Envia o cadastro de currículo do candidato.
   * O arquivo é enviado via FormData (multipart/form-data).
   *
   * @param {Object} dados - Dados do candidato
   * @param {string} dados.nome
   * @param {string} dados.email
   * @param {string} dados.telefone
   * @param {string} dados.areaInteresse
   * @param {string} [dados.pretensaoSalarial]
   * @param {string} [dados.linkedin]
   * @param {string} dados.resumo
   * @param {File} dados.curriculo - Arquivo PDF/DOC/DOCX
   * @returns {Promise<Object>}
   */
  async cadastrar(dados) {
    const formData = new FormData()

    formData.append('nome', dados.nome)
    formData.append('email', dados.email)
    formData.append('telefone', dados.telefone)
    formData.append('areaInteresse', dados.areaInteresse)
    formData.append('resumo', dados.resumo)

    if (dados.pretensaoSalarial) {
      formData.append('pretensaoSalarial', dados.pretensaoSalarial)
    }

    if (dados.linkedin) {
      formData.append('linkedin', dados.linkedin)
    }

    if (dados.curriculo) {
      formData.append('curriculo', dados.curriculo)
    }

    // TODO: Descomentar quando o backend estiver disponível:
    // const response = await api.post('/banco-talentos', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })
    // return response.data

    // Simulação temporária enquanto o backend não existe
    await new Promise((resolve) => setTimeout(resolve, 1800))
    return { success: true, mensagem: 'Currículo cadastrado com sucesso!' }
  },
}
