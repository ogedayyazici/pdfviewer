import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Checkbox from '../../components/Checkbox'
import SideTray from '../../components/Navigation/SideTray';
import { Grid, VertGrid } from '../../components/Grid';
import { Highlight, TextHighlight } from '../../components/Highlight';
import classes from './PdfViewer.module.css'


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
        zoomCons: 0.2,
        checked: false,
        textChecked: false,
        formsChecked: false,
        gridChecked: false,
        renderTray: false,
        highlightRect: null,
        details: null,
        trayData: [],
        start: 10,
        gridSpace: 0,
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
            trayData: [],
            renderTray: false
        })
    }


    handleHighlightRect = ({ annotation }) => {

        this.setState({
            highlightRect: annotation.rect[0]
        });


    };

    increaseSpace = () => {
        this.setState({
            gridSpace: this.state.gridSpace + 10
        })
    }

    decreaseSpace = () => {
        this.setState({
            gridSpace: this.state.gridSpace - 10
        })
    }

    renderGrid = (input) => {
        let i = input;
        if (i <= 859) {
            return (
                <div>
                    <Grid className="Grid" top={i}>
                    </Grid>
                    {this.renderGrid(i + 50 + this.state.gridSpace)}
                </div>
            )
        }
    }

    renderVertGrid = (input) => {
        let i = input;
        if (i <= 613) {
            return (
                <div>
                    <VertGrid className="VertGrid" left={i}>
                    </VertGrid>
                    {this.renderVertGrid(i + 70 + this.state.gridSpace)}
                </div>
            )
        }
    }


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

    gridCheckboxChange = event => {
        this.setState({
            gridChecked: !this.state.gridChecked
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
                        <div className={classes.Toolbar}>
                            <Dropdown options={this.state.options}
                                onChange={this.pageSelected}
                                placeholder="Select a page"
                            />
                            <div>Page {this.state.pageNumber} out of {this.state.numPages}</div>

                            <label>
                                <button className={classes.buttonSmall} onClick={this.zoomIn}>+</button>
                                <span> Zoom </span>
                                <button className={classes.buttonSmall} onClick={this.zoomOut}>-</button>
                            </label>
                            <button onClick={this.removePDF}>Remove PDF</button>
                        </div>
                    </div>
                    <div className={classes.Toolbar2}>
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

                        <label>
                            <Checkbox
                                checked={this.state.gridChecked}
                                onChange={this.gridCheckboxChange}
                            />
                            <span>Grid Lines</span>
                        </label>

                        {this.state.gridChecked ? (
                            <label>
                                <button onClick={this.increaseSpace}>+</button>
                                <span>Grid Space</span>
                                <button onClick={this.decreaseSpace}>-</button>
                            </label>
                        ) : (null)}
                    </div>


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

                                {this.state.gridChecked ? (
                                    this.renderGrid(this.state.start)
                                ) : (null)}

                                {this.state.gridChecked ? (
                                    this.renderVertGrid(this.state.start)
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

                </div >
            )
        } else {
            return (
                <div>
                    <h4>Upload PDF</h4>
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