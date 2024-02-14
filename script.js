var results = JSON.parse(localStorage.getItem('results')) || [];

document.getElementById('taxForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        var inputs = Array.prototype.slice.call(this.getElementsByTagName('input'));
        var submitButton = document.getElementById('submitButton'); // Obtenha o botão de envio
        inputs.push(submitButton); // Adicione o botão de envio à lista de inputs
        var index = inputs.indexOf(document.activeElement);
        if (index === -1) {
            inputs[0].focus();
        } else if (index + 1 < inputs.length) {
            inputs[index + 1].focus();
        } else {
            var netPrice = parseFloat(document.getElementById('netPrice').value);
            var ipiPercent = parseFloat(document.getElementById('ipi').value);
            var ipiValue =  ipiPercent/ 100;
            var totalTax = parseFloat(document.getElementById('totalTax').value);

            //operaçoes
            var netPriceTimesIpiValue = netPrice * ipiValue;
            var netPricePlusNetPriceTimesIpiValue = netPrice + netPriceTimesIpiValue;
            var totalTaxMinusNetPriceTimesIpiValue = totalTax - netPricePlusNetPriceTimesIpiValue;   
            var netPricePlusTotalTaxMinusNetPriceTimesIpiValue = netPrice + totalTaxMinusNetPriceTimesIpiValue;

            document.getElementById('result').textContent = 'A soma dos valores é: ' + netPricePlusTotalTaxMinusNetPriceTimesIpiValue.toFixed(3);

            // Adicione o novo resultado ao início do array results
            results.unshift(netPricePlusTotalTaxMinusNetPriceTimesIpiValue.toFixed(3));

            // Se o array tiver mais de 10 itens, remova o último item
            if (results.length > 10) {
                results.pop();
            }

            // Atualize a div lastResults com os últimos 10 resultados
            updateResults();

            // Limpe os campos de entrada
            document.getElementById('netPrice').value = '';
            document.getElementById('ipi').value = '';
            document.getElementById('totalTax').value = '';
        }
    }
});

document.getElementById('copyButton').addEventListener('click', function() {
    var range = document.createRange();
    range.selectNode(document.getElementById('result'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    this.textContent = 'Copiado';
});

// Adicione um ouvinte de eventos para o botão 'removeAll'
document.getElementById('removeAll').addEventListener('click', function() {
    // Limpe o array results
    results = [];

    // Atualize a div lastResults para refletir a remoção de todos os resultados
    updateResults();

    // Atualize o localStorage
    localStorage.setItem('results', JSON.stringify(results));
});

function updateResults() {
    var lastResultsDiv = document.getElementById('lastResults');
    lastResultsDiv.innerHTML = 'Últimos 10 resultados:<br><ol>' + results.map(function(result, index) {
        return '<li>' + result + ' <button id="copyButton' + index + '">Copiar</button> <button id="removeButton' + index + '">Remover</button></li>';
    }).join('') + '</ol>';

    // Adicione um evento de clique a cada botão de cópia
    results.forEach(function(result, index) {
        document.getElementById('copyButton' + index).addEventListener('click', function() {
            var dummy = document.createElement('textarea');
            document.body.appendChild(dummy);
            dummy.value = result;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            this.textContent = 'Copiado';
        });

        // Adicione um evento de clique a cada botão de remoção
        document.getElementById('removeButton' + index).addEventListener('click', function() {
            results.splice(index, 1); // Remove o resultado do array
            updateResults(); // Atualize a lista de resultados
        });
    });

    // Salve os resultados no localStorage
    localStorage.setItem('results', JSON.stringify(results));
}

// Atualize os resultados quando a página for carregada
updateResults();