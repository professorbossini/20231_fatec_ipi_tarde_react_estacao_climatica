import 'bootstrap/dist/css/bootstrap.min.css'
// imr
import React from 'react'
// imrd
import ReactDOM from 'react-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
    }
  }
  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //23/06
    const d1 = new Date (anoAtual, 5, 23)
    //24/09
    const d2 = new Date (anoAtual, 8, 24)
    //22/12
    const d3 = new Date (anoAtual, 11, 22)
    //21/03
    const d4 = new Date (anoAtual, 2, 21)
    const sul = latitude < 0
    if (data >= d1 && data < d2)
      return sul ? 'Inverno' : "Verão"
    if (data >= d2 && data < d3)
      return sul ? 'Primavera' : 'Outono'
    if (data >= d3 && data < d4)
      return sul ? 'Verão' : 'Inverno'
    return sul ? 'Outono' : 'Primavera'
    
  }
  icones = {
    'Primavera': 'fa-seedling',
    'Verão': 'fa-umbrella-beach',
    'Outono': 'fa-tree',
    'Inverno': 'fa-snowman'
  }
  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        let data = new Date()
        let estacao = this.obterEstacao(data, posicao.coords.latitude)
        let icone = this.icones[estacao]
        console.log(icone)
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          estacao: estacao,
          data: data.toLocaleTimeString(),
          icone: icone
        })
      },
      (erro) => {
        console.log(erro)
        this.setState({mensagemDeErro: 'Tente novamente mais tarde'})
      }
    ) 
  }
  render(){
    return <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card">
            <div className="card-body">

              <div className="d-flex align-items-center border mb-2" style={{height: '6rem'}}>
                <i className={`fas fa-5x ${this.state.icone}`}></i>
                <p className="w-75 ms-3 text-center fs-1">{this.state.estacao}</p>  
              </div>

              <div>
                <p className="text-center">
                    {/*renderização condicional */}
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
        </div> 
      </div>
      
    </div>
  }
}


// export default function App(){
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position)
//   )
//   return (
//     <div>
//       App
//     </div>
//   )
// }


ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
