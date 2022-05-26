class MinimoMaximo {

    constructor(){

        this.lista = [];

        this.min;
        this.max; 

        this.cabecalho = {
            value: "Valor",
            div2: "por 2",
            div3: "por 3"
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
                    if(j!=columns.length-1){th.style.borderRight = "3px solid black";}
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

                            if(typeof(list[i][key])=="boolean"){

                                if(list[i][key]==1){

                                    let img = document.createElement("img");
                                    img.src = "img/check.png";
                                    img.setAttribute("class", "tdimg");
                                    td.appendChild(img);

                                } else{

                                    let img = document.createElement("img");
                                    img.src = "img/close.png";
                                    img.setAttribute("class", "tdimg");
                                    td.appendChild(img);
                                
                                }
                  
                            }else{

 
                                td.innerText=list[i][key];
                                
    
                            }

                            if(highlight!=""){if(columns[j]==highlight){td.style.borderBottom = "3px solid "+highlightColor}}
                            if(j!=columns.length-1){td.style.borderRight = "3px solid black";}
                        }
                    });
                }
    
                table.appendChild(tbody);
            
            }
    
        }
    
    }

    run(){

        this.lista=[]

        this.min = document.getElementById('ctxMin').value;
        this.max = document.getElementById('ctxMax').value;

        if(this.validaOrdem()){

            console.log("Validou\n"+this.min, this.max);
            for(let i = this.min; i<=this.max; i++){


                if(i!=0){

                    let item = {}

                    item.value = i;
                    item.div2 = false;
                    item.div3 = false;

                    if(i%2==0){
                        item.div2 = true;
                    }
                    if(i%3==0){
                        item.div3 = true;
                    }

                    if(item.div2!=false||item.div3!=false){

                        this.lista.push(item);

                    }

                    this.listarTabela();
                }
            }
        }
    }

    listarTabela(){

        let tabela = document.getElementById("tblResult");

        this.preencheTabela(tabela, this.cabecalho, this.ordem, this.lista);


    }

    validaOrdem(){

        let min = this.min;
        let max = this.max;

        let msg="";

        if(min=="" || max==""){

            msg+="- Preencha as caixas de texto.\n";
            alert(msg);
            return false;

        } else if(min!="" & max!=""){

            this.min = parseInt(min);
            this.max = parseInt(max);

            if(this.min==this.max){
                msg+="- Os valores não podem ser iguais.\n";
            }
            if(this.min>this.max){
    
                msg+="- O valor mínimo não pode ser maior que o máximo.\n";

                alert(msg);

                document.getElementById('ctxMin').value = this.max;
                document.getElementById('ctxMax').value = this.min;

                this.max = min;
                this.min = max;
            
                return true;
            }

            if(msg!=""){
                alert(msg)
                return false;
            }

            return true;
        }
    } 
}

var go = new MinimoMaximo;