import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Checkbox from '../../components/Checkbox'
import SideTray from '../../components/Navigation/SideTray';
import Highlight from '../../components/Highlight';



class PdfViewer extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
        selectedFile: null,
        options: [],
        annotations: [],
        value: 1,
        scale: 1,
        zoomCons: 0.5,
        checked: false,
        renderTray: false,
        highlightRect: null,
        details: null,
        selectedHighlight: null
    }

    selectHighlight = ({ annotation }) => {

        this.setState({
            selectedHighlight: annotation,
            renderTray: true
        });
        console.log(annotation)

    };

    renderTrayHandler = () => {
        this.setState({
            renderTray: !this.state.renderTray
        });
    }


    handleHighlightRect = ({ annotation }) => {

        this.setState({
            highlightRect: annotation.rect[0]
        });


    };

    renderHighlight = ({ annotations }) => {



        return (
            <div>
                {annotations.map(annotation => (

                    <div>
                        <Highlight className="Highlight" key={annotation.id}
                            annotation={annotation}
                            onClick={() => this.selectHighlight({ annotation })}>

                        </Highlight>
                    </div>
                ))}
            </div>
        )


    };


    PullAnnotations = (annotations) => {
        this.setState({ annotations: annotations });
        console.log(annotations)
    };


    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });

        for (let i = 1; i <= numPages; i++) {
            this.state.options.push(i)
        }

    }

    handleCheckboxChange = event => {
        this.setState({
            checked: !this.state.checked,
        })
        console.log("Checked change");
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
                <div>
                    <div>
                        <div style={{ width: '60%' }}>
                            <Dropdown options={this.state.options}
                                onChange={this.pageSelected}
                                placeholder="Select a page" />
                        </div>
                        <button onClick={this.removePDF}>Remove PDF</button>

                        <label>
                            <button onClick={this.zoomIn}>+</button>
                            <span>Zoom</span>
                            <button onClick={this.zoomOut}>-</button>
                        </label>

                        <label>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleCheckboxChange}
                            />
                            <span>Fillable Elements</span>
                        </label>

                    </div>
                    <div>Page {this.state.pageNumber} out of {this.state.numPages}</div>
                    <Document
                        file={this.state.selectedFile}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <div>
                            <Page pageNumber={this.state.pageNumber} scale={this.state.scale}
                                onLoadSuccess={() => removeTextLayerOffset()}
                                renderAnnotationLayer={this.state.checked}
                                onGetAnnotationsSuccess={this.PullAnnotations}
                                renderInteractiveForms={false}

                            >
                                {this.state.checked && this.state.annotations.length > 0 ? (
                                    this.renderHighlight(this.state)
                                ) : (null)}

                            </Page>



                        </div>

                    </Document>

                    <div>
                        {this.state.renderTray ? (
                            <SideTray Counter={this.state.annotations.length} renderTrayHandler={this.renderTrayHandler} annotation={this.state.selectedHighlight}> </SideTray>
                        ) : (
                                null
                            )}
                    </div>


                </div>
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
    //return
    textLayers.forEach(layer => {
        const { style } = layer;
        style.top = "0";
        style.left = "0";
        style.transform = "";
    });
}





export default PdfViewer;