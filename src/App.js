import { useState } from 'react';
import BlogEntry from './components/BlogEntry';

import './App.css';

function App() {
    const [blogEntries, setBlogEntries] = useState(JSON.parse(localStorage.getItem('ld-blog-entries') || '[]'));

    const [selectedBlogEntry, setSelectedBlogEntry] = useState(-1);

    const [formData, setFormData] = useState({});

    const addBlogEntry = () => {
        let blogEntriesCopy = [...blogEntries, {
            title: formData.title,
            text: formData.text
        }];

        setFormData({});
        setBlogEntries(blogEntriesCopy);
        localStorage.setItem('ld-blog-entries', JSON.stringify(blogEntriesCopy));
    }

    const updateField = (field, value) => {
        let formDataCopy = {...formData};
        formDataCopy[field] = value;
        setFormData(formDataCopy);
    }

    const formStyle = {display: "flex", flexDirection: "column", gap: "10px"};

    return (
        <div>     
            <h1>Lame Dimension Work Blog</h1>
            {blogEntries.map((blogEntry, index) => {
                return (
                    <BlogEntry onSelect={() => {setSelectedBlogEntry(index)}} selected={index === selectedBlogEntry} blogEntry={blogEntry} />
                )
            })}
            <div style={formStyle}>
                <label>Title</label>
                <input type="text" value={formData.title} onChange={(evt) => {updateField("title", evt.target.value)}} />
                <label>Text</label>
                <textarea value={formData.text} onChange={(evt) => {updateField("text", evt.target.value)}} />
                <button onClick={addBlogEntry} type="button">Submit</button>
            </div>
        </div>
    );
}

export default App;
