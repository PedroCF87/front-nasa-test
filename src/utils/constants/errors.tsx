
export const errors = {
    // Erros de Validação do arquivo de text
    invalidFile: {
        code: 1,
        message: 'Arquivo inválido.'
    },
    invalidExtension: {
        code: 2,
        message: 'Extensão de arquivo inválida. Envie um arquivo ".txt".'
    },
    emptyFile: {
        code: 3,
        message: 'Arquivo vazio'
    },
    invalidNumberLines: {
        code: 4,
        message: 'Número de linhas inválido. O arquivo deve ter um número ímpar de linhas.'
    },
    selectValidFile: {
        code: 5,
        message: 'Selecione um arquivo válido'
    }
}
