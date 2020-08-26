import React from 'react'
import styled from 'styled-components'
import { LISTADEPRODUTOS } from '../shared/listaDeProdutos'

const HomeContainer = styled.div`
    min-width: 60vw;
    margin: 0 1vw;
`
const DivSuperior = styled.div`
    display:flex;
    justify-content: space-between;
    margin: 1vh 5vw;
`
const SeletorDePreco = styled.select`
    margin: 2vh 0;
`

const DivInferior = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vh 1vw;

  @media screen and (max-device-width: 1200px) {
    /* celulares */
    display: flex;
    flex-wrap:wrap;
  }
`

const GridDeProdutos = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
`

const Produto = styled.div`
    margin: 1vh 1vw;
    padding: 1vh 1vw;
    border: 2px orange dotted;
    width: 10vw;
    display:flex;
    flex-direction: column;
    justify-content: space-between;

  @media screen and (max-device-width: 1200px) {
    width: 25vw;
  }
`

const ImagemProduto = styled.img`
    width: 100%;
`

const DivNomeValor = styled.div`
    padding: 1vh 1vw;
 `

const Paragrafo = styled.p``

const TituloProdutoPequeno = styled.h4``

const TituloProdutoRenderizado = styled.h2``

const BotaoAdicionarCarrinho = styled.button`
    background-color: black;
    color: white;
    bottom: 0;
    padding: 1vh 1vw;
    outline:0;
`

const ProdutoRenderizado = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px black solid;
  margin: 1vh 1vw;
  padding: 1vh 1vw;

  @media screen and (max-device-width: 1200px) {
    width: 90vw;
  }
`

const DivBotaoExcluiRenderizacao = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-bottom: 1vh;
`

const DivDescricao = styled.div`
  margin: 2vh 0;
  padding: 0 1vw;
  background-color: #f0f0f0;
  border-radius: 25px;
`

const ParagrafoDescricao = styled.p`
  text-align: justify;
  padding-bottom: 1vh;
`


