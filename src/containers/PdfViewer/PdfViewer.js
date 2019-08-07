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
        scale: 1,
        zoomCons: 0.5
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

    zoomIn = zoomIn => {
        this.setState({
            scale: this.state.scale + this.state.zoomCons
        })
    }

    zoomOut = zoomOut => {
        this.setState({
            scale: this.state.scale - this.state.zoomCons
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
                        <button onClick={this.zoomIn}>+</button>
                        <button onClick={this.zoomOut}>-</button>
                    </ul>
                    <div>Page {this.state.pageNumber} out of {this.state.numPages}</div>
                    <Document
                        file={this.state.selectedFile}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={this.state.pageNumber} scale={this.state.scale} onLoadSuccess={() => removeTextLayerOffset()} />
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

function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
    textLayers.forEach(layer => {
        const { style } = layer;
        style.top = "0";
        style.left = "0";
        style.transform = "";
    });
}


export default PdfViewer;