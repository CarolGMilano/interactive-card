const form = document.querySelector('[data-form]');

const camposInput = document.querySelectorAll('[data-input]');
const camposCard = document.querySelectorAll('[data-card]');

const escrever = {
    nome(campo) {
        if(campo.name == 'name') {
            if(campo.value == '') {
                camposCard[2].textContent = `Jane Appleseed`
            } else {
                camposCard[2].textContent = `${campo.value}`
            }
        } 
    },
    numero(campo) {
        if(campo.name == 'number') {
            if(campo.value == '') {
                camposCard[1].textContent = `0000 0000 0000 0000`
            } else {
                camposCard[1].textContent = `${campo.value.substring(0,4)} ${campo.value.substring(4,8)} ${campo.value.substring(8,12)} ${campo.value.substring(12,16)}`
            }
        }
    },
    mes(campo) {
        if(campo.name == 'month') {
            if(campo.value == '') {
                camposCard[3].textContent = `00`
            } else {
                camposCard[3].textContent = `${campo.value}`
            }
        }
    },
    ano(campo) {
        if(campo.name == 'year') {
            if(campo.value == '') {
                camposCard[4].textContent = `00`
            } else {
                camposCard[4].textContent = `${campo.value}`
            }
        }
    },
    cvc(campo) {
        if(campo.name == 'cvc') {
            if(campo.value == '') {
                camposCard[0].textContent = `000`
            } else {
                camposCard[0].textContent = `${campo.value}`
            }
        } 
    }
}

const mensagensDeErro = {
    name: {
        valueMissing: `Can't be blank`,
        tooShort: `Too short`,
    },
    number: {
        valueMissing: `Can't be blank`,
        tooShort: `Too short`,
        patternMismatch: `Wrong format, numbers only`
    }, 
    month: {
        valueMissing: `Can't be blank`,
        patternMismatch: `Invalid month`,
        tooShort: `Invalid month`
    },
    year: {
        valueMissing: `Can't be blank`,
        patternMismatch: `Invalid year`,
        tooShort: `Invalid year`
    },
    cvc: {
        valueMissing: `Can't be blank`,
        patternMismatch: `Wrong format, numbers only`,
        tooShort: `Too short`
    }
}

const tiposDeErros = [
    'valueMissing',
    'patternMismatch',
    'tooShort', 
    'customError'
]

    function validarCampos(campo) {
        let mensagem = '';
        
            tiposDeErros.forEach(erro => {
                if(campo.validity[erro]) {
                    mensagem = mensagensDeErro[campo.name][erro];
                }
            })
        
        let campoErro = campo.parentNode.querySelector('[data-erro]');
        const validacaoDoCampo = campo.checkValidity();
        
            if(!validacaoDoCampo) {
                if(campo.name == 'month' || campo.name == 'year') {
                    campoErro = campo.parentNode.parentNode.querySelector('[data-erro]');
                }

                campoErro.textContent = mensagem;
                campo.style.borderColor = 'hsl(0, 100%, 66%)'
            } else {
                if(campo.name == 'month' || campo.name == 'year') {
                    campoErro = campo.parentNode.parentNode.querySelector('[data-erro]');
                }

                campoErro.textContent = '';
                campo.style.borderColor = '#86C8BC'
            }
    }

    function escreverNoCard(campo) {
        const escreverNome = escrever.nome;
        const escreverNumero = escrever.numero;
        const escreverMes = escrever.mes;
        const escreverAno = escrever.ano;
        const escreverCvc = escrever.cvc;
            
            escreverNome(campo);
            escreverNumero(campo);
            escreverMes(campo);
            escreverAno(campo);
            escreverCvc(campo);
    }

        camposInput.forEach(campo => {
            campo.addEventListener('invalid', evento => {
                evento.preventDefault();  
                campo.style.borderColor = 'hsl(0, 100%, 66%)';
            });
            campo.addEventListener('keyup', () => escreverNoCard(campo));
            campo.addEventListener('blur', () => validarCampos(campo));
        })

        form.addEventListener('submit', function(e) {
                e.preventDefault();

            const telaContinue = document.querySelector('[data-continue]');

                telaContinue.style.display = 'flex';
                form.style.display = 'none';
        })

