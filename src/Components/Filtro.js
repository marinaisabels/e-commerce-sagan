import React from 'react'
import styled from 'styled-components'

const FiltroContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 1vh 1vw;
  width: 20vw;
  margin-top: 1vh;

  @media screen and (max-device-width: 1200px) {
    width: 100vw;
  }
`

const DivInputs = styled.div`
  @media screen and (max-device-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`

const TituloFiltro = styled.h2`
  margin-top: 0;
    
  @media screen and (max-device-width: 1200px) {
    margin: 0;
    padding-bottom: 2vh
  }

`
const InputFiltro = styled.input`
  margin-bottom: 1vh;

  @media screen and (max-device-width: 1200px) {
    width: 28vw;
  }
`
class Filtro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valorMinimo: '',
      valorMaximo: '',
      buscaProduto: '',
    }
  }

  mudarInputValorMinimo = (event) => {
    const novoValor = event.target.value
    this.setState({
      valorMinimo: novoValor
    })
    // console.log(this.state.valorMinimo)
    this.props.aoMudarFiltro('valorMin', novoValor)
  }
  mudarInputValorMaximo = (event) => {
    const novoValor = event.target.value
    this.setState({
      valorMaximo: novoValor
    })
    // console.log(this.state.valorMaximo)
    this.props.aoMudarFiltro('valorMax', novoValor)
  }
  mudarInputPesquisa = (event) => {
    const novoValor = event.target.value
    this.setState({
      buscaProduto: novoValor
    })
    // console.log(this.state.buscaProduto)
    this.props.aoMudarFiltro('busca', novoValor)
  }

  render() {

    return (
      <FiltroContainer>

        <TituloFiltro>Filtros:</TituloFiltro>

        <DivInputs>
          <div>
            <label>Valor Mínimo</label>
            <InputFiltro type="number" onChange={this.mudarInputValorMinimo} value={this.state.valorMinimo} />
          </div>
          <div>
            <label>Valor Máximo</label>
            <InputFiltro type="number" onChange={this.mudarInputValorMaximo} value={this.state.valorMaximo} />
          </div>
          <div>
            <label>Buscar Produto</label>
            <InputFiltro type="text" onChange={this.mudarInputPesquisa} value={this.state.buscaProduto} />
          </div>
        </DivInputs>


      </FiltroContainer>
    )
  }
}



export default Filtro;
