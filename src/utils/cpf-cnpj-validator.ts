export function validateCpfCnpj(cpfCnpj: string): boolean {
    // Remove caracteres não numéricos
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
  
    if (cpfCnpj == '') return false;
  
    // Validação básica do comprimento
    if (cpfCnpj.length != 11 && cpfCnpj.length != 14)
      return false;
  
    // CPF
    if (cpfCnpj.length == 11) {
      var sum;
      var rest;
      sum = 0;
      for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(cpfCnpj.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;
  
      if ((rest == 10) || (rest == 11))
        rest = 0;
      if (rest != parseInt(cpfCnpj.substring(9, 10)))
        return false;
  
      sum = 0;
      for (let i = 1; i <= 10; i++)
        sum = sum + parseInt(cpfCnpj.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;
  
      if ((rest == 10) || (rest == 11))
        rest = 0;
      if (rest != parseInt(cpfCnpj.substring(10, 11)))
        return false;
      return true;
    }
  
    // CNPJ
    if (cpfCnpj.length == 14) {
      let tamanho = cpfCnpj.length - 2
      let numeros = cpfCnpj.substring(0, tamanho);
      let digitos = cpfCnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(0)))
        return false;
  
      tamanho = tamanho + 1;
      numeros = cpfCnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(1)))
        return false;
  
      return true;
    }
    return true;
  }