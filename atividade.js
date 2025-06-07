        function obterHTMLSite() {
            return fetch("https://corsproxy.io/?url=https://jsonplaceholder.typicode.com/")
                .then(resp => {
                    if (resp.status !== 200) {
                        throw new Error("Erro ao acessar o site JSONPlaceholder");
                    }
                    return resp.text();
                });
        }

        function mostrarHeader() {
            obterHTMLSite()
                .then(html => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html, "text/html");
                    let header = doc.querySelector("header");
                    let res = document.querySelector("#res");

                    if (header) {
                        res.innerHTML = "header encontrado: <br><br>";
                        res.appendChild(header);
                    } else {
                        res.innerHTML = "elemento não encontrado!";
                    }
                })
                .catch(err => {
                    document.querySelector("#res").innerHTML = "Erro: " + err.message;
                });
        }

        function extrairH1() {
            obterHTMLSite()
                .then(html => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html, "text/html");
                    let h1 = doc.querySelector("h1");
                    let res = document.querySelector("#res");

                    if (h1) {
                        res.innerHTML = "h1 encontrado <br><br>" + h1.outerHTML;
                    } else {
                        res.innerHTML = "elemento não encontrado";
                    }
                })
                .catch(err => {
                    document.querySelector("#res").innerHTML = "Erro: " + err.message;
                });
        }

        document.addEventListener("DOMContentLoaded", function () {
            document.querySelector("#btnHeader").addEventListener("click", mostrarHeader);
            document.querySelector("#btnH1").addEventListener("click", extrairH1);
        });