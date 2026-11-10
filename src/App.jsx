import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import PdfViewer from './containers/PdfViewer/PdfViewer';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <PdfViewer> </PdfViewer>
        </Layout>
      </div>
    );
  }
}

export default App;
