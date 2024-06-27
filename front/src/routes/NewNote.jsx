import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../Components/Sidebar";
import "../style/home.css";

const NewNote = () => {
    const noteSchema = {
        title: "",
        content: [{
            subtitle: "",
            textBody: [{
                text: "",
                checked: false,
            }]
        }],
        ownerId: "",
    };
    
    const [note, setNote] = useState(noteSchema);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const currentUsr = auth?.userId;

    const handleTitleChange = (e) => {
        setNote(prevNote => ({
            ...prevNote,
            title: e.target.value
        }));
    };

    const handleSubtitleChange = (index, e) => {
        const newContent = [...note.content];
        newContent[index].subtitle = e.target.value;
        setNote(prevNote => ({
            ...prevNote,
            content: newContent
        }));
    };

    const handleTextBodyChange = (index, textIndex, e) => {
        const newContent = [...note.content];
        newContent[index].textBody[textIndex].text = e.target.value;
        setNote(prevNote => ({
            ...prevNote,
            content: newContent
        }));
    };

    const handleAddSubtitle = () => {
        setNote(prevNote => ({
            ...prevNote,
            content: [...prevNote.content, { subtitle: "", textBody: [{ text: "", checked: false }] }]
        }));
    };

    const handleAddTextBody = (index) => {
        const newContent = [...note.content];
        newContent[index].textBody.push({ text: "", checked: false });
        setNote(prevNote => ({
            ...prevNote,
            content: newContent
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axiosPrivate.post('/notes', {
                title: note.title,
                ownerId: currentUsr,
                content: note.content
            });
            console.log('Note created', response.data);
            navigate('/notes');
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    return (
        <div id="newNote">
            <Sidebar />
            <div>
                <div>
                    <input
                        type="text"
                        value={note.title}
                        onChange={handleTitleChange}
                        id="title"
                        placeholder="Título"
                    />
                </div>
                <div id="note">
                    {Array.isArray(note.content) && note.content.map((contentItem, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                value={contentItem.subtitle}
                                onChange={(e) => handleSubtitleChange(i, e)}
                                placeholder="Subtítulo"
                            />
                            {Array.isArray(contentItem.textBody) && contentItem.textBody.map((textBodyItem, j) => (
                                <div key={j}>
                                    <textarea
                                        value={textBodyItem.text}
                                        onChange={(e) => handleTextBodyChange(i, j, e)}
                                        placeholder="Texto"
                                    />
                                </div>
                            ))}
                            <button onClick={() => handleAddTextBody(i)}>Agregar Texto</button>
                        </div>
                    ))}
                    <button onClick={handleAddSubtitle}>Agregar Subtítulo</button>
                </div>
                <button onClick={handleSave}>Guardar nota</button>
            </div>
        </div>
    );
}

export default NewNote;
