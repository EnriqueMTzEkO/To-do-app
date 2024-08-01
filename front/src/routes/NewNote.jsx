import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../Components/Sidebar";

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
        <div id="notes">
    <Sidebar />
    <div id="note_container">
        <div id="note_note_area">
            <div id="note_title">
                <input
                    type="text"
                    value={note.title}
                    onChange={handleTitleChange}
                    id="title"
                    placeholder="Título"
                />
            </div>
            <div id="note_body">
                {Array.isArray(note.content) && note.content.map((contentItem, i) => (
                    <div className="note_subtitle" key={i}>
                        <textarea
                            value={contentItem.subtitle}
                            onChange={(e) => handleSubtitleChange(i, e)}
                            placeholder="(Alt + Enter nuevo subtitulo)"
                            className="note_subtitle_text"
                        />
                        {Array.isArray(contentItem.textBody) && contentItem.textBody.map((textBodyItem, j) => (
                            <div className="note_text_note" key={j}>
                                <label className="note_checkbox_label">
                                    <input
                                        className="note_checkbox_input"
                                        type="checkbox"
                                        checked={textBodyItem.checked}
                                        onChange={(e) => handleCheckChange(i, j, e)}
                                    />
                                </label>
                                <textarea
                                    className="note_textarea_txt"
                                    value={textBodyItem.text}
                                    onChange={(e) => handleTextBodyChange(i, j, e)}
                                    placeholder="(Alt + Enter para un nuevo texto)"
                                />
                                <br />
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
</div>

    );
}

export default NewNote;
