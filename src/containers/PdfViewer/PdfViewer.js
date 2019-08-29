import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Checkbox from '../../components/Checkbox'
import SideTray from '../../components/Navigation/SideTray';
import { Highlight, TextHighlight } from '../../components/Highlight';


class PdfViewer extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
        selectedFile: null,
        options: [],
        annotations: [],
        texts: [],
        value: 1,
        scale: 1,
        zoomCons: 0.5,
        checked: false,
        textChecked: false,
        formsChecked: false,
        renderTray: false,
        highlightRect: null,
        details: null,
        trayData: []
    }

    selectAnnotation = ({ annotation }) => {
        this.setState({
            trayData: this.state.trayData.concat(annotation),
            renderTray: true
        })
        console.log(annotation)

    };

    selectText = ({ text }) => {
        this.setState({
            trayData: this.state.trayData.concat(text),
            renderTray: true
        })
        console.log(text)

    };

    renderTrayHandler = () => {
        this.setState({
            renderTray: !this.state.renderTray
        });
    }

    clearTrayData = () => {
        this.setState({
            trayData: []
        })
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
                            onClick={() => this.selectAnnotation({ annotation })}>
                        </Highlight>
                    </div>
                ))}
            </div>
        )
    };

    renderTextHighlight = ({ texts }) => {

        return (
            <div>
                {texts.map(text => (

                    <div>
                        <TextHighlight className="TextHighlight" TextKey={text.id}
                            text={text}
                            onClick={() => this.selectText({ text })}>
                        </TextHighlight>
                    </div>
                ))}
            </div>
        )
    };


    PullAnnotations = (annotations) => {
        this.setState({ annotations: annotations });
        console.log(annotations)
    };

    PullTexts = (texts) => {
        this.setState({ texts: texts });
        console.log(texts)
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
    }

    textCheckboxChange = event => {
        this.setState({
            textChecked: !this.state.textChecked,
        })
    }

    formsCheckboxChange = event => {
        this.setState({
            formsChecked: !this.state.formsChecked,
            checked: false,
        })
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

                        <label>
                            <Checkbox
                                checked={this.state.textChecked}
                                onChange={this.textCheckboxChange}
                            />
                            <span>Text Elements</span>
                        </label>

                        <label>
                            <Checkbox
                                checked={this.state.formChecked}
                                onChange={this.formsCheckboxChange}
                            />
                            <span>Interactive Forms</span>
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
                                renderAnnotationLayer={true}
                                onGetAnnotationsSuccess={this.PullAnnotations}
                                onGetTextSuccess={this.PullTexts}
                                renderInteractiveForms={this.state.formsChecked}

                            >
                                {this.state.checked && this.state.annotations.length > 0 ? (
                                    this.renderHighlight(this.state)
                                ) : (null)}

                                {this.state.textChecked ? (
                                    this.renderTextHighlight(this.state)
                                ) : (null)}

                            </Page>

                        </div>

                    </Document>

                    <div>
                        {this.state.renderTray ? (
                            <SideTray annotationCounter={this.state.annotations.length}
                                textCounter={this.state.texts.length}
                                clearTrayData={this.clearTrayData}
                                trayData={this.state.trayData}
                            >
                            </SideTray>
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