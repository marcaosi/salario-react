import React, { useState } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [baseInss, setBaseInss] = useState(0)
  const [descontoInss, setDescontoInss] = useState(0)
  const [descontoIrpf, setDescontoIrpf] = useState(0)
  const [baseIrpf, setBaseIrpf] = useState(0)
  const [salarioLiquido, setSalarioLiquido] = useState(0)
  const [salarioBruto, setSalarioBruto] = useState(0)

  const tabelaINSS_2018 = [
    {
      ate: 1693.72,
      aliquota: 8,
    },
    {
      ate: 2822.9,
      aliquota: 9,
    },
    {
      ate: 5645.8,
      aliquota: 11,
    },
    {
      ate: Number.MAX_SAFE_INTEGER,
      aliquota: 11,
    },
  ]
  
  const tabelaIRPF_2018 = [
    {
      ate: 1903.98,
      aliquota: 0,
      deducao: 0,
    },
    {
      ate: 2826.65,
      aliquota: 7.5,
      deducao: 142.8,
    },
    {
      ate: 3751.05,
      aliquota: 15.0,
      deducao: 354.8,
    },
    {
      ate: 4664.68,
      aliquota: 22.5,
      deducao: 636.13,
    },
    {
      ate: Number.MAX_SAFE_INTEGER,
      aliquota: 27.5,
      deducao: 869.36,
    },
  ]

  const TETO_INSS_2018 = 621.04

  const mudaSalarioBruto = (value) => {
    if(value === ""){
      value = 0
    }else{
      value = parseFloat(value)
    }
    const regexSalario = /^[0-9]{1,}\.{0,}[0-9]{0,2}$/
    console.log(regexSalario.test(value))
    setSalarioBruto(parseFloat(value))
    setBaseInss(value)
    let _descontoInss = 0

    for(let faixa of tabelaINSS_2018){
      if (value <= faixa.ate) {
        _descontoInss = Math.min(value * (faixa.aliquota / 100), TETO_INSS_2018)
        setDescontoInss(_descontoInss)
        break;
      }
    }

    setBaseIrpf(value - _descontoInss)

    let _descontoIRPF = 0

    for (let faixa of tabelaIRPF_2018) {
      if (value <= faixa.ate) {
        _descontoIRPF = value * (faixa.aliquota / 100)
        _descontoIRPF -= faixa.deducao
        setDescontoIrpf(_descontoIRPF)
        break;
      }
    }

    let _salarioLiquido = value
    _salarioLiquido -= _descontoInss
    _salarioLiquido -= _descontoIRPF

    setSalarioLiquido(_salarioLiquido)

  }
  
  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <h1>Cálculo de salário ReactJS</h1>
      </header>
      <main className="row">
        <div className="col-6">
          <p><strong>Cáclculo em tempo real</strong></p>
          <form>
            <div className="form-group">  
              <label>Salário Bruto</label>
              <input type="text" className="form-control" onChange= {(evt) => mudaSalarioBruto(evt.target.value)} value={salarioBruto} />
            </div>
            <div className="form-group">  
              <label>Base INSS</label>
              <input type="text" className="form-control" disabled value={"R$ " + baseInss.toFixed(2)} />
            </div>
            <div className="form-group">  
              <label>Desconto INSS</label>
              <input type="text" className="form-control" disabled value={"R$ " + descontoInss.toFixed(2)} />
            </div>
            <div className="form-group">  
              <label>Base IRPF</label>
              <input type="text" className="form-control" disabled value={"R$ " + baseIrpf.toFixed(2)} />
            </div>
            <div className="form-group">  
              <label>Desconto IRPF</label>
              <input type="text" className="form-control" disabled value={"R$ " + descontoIrpf.toFixed(2)} />
            </div>
            <div className="form-group">  
              <label>Salário Líquido</label>
              <input type="text" className="form-control" disabled value={"R$ " + salarioLiquido.toFixed(2)} />
            </div>
          </form>
        </div>
        <div className="col-6">
          <p><strong>Cálculo reverso com Observables</strong></p>
          <form>
            <div className="form-group">
              <label>Salário líquido desejado</label>
              <input type="number" className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Calcular salário bruto correspondente</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
