import React from 'react';
import classes from './SideTray.module.css';

const SideTray = (props) => {
    console.log(props.trayData)

    return (
        <header className={classes.SideTray}>
            <ul>
                {props.trayData.map(data => {
                    return (
                        <div>
                            {data.id !== undefined &&
                                <ul>
                                    <p> </p>
                                    <b>Annotation: </b>
                                    <pre>ID: {data.id}</pre>
                                    <pre>Alternative Text: {data.alternativeText}</pre>
                                    <pre>Type: {data.annotationType}</pre>
                                    <pre>Field Name: {data.fieldName}</pre>
                                    <pre>Field Type: {data.fieldType}</pre>
                                    <pre>Field Value: {data.fieldValue}</pre>
                                    <pre>Subtype: {data.subtype}</pre>
                                    <pre>Rect:
                                        {"\n"} 0: {data.rect[0]}
                                        {"\n"} 1: {data.rect[1]}
                                        {"\n"} 2: {data.rect[2]}
                                        {"\n"} 3: {data.rect[3]}
                                    </pre>
                                </ul>
                            }

                            {data.str !== undefined &&
                                <ul>
                                    <p> </p>
                                    <b>Text: </b>
                                    <pre>Text: {data.str}</pre>
                                    <pre>Font Name: {data.fontName}</pre>
                                    <pre>Transform:
                                        {"\n"} 0: {data.transform[0]}
                                        {"\n"} 1: {data.transform[1]}
                                        {"\n"} 2: {data.transform[2]}
                                        {"\n"} 3: {data.transform[3]}
                                        {"\n"} 4: {data.transform[4]}
                                        {"\n"} 5: {data.transform[5]}
                                    </pre>

                                </ul>
                            }
                        </div>
                    )
                })
                }

            </ul>
        </header>

    )

}



export default SideTray;