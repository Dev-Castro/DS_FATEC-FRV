class Candidato {

    constructor(){

        this.lista = [];
        this.ordem = "";
        this.filtro = "";

        this.header = {
            colocacao : "Colocação",
            nome : "Nome",
            nota : "Nota",
            idade : "Idade",
            status : "Condição"
        }
        this.columns = ["colocacao", "nome", "idade", "nota", "status"];
        this.destaque = "";
        
    }

    filtrar(list){

        let lista = []

        if(this.filtro=="aprovados"){

            for(let i = 0; i<list.length; i++){
                if(list[i].status=="aprovado"){
                    lista.push(list[i]);
                }
            }

            return lista

        } else if(this.filtro=="reprovados"){

            for(let i = 0; i<list.length; i++){
                if(list[i].status=="reprovado"){
                    lista.push(list[i]);
                }
            }

            return lista

        } else {

            return list

        }
    }

    ordenar(list){

        if(this.ordem=="maior"){

            this.columns = ["colocacao", "nota", "nome", "idade", "status"];
            this.destaque = "nota";
            return this.classificacao(list);
            

        }  else if(this.ordem=="menor"){

            this.columns = ["colocacao", "nota", "nome", "idade", "status"];
            this.destaque = "nota";
            return this.classificacao(list).reverse();

        } else if(this.ordem=="velho"){

            this.columns = ["colocacao", "idade", "nome", "nota", "status"];
            this.destaque = "idade";
            return list.sort(
                function(a, b){
                    return (b["idade"] - a["idade"]);
            });

        } else if(this.ordem=="novo"){

            this.columns = ["colocacao", "idade", "nome", "nota", "status"];
            this.destaque = "idade";
            return list.sort(
                function(a, b){
                    return (a["idade"] - b["idade"]);
            });

        } else if(this.ordem=="az"){

            this.columns = ["colocacao", "nome", "idade", "nota", "status"];
            this.destaque = "nome";
            return list.sort((a, b)=>{
	
                return a.nome.localeCompare(b.nome);
            });

        } else if(this.ordem=="za"){

            this.columns = ["colocacao", "nome", "idade", "nota", "status"];
            this.destaque = "nome";
            return list.sort((a, b)=>{
	
                return b.nome.localeCompare(a.nome);
            });

        } else {return list}

    }

    classificacao(list){

        list.sort(
    
            function(obj1, obj2){
    
                var a = (obj2["nota"] -obj1["nota"]);
                return (a !== 0) ? a : (obj1["idade"] -obj2["idade"]);
    
            })

        return list;
    }

    salvar(){

        let candidato = this.lerDados();

        if(this.validaCandidato(candidato)){

            candidato.nota = parseFloat(candidato.nota)
            this.lista.push(candidato);

            let list = this.classificacao(this.lista);
            let colocacao = 1;

            for(let i = 0; i<list.length; i++){
                list[i].colocacao = colocacao + "°";
                colocacao++;
            }

            this.listarTabela(); 

        }

    }

    preencheTabela(table, header, columns, list, highlight="", highlightColor="rgb(0, 195, 195)", emptyMsg="Não há dados"){

        let thead = document.createElement("thead");
        table.innerText = "";

        let trh = document.createElement("tr")
        thead.appendChild(trh);
        
        for(let j = 0; j < columns.length; j++){
            let cont = 0;
            Object.keys(header).forEach(key=>{
                if(key == columns[j]){
                    let th = document.createElement ("th");
                    th.textContent = Object.values(header)[cont];
                    if(highlight!=""){if(columns[j]==highlight){th.style.backgroundColor = highlightColor}}
                    if(j!=columns.length-1){th.style.borderRight = "3px solid white";}
                    trh.appendChild(th);
                }
                cont++;
            });
        }

        table.appendChild(thead);

        let tbody = document.createElement("tbody");

        if(list==""){

            let tr = document.createElement("tr")
            tbody.appendChild(tr);
            let td = tr.insertCell();
            td.innerHTML = emptyMsg
            td.colSpan = columns.length;

            table.appendChild(tbody);
        
        } else {

            for(let i = 0; i<list.length; i++){

                let tr = document.createElement("tr")
                tbody.appendChild(tr);

                for(let j = 0; j < columns.length; j++){

                    Object.keys(list[i]).forEach(key=>{

                        if(key == columns[j]){

                            let td = tr.insertCell(j);
                            td.innerText = list[i][key];
                            if(highlight!=""){if(columns[j]==highlight){td.style.borderBottom = "3px solid "+highlightColor}}
                            if(j!=columns.length-1){td.style.borderRight = "3px solid white";}
                        }
                    });
                }

                table.appendChild(tbody);
            
            }

        }

    }

    listarTabela(){

        let tabela = this.filtrar(this.lista);

        this.ordenar(tabela);

        let table = document.getElementById("tabela");

        this.preencheTabela(table, this.header, this.columns, tabela, this.destaque, "#00e485");

    }

    lerDados(){

        let candidato = {}

        candidato.nome = document.getElementById("ctxNome").value;
        candidato.idade = document.getElementById("ctxIdade").value;
        candidato.nota = document.getElementById("ctxNota").value;

        if(document.getElementById("ctxNota").value>=7.0){
            candidato.status = "aprovado";
        }
        
        if(document.getElementById("ctxNota").value<7.0){
            candidato.status = "reprovado";
        }
        
        return candidato;

    }

    validaCandidato(candidato){

        let msg = ""

        if(candidato.nota>10 || candidato.nota<0){
            msg+= "- A Nota não pode ser maior que 10 ou menor que 0 \n";
            document.getElementById("ctxNota").focus();
        }

        if(candidato.nota=="") {
            msg+= "- Informe a Nota do Candidato \n";
            document.getElementById("ctxNota").focus();
        }

        if(candidato.idade=="") {
            msg+= "- Informe a Idade do Candidato \n";
            document.getElementById("ctxIdade").focus();
        }

        if(candidato.nome=="") {
            msg+= "- Informe o Nome do Candidato \n";
            document.getElementById("ctxNome").focus();
        }

        if(msg!=""){
            alert(msg);
            return false;
        }

        document.getElementById("ctxNome").focus();

        document.getElementById("ctxNome").value = "";
        document.getElementById("ctxIdade").value = "";
        document.getElementById("ctxNota").value = "";

        return true;

    }

    

}

var candidato = new Candidato();

function EnterTab(InputId,Evento){

    if(Evento.keyCode == 13){   
        
        document.getElementById(InputId).focus();
        if(InputId=="ctxNome"){candidato.salvar()}

    }

}