import React from 'react';
import PropTypes from "prop-types";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

const TextEditor = ({ textData, onChangeData }) => {
    const onChangeData2 = e => {
        console.log("text Area", e)
        onChangeData(e)
    }
    return (
        <CKEditor


            editor={ClassicEditor}

            config={{

                removePlugins: ['CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
            }}
            data={textData}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChangeData2(data);
            }}


        />
    )

}

TextEditor.propTypes = {
    textData: PropTypes.string,
    onChangeData: PropTypes.func,
}

export default TextEditor;