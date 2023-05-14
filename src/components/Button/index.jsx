import { Container } from './styles.js'

export function Button( {title, loading = false, ...rest} ){
    return (
        
        <Container type='button' disabled = {loading} {...rest}>
            {loading ? 'Carregando...': title}
        </Container>
    )
}

/*
* Tags:
* 1 parte = propriedades: title, name, disabled ...
* 2 parte = conteúdo do botão (texto)
* Operador Rest (...rest) = permite que vc não tenha que declarar todas as propriedades
* Ë possível fazer lógica devido ao JS
* {text here} indica uma desestruturação
*/