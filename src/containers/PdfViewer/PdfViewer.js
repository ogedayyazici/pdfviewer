import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Wrap from '../../hoc/Wrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class PdfViewer extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
        selectedFile: null,
        options: [],
        value: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });

        for (let i = 1; i <= numPages; i++) {
            this.state.options.push(i)
        }

    }

    fileSelected = event => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    removePDF = remove => {
        this.setState({
            selectedFile: remove.null,
            options: [],
            pageNumber: 1
        })
    }

    pageSelected = selected => {
        this.setState({
            pageNumber: selected.value
        })
    }

    render() {

        if (this.state.selectedFile != null) {
            return (
                <Wrap>
                    <ul>
                        <Dropdown options={this.state.options}
                            onChange={this.pageSelected}
                            placeholder="Select a page" />
                        <button onClick={this.removePDF}>Remove PDF</button>

                        <div>Page {this.state.pageNumber} out of {this.state.numPages}</div>
                    </ul>
                    <Document
                        file={this.state.selectedFile}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={this.state.pageNumber} scale={1} />
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