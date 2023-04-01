import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';

import styles from './RichEditor.module.scss';

const RichEditor = () => {
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

    return (
        <div className={styles.container}>
            <h3>Про подію</h3>
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
                onEditorChange={(content, editor) => setValue(content)}
            />
            {/* <button onClick={log}>Log editor content</button> */}
            <Button variant='contained' onClick={saveText} className={styles.saveBtn}>Save</Button>
        </div>
    )
};

export default RichEditor;