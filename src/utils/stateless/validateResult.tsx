import { errors } from '../constants/index'

export const validateResult = (result: string) => {
    try {
        const splitResult = result?.split(";") // "splitResult" recebe um Array (String "result" por ";")
        const typeFile = splitResult[0] || false // "typeFile" recebe o tipo do arquivo
        const fileBase64 = splitResult[1] || false // "fileContent" recebe o conteúdo do arquivo

        if (!typeFile) return { success: false, ...errors.invalidFile }
        // Se não encontrar o Tipo de arquivo, gera uma mensagem de erro

        if (typeFile !== 'data:text/plain') return { success: false, ...errors.invalidExtension }
        // Se o Tipo de arquivo não for "text/plain", gera uma mensagem de erro

        if (!fileBase64) return { success: false, ...errors.emptyFile }
        // Se o arquivo estiver vazio, gera uma mensagem de erro

        const splitFileContent = fileBase64?.split(",") // "splitFileContent" recebe um Array (String "fileContent" por ",")
        const fileFormat = splitFileContent[0] || false // "typeFile" recebe o tipo do arquivo
        const fileContent = splitFileContent[1] || false // "fileContent" recebe o conteúdo do arquivo

        if (!fileFormat || fileFormat !== 'base64') return { success: false, ...errors.invalidFile }
        // Se não encontrar o Formato do arquivo ou for diferente de "base64", gera uma mensagem de erro

        if (!fileContent || fileContent.length === 0) return { success: false, ...errors.emptyFile }
 
        let buff = new Buffer(fileContent, 'base64')
        let text = buff.toString('ascii')
        const linesLength = text.split(/\r\n|\r|\n/).length
        const lines = text.split(/\r\n|\r|\n/)
        if (linesLength%2 === 0 && lines[linesLength-1]!=='') {          
          return { success: false, ...errors.invalidNumberLines } 
        }
        // Se o arquivo tiver um número ímpar de linhas, gera uma mensagem de erro

        let linesCount = 0
        let validFile = true

        lines.forEach(line => {
          if (linesCount === 0 && line.length < 3) validFile = false
          else if (linesCount !== 0 && linesCount%2 === 1 && line !== '' && line.length < 5) validFile = false
          else if (linesCount !== 0 && linesCount%2 === 0 && line !== '' && line.length === 0) validFile = false
          linesCount++
        })
        return { 
          success: validFile, 
          message: validFile ? 'Arquivo válido' : 'Arquivo inválido',
          fileContent: validFile ? fileContent : null
        }
    } catch (e) {
      return { success: false, ...errors.invalidFile }
    }
}
