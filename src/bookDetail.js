import React from 'react';
import { withRouter } from 'react-router-dom';

class BookDetail extends React.Component {
  render() {
    return (
      <div className="row">
        <main className="col-md-8" role="main">
          {this.props.match.params.id}
          <p>Book detail stub</p>
        </main>
        <aside className="col-md-4">
          
        </aside>
      </div>
    );
  }
};

export default withRouter(BookDetail);




