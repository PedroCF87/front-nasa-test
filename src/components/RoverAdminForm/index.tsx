import React, {
    useState,
    useRef,
    ChangeEvent
  } from 'react'
import './style.css'
import { throwMessage, validateResult, sendData } from '../../utils/stateless/index'
import { errors } from '../../utils/constants/index'

const RoverAdminForm: React.FC = () => {
    const inputFile = useRef<HTMLInputElement>(null)
    const inputContentFile = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<Boolean>(false)
    const [valid, setValid] = useState<Boolean>(false)
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [successResponse, setSuccessResponse] = useState<HTMLElement[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const _sendForm = async () => {
        try {
            setSuccessResponse(null)
            setLoading(true)
            if (!valid) return throwMessage(errors.selectValidFile.message, 5, setError)
            // Se o arquivo for inválido, gera uma mensagem de erro

            if (fileContent === null) return throwMessage(errors.emptyFile.message, 5, setError)
            // Se o arquivo estiver vazio, gera uma mensagem de erro

            const response = await sendData(fileContent)

            console.log(">> response: ", response)
            

            if (response.error) {
                setLoading(false)
                return throwMessage(response.error.message, 5, setError)
            }
            // Se o back-end retornar algum erro, a mensagem é exibida na tela
            
            const responseArray = response.result

            let responsesHTML = responseArray.map((res: string) => {                
                return <div key={(Date.now()+res).toString()}>{res}</div>
            })
            
            // Para simular o tempo que levaria para se comunicar com os rovers em Marte
            // Usei um "setTimeout", para que seja possível visualizar a mensagem de carregando
            setTimeout(() => {
                if (responsesHTML.length > 0) setSuccessResponse(responsesHTML)
                setLoading(false)
            }, 1000)

        } catch (e) {
            console.log(">> Erro do Catch (index.ts): ", e)
            return throwMessage(e.message, 5, setError)
        }
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
        <>
        <div className="card" key="DefaultCard">
            <div className="card-body">
                <form>
                    <input type="hidden" id="test-input" />
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
                            id="btnSend"
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
        {loading &&
            <div className="card loading-card" key="LoadingCard">
                <div className="card-body">
                    <img src='/images/loading.gif' alt='Carregando' />
                    <span>Processando movimentos dos rovers</span>
                </div>
            </div>
        }
        {successResponse !== null &&
            <div className="card response-card" key="ResponseCard">
                <div className="card-body">
                    <h4>Resposta recebida</h4>
                    {successResponse}
                </div>
            </div>
        }
        </>
    )
}

export default RoverAdminForm
