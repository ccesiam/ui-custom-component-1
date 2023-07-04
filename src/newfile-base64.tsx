import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Resizer from 'react-image-file-resizer';
import './css/file-base64.css';
import './declarationsnew.d.ts';
import { IComponentProps, IManywho } from './interfaces';
import { isNullOrEmpty } from './interfaces/services/utils';
import { component } from './utils/wrapper';

declare const manywho: IManywho;
let header = '';
let flag = true;

const newfileBase64 =  (props: IComponentProps) => {
    const [file, setFile] = React.useState('');
    const [preview = null, setFilePreview] = React.useState('');
    const [type, setFileType] = React.useState('');
    const fileNameComponentID = props.getAttribute('file_name_hidden_id') as string;
    const fileTypeHiddenId = props.getAttribute('file_type_hidden_id') as string;

    const onDrop = React.useCallback((files) => {
        setFile(files[0].name);
        setFileType(files[0].type);
        setFilePreview(URL.createObjectURL(files[0]));
        const stateFileName = manywho.state.getComponent(fileNameComponentID, props.flowKey);
        stateFileName.contentValue = files[0].name;
        const stateFileType = manywho.state.getComponent(fileTypeHiddenId, props.flowKey);
        stateFileType.contentValue = files[0].type;

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        const reader1 = new FileReader();
        reader1.readAsArrayBuffer (files[0]);

        if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png' || files[0].type === 'image/bmp') {
            Resizer.imageFileResizer(
                files[0],
                 1024,
                 1024,
                'JPEG',
                100,
                0,
                (uri: any) => {
                    props.onChange(uri as string, true, false);
                },
                'base64,',
            );
        } else {

            reader1.onload = (e) => {

                if (reader1.readyState !== FileReader.DONE) {
                    return;
                }

                header = '';
                flag = true;

                const arr = (new Uint8Array(reader1.result as ArrayBuffer)).subarray(0, 4);
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                 }

                header === '25504446' ? reader.onload = () => props.onChange(reader.result as string, true, false) :  flag = false;

            };
        }
    }, []);

    const { getRootProps, getInputProps, rejectedFiles, acceptedFiles } = useDropzone({ onDrop,
                                                                                        minSize: 0,
                                                                                        maxSize: 10485760,

    });

    const maxSize = 10485760;

    const label = <label>{props.model.label}{props.model.isRequired ? <span className="input-required"> *</span> : null}</label>;
    const hint = manywho.utils.isNullOrEmpty(props.model.hintValue) ? manywho.settings.global('localization.fileUploadMessage', props.flowKey) : props.model.hintValue;
    const isFileTooLarge = flag && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <div className={props.className.join(' ')}>
            {label}
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {!manywho.utils.isNullOrEmpty(file) ? <p><strong>{file}</strong></p> : null}
                <p>{hint}</p>

                {isFileTooLarge && (
                <div className="text-danger mt-2">
                  Invalid file or file is too large.
                </div>
                )}

                <div>
                    header : {header}
                </div>

                { flag === false && (
                    <div className="text-danger mt-2">
                        invalid PDF
                    </div>
                )}

                {/*file.length > 0 && !manywho.utils.isNullOrEmpty(acceptedFiles[0].name) ? (acceptedFiles[0].size / 1048576).toFixed(2) : 0*/

                    (flag && file.length > 0) && !manywho.utils.isNullOrEmpty(acceptedFiles[0].name) ? (acceptedFiles[0].size / 1048576).toFixed(2) : 0
                } MB
                {/* <p>{type}</p> */}
                {/* {!manywho.utils.isNullOrEmpty(file) ? <img width="100px" height="100px" src={preview} /> : null} */}
            </div>
            <span className="help-block">{props.model.validationMessage || props.state.validationMessage}</span>
            <span className="help-block">{props.model.helpInfo}</span>
        </div>
    );

};

manywho.component.register('newfile-base64', component(newfileBase64));

export default newfileBase64;
