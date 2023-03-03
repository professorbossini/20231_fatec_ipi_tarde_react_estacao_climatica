import React, { Component } from 'react'

export class EstacaoClimatica extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          {/* .d-flex.align-items-center.border.rounded.mb-2 */}
          <div 
            className="d-flex align-items-center border rounded mb-2"
            style={{height: '6rem'}}>
              <i className={`fas fa-5x ${this.state.icone}`}></i>
              <p className="w-75 ms-3 text-center fs-1">{this.state.estacao}</p>
          </div>
          <div>
            <p className="text-center">
              {/* renderização condicional */}
              {
                this.state.latitude ?
                  `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                :
                this.state.mensagemDeErro ?
                `${this.state.mensagemDeErro}`
                :
                `Clique no botão para saber a sua estação climática`  
              }
            </p>
          </div>
          <button 
            className="btn btn-outline-primary w-100 mt-2"
            onClick={this.obterLocalizacao}>
            Qual a minha estação?
          </button>
        </div>
      </div>
    )
  }
}

export default EstacaoClimatica