import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Wrap from '../../hoc/Wrap'

class PdfViewer extends Component {

    state = {
        selectedFile: null
    }

    fileSelected = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {

        if (this.state.selectedFile != null) {
            return (
                <Wrap>
                    <div>Preview PDF</div>
                    <Document
                        file={this.state.selectedFile}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </Wrap>
            )
        } else {
            return (
                <div>
                    <div>Upload PDF</div>
                    <input type="file" name="userfile" onChange={this.fileSelected} />
                </div>
            )
        }
    }



}

export default PdfViewer;