function validarNome(nome) {
    const regex = /^[A-Za-zÀ-ÿ\s]{2,80}$/;
    return regex.test(nome.trim()) && nome.trim().length >= 2;
}

function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(senha);
}

function validarTelefone(telefone) {
    const regex = /^\(\+55\)\d{2}-?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(cpf.charAt(i)) * (10 - i);
    let dig1 = 11 - (soma % 11);
    if (dig1 > 9) dig1 = 0;
    if (dig1 !== Number(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(cpf.charAt(i)) * (11 - i);
    let dig2 = 11 - (soma % 11);
    if (dig2 > 9) dig2 = 0;
    return dig2 === Number(cpf.charAt(10));
}

function validarCEP(cep) {
    const regex = /^\d{5}-?\d{3}$/;
    return regex.test(cep);
}

async function buscarEndereco(cep) {
    cep = cep.replace(/\D/g, '');
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) throw new Error('CEP inválido');
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
    } catch (e) {
        alert('CEP não encontrado. Preencha manualmente.');
    }
}


function mostrarModalSucesso() {
    const modal = document.getElementById('modal-success');
    modal.classList.add('active');
    
    
    setTimeout(() => {
        irParaLogin();
    }, 5000);
}

function irParaLogin() {
    const modal = document.getElementById('modal-success');
    modal.classList.remove('active');
    
    
    setTimeout(() => {
        window.location.href = "Login.html";
    }, 300);
}

function fecharModal() {
    const modal = document.getElementById('modal-success');
    modal.classList.remove('active');
}

function processarCadastro() {
    const nome = $("#nome").val();
    const nomeMae = $("#nomeMae").val();
    const email = $("#email").val();
    const senha = $("#senha").val();
    const confirmarSenha = $("#confirmaSenha").val();
    const telefone = $("#telefone").val();
    const telefoneFixo = $("#telefoneFixo").val();
    const cep = $("#cep").val();
    const cpf = $("#cpf").val();
    const endereco = $("#endereco").val();
    const dataNascimento = $("#dataNascimento").val();
    const sexo = $("#sexo").val();
    
    console.log("Dados coletados:", {nome, email, senha});
    

    if (!nome || nome.trim() === "") {
        alert('Por favor, preencha o nome');
        return false;
    }
    if (!validarNome(nome)) {
        alert('Nome deve ter entre 2 e 80 caracteres alfabéticos');
        return false;
    }
    
    if (!nomeMae || nomeMae.trim() === "") {
        alert('Por favor, preencha o nome da mãe');
        return false;
    }
    if (!validarNome(nomeMae)) {
        alert('Nome da mãe deve ter entre 2 e 80 caracteres alfabéticos');
        return false;
    }
    
    if (!email || email.trim() === "") {
        alert('Por favor, preencha o email');
        return false;
    }
    if (!validarEmail(email)) {
        alert('Email inválido');
        return false;
    }
    
    if (!senha || senha.trim() === "") {
        alert('Por favor, preencha a senha');
        return false;
    }
    if (!validarSenha(senha)) {
        alert('Senha deve ter 8-20 caracteres, pelo menos uma letra e um número');
        return false;
    }
    
    if(senha !== confirmarSenha){
        alert('As senhas não coincidem');
        return false;
    }
    
    if (!telefone || telefone.trim() === "") {
        alert('Por favor, preencha o telefone');
        return false;
    }
    if (!validarTelefone(telefone)) {
        alert('Telefone deve seguir o formato (+55)XX-XXXXXXXX');
        return false;
    }
    
    if (telefoneFixo && telefoneFixo.trim() !== "" && !validarTelefone(telefoneFixo)) {
        alert('Telefone fixo deve seguir o formato (+55)XX-XXXXXXXX');
        return false;
    }
    
    if (!cep || cep.trim() === "") {
        alert('Por favor, preencha o CEP');
        return false;
    }
    if (!validarCEP(cep)) {
        alert('CEP deve seguir o formato XXXXX-XXX');
        return false;
    }

    if (!cpf || cpf.trim() === "") {
        alert('Por favor, preencha o CPF');
        return false;
    }
    if (!validarCPF(cpf)) {
        alert('CPF deve seguir o formato XXX.XXX.XXX-XX');
        return false;
    }

    if (!endereco || endereco.trim() === "") {
        alert('Por favor, preencha o endereço');
        return false;
    }
    
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const emailExiste = usuarios.some(u => u.email === email);
    
    if (emailExiste) {
        alert('Email já cadastrado');
        return false;
    }
    
    
    const usuario = {
        nome: nome,
        nomeMae: nomeMae,
        email: email,
        senha: senha,
        telefone: telefone,
        telefoneFixo: telefoneFixo,
        cep: cep,
        cpf: cpf,
        endereco: endereco,
        dataNascimento: dataNascimento,
        sexo: sexo,
        dataCadastro: new Date().toISOString()
    };
    
    console.log("Usuário criado:", usuario);
    
  
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    console.log("Salvou no localStorage:", usuarios);
    
    
    mostrarModalSucesso();
    
    return true;
}


function processarLogin() {
    const emailLogin = $("#email-login").val();
    const senhaLogin = $("#senha-login").val();
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    
    console.log("Tentativa de login:", {emailLogin, senhaLogin});
    console.log("Usuários cadastrados:", usuarios);
    
    $("#mensagem-login").text('');
    
    if (!emailLogin || !senhaLogin) {
        $("#mensagem-login").text('Por favor, preencha todos os campos');
        $("#mensagem-login").css({'color':'red'});
        return false;
    }
    
    if (usuarios.length === 0) {
        $("#mensagem-login").text('Nenhum usuário cadastrado');
        $("#mensagem-login").css({'color':'red'});
        return false;
    }
    
    const usuarioEncontrado = usuarios.find(usuario => 
        usuario.email === emailLogin && usuario.senha === senhaLogin
    );
    
    if (usuarioEncontrado) {
        $("#mensagem-login").text('Login realizado com sucesso!');
        $("#mensagem-login").css({'color':'green'});
        
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        
        console.log("Login bem-sucedido:", usuarioEncontrado);
        
        setTimeout(() => {
            alert("Redirecionando para página inicial...");
        }, 1000);
        window.location.href ="index.html";
        return true;
    } else {
        $("#mensagem-login").text('E-mail ou senha incorretos');
        $("#mensagem-login").css({'color':'red'});
        console.log("Login falhou - credenciais incorretas");
        return false;
    }
}

function verificarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
        console.log("Usuário já logado:", JSON.parse(usuarioLogado));
        return JSON.parse(usuarioLogado);
    }
    return null;
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    console.log("Usuário deslogado");
}

function obterUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function limparDados() {
    localStorage.removeItem("usuarios");
    localStorage.removeItem("usuarioLogado");
    console.log("Dados limpos do localStorage");
}

$(document).ready(function(){
    
    $("#form-cadastro").on("submit", function (event) {
        event.preventDefault();
        console.log("cadastro enviado!");
        processarCadastro();
    });
    
    
    $("#form-login").on("submit", function(event){
        event.preventDefault();
        console.log("login enviado!");
        processarLogin();
    });
    
 
    if (document.getElementById('cep')) {
        document.getElementById('cep').addEventListener('blur', (e) => {
            buscarEndereco(e.target.value);
        });
    }
    
    
    if (document.getElementById('modal-success')) {
        // Fechar modal ao clicar fora dele
        document.getElementById('modal-success').addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharModal();
            }
        });
    }
    
    verificarUsuarioLogado();
    
});