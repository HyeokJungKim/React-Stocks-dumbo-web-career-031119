import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.portfolio.map((stockObject, index) => {
              return <Stock
                stock={stockObject}
                key={`${stockObject.name} - ${index}`}
                handleClick={this.props.removeStock}
              />
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
