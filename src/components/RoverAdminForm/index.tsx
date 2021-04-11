import React, {
    useState,
    useRef,
    ChangeEvent
  } from 'react'
import './style.css'
import { throwMessage, validateResult } from '../../utils/index'
import { errors } from '../../utils/constants/index' // ./constants/index

const RoverAdminForm: React.FC = () => {
    const inputFile = useRef<HTMLInputElement>(null)
    const inputContentFile = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<Boolean>(false)
    const [valid, setValid] = useState<Boolean>(false)
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const _sendForm = () => {
        if (!valid) return throwMessage(errors.selectValidFile.message, 5, setError)

        alert("Função de enviar o formulário > File: "+ fileContent)
    }
    const _getFileContent = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const reader = new FileReader()
            reader.onload = async (e) => { // Função executada quando a leitura do arquivo termina
                const result = (e.target)?.result // "result" recebe o conteúdo do arquivo em Base64
                if (typeof result !== 'string') return throwMessage("Erro desconhecido", 5, setError)
                // Se o conteúdo for do tipo STRING...
                
                const validatedResult = validateResult(result) 
                // Envio o arquivo para a função de validar o arquivo

                if (!validatedResult.success) return throwMessage(validatedResult.message, 5, setError)
                if (validatedResult.fileContent !== undefined) {
                    setFileContent(validatedResult.fileContent)
                    setValid(true)                    
                }
                return result
            }
            const files = e.target.files || []
            if (files.length>0) reader.readAsDataURL(files[0])
        } catch (e) {
            alert(e.message)
            return false
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <form>
                    <input type="hidden" ref={inputContentFile} />
                    <label>Arquivo de texto com os comandos</label>
                    <div>
                        <input 
                            type="file" 
                            placeholder="Arquivo de texto" 
                            ref={inputFile} 
                            onChange={(e) => _getFileContent(e)}
                        />
                        <div 
                            className={valid ? "btn-send" : "btn-send-inactive" }
                            title={valid ? "Enviar arquivo" : errors.selectValidFile.message }
                            onClick={_sendForm}
                        >
                            Enviar
                        </div>
                    </div>
                    <small>
                        Selecione no seu dispositivo o arquivo de texto com os comandos de movimentos 
                        dos rovers.
                    </small>
                    {error !== null &&
                    <div className="card error-card">
                        <div className="card-body">
                            {error}
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default RoverAdminForm
