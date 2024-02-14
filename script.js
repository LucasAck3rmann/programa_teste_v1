var results = [];

document.getElementById('taxForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        var inputs = Array.prototype.slice.call(this.getElementsByTagName('input'));
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
            results.unshift(extraEnd);

            // Se o array tiver mais de 10 itens, remova o último item
            if (results.length > 10) {
                results.pop();
            }

            // Atualize a div lastResults com os últimos 10 resultados
            var lastResultsDiv = document.getElementById('lastResults');
            lastResultsDiv.innerHTML = 'Últimos 10 resultados:<br><ol>' + results.map(function(result) {
                return '<li>' + result + '</li>';
            }).join('') + '</ol>';
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