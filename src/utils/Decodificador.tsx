import { Editor } from "@tinymce/tinymce-react";

class TinyMCEEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content: '',
      };
    }
  
    handleEditorChange = (content, editor) => {
      this.setState({ content });
    };
  
    render() {
      return (
        <div>
          <Editor
            apiKey="s5imujsdbn5t6mfpg48gdbi7ze3nvqtowq6jx832mxixauvn"
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
            onEditorChange={this.handleEditorChange}
          />
          <div>
            <h2>Contenido Renderizado:</h2>
            {parse(this.state.content)}
          </div>
        </div>
      );
    }
  }
  
  export default TinyMCEEditor;
  