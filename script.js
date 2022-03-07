
//Classes
class Produto {
    //atributos da classe
    constructor() {
        this.id = 1; //ID do produto que inicia em 1
        this.arrayProdutos = []; //Vetor que recebe os produtos deve iniciar vazio
        this.editId = null; //Atributo que vai editar o produto pegando o ID do produto
    }

    //métodos ou funções ou funcionalidades
    salvar() {
        let produto = this.lerDados(); //produto que vem do método lerDados()
        if (this.validarCampos(produto)) { //Condição que valida os campos digitados
            if (this.editId == null) { //Condição que adiciona o produto comparando o atributo editId como nulo
                this.adicionar(produto);
            }
            else {
                this.atualizar(this.editId, produto); //Condição que atualiza o produto e coloca o próprio produto como parâmetro
            }
        }//condição verdadeira abreviada
        this.listaTabela(); //mostra os dados inseridos nos campos da tabela
        this.cancelar(); //Limpa os campos que já foram salvos depois de adicionar ou atualizar
    }

    lerDados() {
        let produto = {} //produto
        produto.id = this.id; // id do produto
        //referência do nome do produto no HTML
        produto.nomeProduto = document.getElementById('produto').value;
        //referência do preço do produto no HTML
        produto.preco = document.getElementById('preco').value;
        //retorna nome e preço do produto
        return produto;

    }
    validarCampos(produto) {
        let msg = '' // msg significa mensagem
        if (produto.nomeProduto == '') {
            //Quando o campo mensagem estiver vazio
            msg += 'Informe o nome do produto\n';
        }
        if (produto.preco == '') {
            //Quando o campo mensagem estiver vazio
            msg += 'Informe o preço do produto\n';
        }
        //Quando os campos forem preenchidos
        if (msg != '') {
            alert(msg)
            return false
        }
        //Retorna os dados e valida o que foi preenchido
        return true
    }
    adicionar(produto) { //Produto está como parâmetro
        produto.preco = parseFloat(produto.preco) //Permite inserir valores na tipagem real
        this.arrayProdutos.push(produto); //Permite adicionar o produto na tabela
        this.id++; //Incrementa o valor do ID na tabela
        //alert("Adicionar produto");
    }

    listaTabela() {
        let tbody = document.getElementById('tbody'); //Variável tbody que faz referência ao elemento tboby no HTML
        tbody.innerText = ''; //Valor incia como vazio, pois vai aguardar os novos valores serem adicionados
        
        //Controle para a inserção de cada coluna da tabela no cadastro do ID, nome, valor e as ações de editar e deletar
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow(); //Criação da linha da tabela

            let td_id = tr.insertCell();//Variável da coluna de ID
            let td_produto = tr.insertCell();//Variável da coluna do nome do produto 
            let td_valor = tr.insertCell();//Variável da coluna do valor do produto
            let td_acoes = tr.insertCell();//Variável da coluna das ações de editar e deletar o produto

            td_id.innerText = this.arrayProdutos[i].id; //Referência do ID no vetor de produtos
            td_produto.innerText = this.arrayProdutos[i].nomeProduto; //Referência do nome do produto no vetor de produtos
            td_valor.innerText = this.arrayProdutos[i].preco; //Referência do valor do produto no vetor de produtos

            td_id.classList.add('center'); //Permite centralizar os valores do cada ID na coluna de ID da tabela

            let imgEdit = document.createElement('img'); //Variável de criação do ícone/botão de editar produto
            imgEdit.src = 'editar.png'; //Diretório do arquivo de imagem
            imgEdit.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")"); //Evento do clique do botão do mouse para a edição do produto na tabela e transformação do valor em um objeto

            let imgDelete = document.createElement('img'); //Variável de criação do ícone/botão de deletar produto
            imgDelete.src = 'deletar-lixeira.png'; //Diretório do arquivo de imagem
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")"); //Evento do clique do botão do mouse para a exclusão do produto na tabela

            td_acoes.appendChild(imgEdit); // Ação que permite editar o produto
            td_acoes.appendChild(imgDelete); // Ação que permite deletar o produto

            console.log(this.arrayProdutos); //Exibir o vetor com os produtos já criados no console


        }
    }

    editar(dados) { //Dados são os valores já cadastrados na tabela e que precisam ser editados
        this.editId = dados.id; //Edita o nome do produto e o valor tendo o ID como referência
        document.getElementById('produto').value = dados.nomeProduto;// Edita o nome do produto
        document.getElementById('preco').value = dados.preco;//Edita o preço do produto
        document.getElementById('btn1').innerText = 'Atualizar';//Referência do botão de Atualizar para confirmar a operação
    }

    atualizar(id, produto) { //Tem como parâmetros o ID e o produto já cadastrado

        //Percorre todos os produtos cadastrados
        for (let i = 0; i < this.arrayProdutos.length; i++) {

            //Condição que busca o nome e  valor do produto para atualização/alteração
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }
    cancelar() {
        //alert("Cancelar produto");
        document.getElementById('produto').value = '';// Torna o campo do nome do produto vazio
        document.getElementById('preco').value = '';// Torna o campo do valor do produto vazio
        document.getElementById('btn1').innerText = 'Salvar'; //Altera o nome do botão de Cancelar para Salvar
        this.editId = null;//Edição pelo ID torna-se nula, pois não há edição de valores nulos
    }
    deletar(id) { //Exclui um produto da tabela pegando o ID como parâmetro

        //Alerta emitido pedindo confirmação da exclusão do produto
        if (confirm('Deseja realmente excluir o produto do ID ' + id)) {
            //Variável que faz referência ao corpo da tabela no HTML
            let tbody = document.getElementById('tbody');
            //Percorre os produtos no vetor com o parâmetro ID
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    //Operação que deleta 1(um) produto da tabela
                    this.arrayProdutos.splice(i, 1);
                    //Operação que deleta a linha da tabela no HTML
                    tbody.deleteRow(i);
                }
            }

            console.log(this.arrayProdutos);
        }

    }

}
//Objetos
var produto = new Produto()










