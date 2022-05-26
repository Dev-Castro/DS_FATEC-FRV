class MinimoMaximo {

    constructor(){

        this.lista = [];

        this.min;
        this.max; 

        this.cabecalho = {
            value: "Valor",
            div2: "2",
            div3: "3"
        };
        
        this.ordem = ["value", "div2", "div3"];

    }

    preencheTabela(
        table, 
        header, 
        columns, 
        list, 
        highlight="", 
        highlightColor="rgb(0, 195, 195)", 
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

    run(){

        var tabela = document.getElementById("tblResult");

        this.min = document.getElementById('ctxMin').value;
        this.max = document.getElementById('ctxMax').value;

        this.validaOrdem();

        console.log(this.min);
        console.log(this.max);

        // preencheTabela(tabela, cabecalho, ordem, lista)

    }

    validaOrdem(){

        let min = this.min;
        let max = this.max;

        let msg="";

        if(min==max){
            msg+="- Os valores não podem ser iguais."
        }
        if(min>max){

            this.min = max;
            this.max = min;

            document.getElementById('ctxMin').value = max;
            document.getElementById('ctxMax').value = min;

        }

    }
    

}

var go = new MinimoMaximo;