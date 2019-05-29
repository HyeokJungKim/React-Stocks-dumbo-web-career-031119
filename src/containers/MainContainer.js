import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filterTerm: "All",
    sortTerm: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocksResponse => {
      this.setState({
        stocks: stocksResponse
      })
    })
  }

  buyStock = (stockObj) => {
    this.setState((previousState) => {
      return {
        portfolio: [stockObj, ...previousState.portfolio]
      }
    })
    // this.setState({portfolio: [stockObj, ...this.state.portfolio]})
  }

  removeStock = (stockObj) => {
    let index = this.state.portfolio.indexOf(stockObj)
    let copyPortfolio = [...this.state.portfolio]
    copyPortfolio.splice(index, 1)
    this.setState({
      portfolio: copyPortfolio
    })
  }

  setFilterTerm = (term) => {
    this.setState({
      filterTerm: term
    })
  }

  setSortTerm = (term) => {
    this.setState({
      sortTerm: term
    })
  }

  whichStocksToRender = () => {
    let copiedStocks = [...this.state.stocks]
    // Filter the Stocks
    if (this.state.filterTerm === "All") {
      copiedStocks = [...this.state.stocks]
    } else {
      copiedStocks = this.state.stocks.filter(stock => stock.type === this.state.filterTerm)
    }

    // Sort the Stocks
    if (this.state.sortTerm === "Price") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.price - stockB.price
      })
    } else if (this.state.sortTerm === "Alphabetically") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name)
      })
    }

    return copiedStocks
  }

  render() {
    return (
      <div>
        <SearchBar
          setFilterTerm={this.setFilterTerm}
          filterTerm={this.state.filterTerm}
          setSortTerm={this.setSortTerm}
          sortTerm={this.state.sortTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.whichStocksToRender()}
                buyStock={this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                portfolio={this.state.portfolio}
                removeStock={this.removeStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
