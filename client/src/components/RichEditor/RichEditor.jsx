import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";
import { Alert } from '@mui/material';

import styles from './RichEditor.module.scss';
import { useTranslation } from 'react-i18next';

const RichEditor = ({ name, control, defaultValue, formState, description }) => {
    const editorRef = useRef(null);
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        const savedValue = sessionStorage.getItem('myEditorValue');
        if (savedValue) {
            setValue(savedValue);
        }

    }, []);

    useEffect(() => {
        if (description) {
            console.log(editorRef.current.setContent(description));
        }
    }, [editorRef.current]);

    const validateText = (value) => {
        return value.length > 100 || "Text must contain more than 100 characters";
    };

    return (
        <div className={styles.container}>
            <h3>{t('createEvent.eventDetails.aboutEvent')}</h3>
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
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px }',
                            init_instance_callback: (editor) => {
                                setEditor(editor);
                            }
                        }}
                        value={value}
                        onEditorChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
        </div>
    )
};

export default RichEditor;