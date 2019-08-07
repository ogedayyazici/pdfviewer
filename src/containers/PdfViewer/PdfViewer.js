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

    pageSelected = selected => {
        this.setState({
            pageNumber: selected.value
        })
    }

    render() {

        if (this.state.selectedFile != null) {
            return (
                <Wrap>

                    <Dropdown options={this.state.options}
                        onChange={this.pageSelected}
                        placeholder="Select a page" />

                    <div>Page {this.state.pageNumber} out of {this.state.numPages}</div>

                    <Document
                        file={this.state.selectedFile}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={this.state.pageNumber} />
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