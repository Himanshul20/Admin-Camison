

import React from 'react'
import TextEditor from './TextEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Editor({ edit, DESCRIPTION, setdescription }) {



    return (
        <div>
            {!edit && (<CKEditor
                disabled={true}
                editor={ClassicEditor}
                config={{
                    toolbar: [],
                    removePlugins: ['CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
                    readOnly: true,

                }}
                data={DESCRIPTION}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();

                }}
            />)}
            {edit && (<TextEditor textData={DESCRIPTION} value={DESCRIPTION} onChangeData={(s) => { setdescription(s) }}></TextEditor>)}
        </div>
    )
}