const listaDeProdutos = LISTADEPRODUTOS

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordenacao: "crescente",
      listaDeProdutosNoCarrinho: [],
      produtoSelecionado: null
    }
  }

  mudarOrdenacao = (event) => {
    const novaOrdenacao = event.target.value
    this.setState({
      ordenacao: novaOrdenacao
    })
  }

  adicionaProduto = (idProdutoAdicionado) => {
    const novoProduto = listaDeProdutos.find((elemento) => elemento.id === idProdutoAdicionado)
    this.props.aoClicarAdiciona(novoProduto)
  }

  onProdutoSelecionado = (cadaProduto) => {
    this.setState({
      produtoSelecionado: cadaProduto
    })
  }

  onProdutoRenderizadoSelecionado = () => {
    this.setState({
      produtoSelecionado: null
    })
  }

  renderizaProdutoSelecionado(produtoSelecionado) {
    if (produtoSelecionado != null) {
      return (
        <ProdutoRenderizado>
          <DivBotaoExcluiRenderizacao>
            <i class="material-icons" onClick={() => this.onProdutoRenderizadoSelecionado(produtoSelecionado)}>close</i>
          </DivBotaoExcluiRenderizacao>
          <ImagemProduto src={produtoSelecionado.imageUrl} alt={produtoSelecionado.name}/>
          <div>
            <TituloProdutoRenderizado>{produtoSelecionado.name}</TituloProdutoRenderizado>
            <Paragrafo>R${parseFloat(produtoSelecionado.value).toFixed(2)}</Paragrafo>
          </div>
          <BotaoAdicionarCarrinho onClick={() => this.adicionaProduto(produtoSelecionado.id)}>
            Adicionar ao Carrinho
          </BotaoAdicionarCarrinho>
          <DivDescricao>
            <h4>Descrição do produto</h4>
            <ParagrafoDescricao>{produtoSelecionado.descricao}</ParagrafoDescricao>
          </DivDescricao>
        </ProdutoRenderizado>
      )
    } else { // retorno uma div vazia e nada será renderizado na tela
      return (
        <div></div>
      )
    }
  }

  render() {

    let listaOrdenada
    if (this.state.ordenacao === 'crescente') {
      listaOrdenada = listaDeProdutos.sort(function (a, b) {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
      })
    } else if (this.state.ordenacao === 'decrescente') {
      listaOrdenada = listaDeProdutos.sort(function (a, b) {
        return a.value < b.value ? 1 : a.value > b.value ? -1 : 0
      })
    }

    const listaFiltrada = listaOrdenada.filter((elemento) => {
      if (this.props.filtroMinimo && this.props.filtroMaximo && this.props.filtroNome) {
        return (elemento.value >= this.props.filtroMinimo
          && elemento.value <= this.props.filtroMaximo
          && elemento.name.toLowerCase().includes((this.props.filtroNome).toLowerCase()))
      }
      else if (this.props.filtroMinimo && this.props.filtroMaximo) {
        return (elemento.value >= this.props.filtroMinimo
          && elemento.value <= this.props.filtroMaximo)
      }
      else if (this.props.filtroMinimo && this.props.filtroNome) {
        return (elemento.value >= this.props.filtroMinimo
          && elemento.name.toLowerCase().includes((this.props.filtroNome).toLowerCase()))
      }
      else if (this.props.filtroMaximo && this.props.filtroNome) {
        return (elemento.value <= this.props.filtroMaximo
          && elemento.name.toLowerCase().includes((this.props.filtroNome).toLowerCase()))
      }
      else if (this.props.filtroMinimo) {
        return elemento.value >= this.props.filtroMinimo
      }
      else if (this.props.filtroMaximo) {
        return elemento.value <= this.props.filtroMaximo
      }
      else if (this.props.filtroNome) {
        return elemento.name.toLowerCase().includes((this.props.filtroNome).toLowerCase())
      }
    }).map((cadaProduto) => {
      return (
        <Produto key={cadaProduto.id}>
          <ImagemProduto src={cadaProduto.imageUrl} alt={cadaProduto.name} onClick={() => this.onProdutoSelecionado(cadaProduto)} />
          <DivNomeValor>
            <TituloProdutoPequeno>{cadaProduto.name}</TituloProdutoPequeno>
            <Paragrafo>R${parseFloat(cadaProduto.value).toFixed(2)}</Paragrafo>
          </DivNomeValor>
          <BotaoAdicionarCarrinho onClick={() => this.adicionaProduto(cadaProduto.id)}>
            Adicionar ao Carrinho
          </BotaoAdicionarCarrinho>
        </Produto>
      )
    })


    const listaNaoFiltrada = listaOrdenada.map((cadaProduto) => {
      return (
        <Produto key={cadaProduto.id}>
          <ImagemProduto src={cadaProduto.imageUrl} alt={cadaProduto.name} onClick={() => this.onProdutoSelecionado(cadaProduto)}/>
          <DivNomeValor>
            <TituloProdutoPequeno>{cadaProduto.name}</TituloProdutoPequeno>
            <Paragrafo>R${parseFloat(cadaProduto.value).toFixed(2)}</Paragrafo>
          </DivNomeValor>
          <BotaoAdicionarCarrinho onClick={() => this.adicionaProduto(cadaProduto.id)}>
            Adicionar ao Carrinho
          </BotaoAdicionarCarrinho>
        </Produto>
      )
    })

    let listaDeItens
    if (this.props.filtroMinimo || this.props.filtroMaximo || this.props.filtroNome) {
      listaDeItens = listaFiltrada
    } else {
      listaDeItens = listaNaoFiltrada
    }

    return (

      <HomeContainer>
        <DivSuperior>
          <p>Quantidade de produtos: {listaDeItens.length}</p>
          <SeletorDePreco onChange={this.mudarOrdenacao} value={this.state.ordenacao}>
            <option value="crescente">Preço Crescente</option>
            <option value="decrescente">Preço Decrescente</option>
          </SeletorDePreco>
        </DivSuperior>
        <DivInferior>

          <div>
            {this.renderizaProdutoSelecionado(this.state.produtoSelecionado)}
          </div>

          <GridDeProdutos>
            {listaDeItens}
          </GridDeProdutos>

        </DivInferior>
      </HomeContainer>
    );
  }
}


export default Home;
