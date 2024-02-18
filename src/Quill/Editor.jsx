import { useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import "katex/dist/katex.min.css";
import CustomToolbar from './CustomToolbar'
window.katex = katex;
 
// Quill.register('modules/ImageResize',ImageResize);
const Editor=({initialValue,onChange})=> {
    const [text,setText] = useState('');
    
    useEffect(()=>{
       setText(initialValue)
    },[initialValue])
    const handleChange= (html)=> {
        setText(html);
        onChange(html)
    }
    const modules = {
        toolbar: {
            container: "#toolbar",
        }
    }
    const formats = [
      'font','size',
      'bold','italic','underline','strike',
      'color','background',
      'script',
      'header','blockquote','code-block',
      'indent','list',
      'direction','align',
      'link','image','video','formula',
    ]
    
    return (
      <div className='mt-10'>
        <CustomToolbar />
        <ReactQuill
          value={text}
          className={'w-full h-[450px]'}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    )
}
 


export default Editor;