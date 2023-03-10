import 'bootstrap/dist/css/bootstrap.min.css'
// imr
import React from 'react'
// imrd
import ReactDOM from 'react-dom'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

class App extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null
  //   }
  //   console.log('construtor')
  // }

  //inicializar o estado sem usar o construtor
  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
  }

  componentDidMount(){
    this.obterLocalizacao()
  }

  componentDidUpdate(){
    console.log("componentDidUpdate")
  }

  componentWillUnmount(){
    console.log("componentWillUnmount")
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
    if (data >= d4 && data < d1)
      return sul ? 'Outono' : 'Primavera'
    return sul ? 'Verão' : 'Inverno'
    
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
    console.log('render')
    return <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {
            !this.state.latitude && !this.state.mensagemDeErro ?
              <Loading 
                mensagem="Por favor, responda à solicitação de localização"/>
            :
            this.state.mensagemDeErro ?
              // p.border.rounded.p-2.fs-1.text-center{É preciso dar permissão para acesso à localização. Atualize a página e tente de novo, ajustando a configuração do seu navegador.}
              <p className="border rounded p-2 fs-1 text-center">É preciso dar permissão para acesso à localização. Atualize a página e tente de novo, ajustando a configuração do seu navegador.</p>
            :
            <EstacaoClimatica 
              icone={this.state.icone}
              estacao={this.state.estacao}
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              // data={this.state.data}
              mensagemDeErro={this.state.mensagemDeErro}
              obterLocalizacao={this.obterLocalizacao}
            />
          }
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
