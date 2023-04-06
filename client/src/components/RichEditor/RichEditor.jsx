import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';
import { Controller } from "react-hook-form";
import { Alert } from '@mui/material';

import styles from './RichEditor.module.scss';

const RichEditor = ({ name, control, defaultValue, formState }) => {
    const editorRef = useRef(null);
    const [value, setValue] = useState('');

    useEffect(() => {
        const savedValue = sessionStorage.getItem('myEditorValue');

        if (savedValue) {
            setValue(savedValue);
        }

    }, []);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const saveText = () => {
        sessionStorage.setItem('myEditorValue', value);
    }

    const validateText = (value) => {
        return value.length > 100 || "Text must contain more than 100 characters";
      };

    return (
        <div className={styles.container}>
            <h3>Про подію</h3>
            {formState.errors.description?.message && <Alert severity="warning">{formState.errors.description.message}</Alert>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required: true,
                    validate: validateText
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Editor
                        apiKey='2ub0ck5jnt7yy0iv95ba9l9iccxu7ebmcakixau13uumk350'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat' +
                        '| h4 |',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px }'
                        }}
                        value={value}
                        onEditorChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            {/* <button onClick={log}>Log editor content</button> */}
            <Button variant='contained' onClick={saveText} className={styles.saveBtn}>Save</Button>
        </div>
    )
};

export default RichEditor;