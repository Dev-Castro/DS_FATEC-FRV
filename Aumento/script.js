function preencheTabela(
    table, 
    header, 
    columns, 
    list, 
    emptyMsg="Não há dados"){

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
                if(j!=columns.length-1){th.style.borderRight = "2px solid black";}
                trh.appendChild(th);
            }
            cont++;
        });
    }

    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    tbody.innerText="";

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
                        td.innerText=list[i][key];  
                        if(j!=columns.length-1){td.style.borderRight = "2px solid black";}
                    }
                });
            }

            table.appendChild(tbody);
        
        }

    }

}

function aumentar(){

    var input = document.getElementById("ctxSalario");
    
    if(input.value!= ""){

        let x;

        if(input.value<=280){
            x = 0.2;
        }else if(input.value<=700){
            x = 0.15;
        }else if(input.value<=1500){
            x = 0.1;
        }else if(input.value>1500){
            x = 0.05;
        }

        let novo = {}

        novo.id = lista.length+1;
        novo.salarioAntes = input.value;
        novo.porcentagemAumento = (x*100)+"%";
        novo.valorAumento = Math.round(input.value*x);
        novo.novoSalario = Math.round(input.value*(x+1));

        lista.push(novo);
    }

    let cabecalho = {
        id: "id",
        salarioAntes: "Salário Antes",
        porcentagemAumento: "% Aumento",
        valorAumento: "Valor Aumento",
        novoSalario: "Novo Salário"
    };

    let ordem = ["id", "salarioAntes", "porcentagemAumento", "valorAumento", "novoSalario"]

    preencheTabela(tabela, cabecalho, ordem, lista)

    input.value = "";
    input.focus();

}

var tabela = document.getElementById("table")
var lista = [];