// Aguarda até que todo o conteúdo HTML da página seja carregado
document.addEventListener('DOMContentLoaded', () => {
    // Captura os elementos do formulário pelo ID
    const arquivoInput = document.getElementById('arquivo');       // Input do tipo "file" (para selecionar o arquivo)
    const nomeArquivoInput = document.getElementById('nomeArquivo'); // Campo de texto para nome do arquivo
    const extensaoInput = document.getElementById('extensao');     // Campo de texto para extensão do arquivo
    const dataUploadInput = document.getElementById('dataUpload'); // Campo de data do upload (será preenchido automático)
    const form = document.getElementById('uploadForm');            // Formulário principal
    const resultadoDiv = document.getElementById('resultado');     // Div onde será mostrado o resultado

    // --- Preenche a data de upload automaticamente ao carregar a página ---
    const hoje = new Date(); // Cria um objeto Date com a data atual
    const dataFormatada = hoje.toLocaleDateString('pt-BR'); // Formata para padrão brasileiro (dd/mm/aaaa)
    dataUploadInput.value = dataFormatada; // Insere no campo de data

    // --- Captura o evento de envio do formulário ---
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede que o formulário recarregue a página

        // --- Obtém os valores digitados/selecionados nos campos ---
        const arquivo = arquivoInput.files[0]; // Pega o primeiro arquivo selecionado
        const nomeArquivo = nomeArquivoInput.value; // Nome digitado pelo usuário
        const extensao = extensaoInput.value;       // Extensão informada
        const dataCriacao = document.getElementById('dataCriacao').value; // Data de criação (se informada)
        const autor = document.getElementById('autor').value; // Nome do autor
        const dataUpload = dataUploadInput.value; // Data que foi gerada automaticamente

        // --- Verifica se os campos obrigatórios foram preenchidos ---
        if (!arquivo || !nomeArquivo || !extensao || !autor) {
            resultadoDiv.innerHTML = '<p style="color: red;">Por favor, preencha todos os campos obrigatórios.</p>';
            return; // Se faltar algum, interrompe aqui
        }

        // --- Cria um objeto com os metadados do arquivo ---
        const metadados = {
            nome: nomeArquivo,
            extensao: extensao,
            data_criacao: dataCriacao,  // Pode estar vazio se o usuário não preencher
            autor: autor,
            data_upload: dataUpload,
            tamanho_bytes: arquivo.size // Tamanho do arquivo em bytes
        };

        // Apenas para debug no console do navegador
        console.log('Dados do arquivo e metadados prontos para upload:', metadados);
        
        // --- Exibe os metadados na tela (simulação de upload bem-sucedido) ---
        resultadoDiv.innerHTML = `
            <h3>Upload Concluído!</h3>
            <p><strong>Nome do Arquivo:</strong> ${metadados.nome}</p>
            <p><strong>Extensão:</strong> ${metadados.extensao}</p>
            <p><strong>Data de Criação:</strong> ${metadados.data_criacao || 'Não informada'}</p>
            <p><strong>Autor:</strong> ${metadados.autor}</p>
            <p><strong>Data de Upload:</strong> ${metadados.data_upload}</p>
            <p><strong>Tamanho:</strong> ${metadados.tamanho_bytes} bytes</p>
            <p style="color: green; font-weight: bold;">Estes dados seriam enviados para o servidor.</p>
        `;

        // --- Limpa o formulário após o "upload" ---
        form.reset(); // Limpa os campos do formulário
        nomeArquivoInput.value = ''; // Esvazia manualmente o campo de nome
        extensaoInput.value = '';    // Esvazia manualmente o campo de extensão
    });
});
