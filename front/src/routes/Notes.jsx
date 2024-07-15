import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../Components/Sidebar";
import "../style/home.css";

const Notes = () => {
    const [note, setNote] = useState({});
    const [cont, setCont] = useState([]);
    const [shareW, setShareW] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    let { noteId } = useParams();

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await axiosPrivate.get(`/notes/${noteId}`);
                setNote(response.data);
                setCont(response.data.content || []);
                setShareW(response.data.sharedWith && response.data.sharedWith.length > 0 ? response.data.sharedWith : []);
            } catch (err) {
                console.error('Error during refresh:', err);
                navigate('/notes', { state: { from: location }, replace: true });
            }
        };
        
        getNote();
    }, [noteId, axiosPrivate, navigate, location]);

    const handleTitleChange = (e) => {
        setNote(prevNote => ({
            ...prevNote,
            title: e.target.value
        }));
    };

    const handleSubtitleChange = (index, e) => {
        const newCont = [...cont];
        newCont[index].subtitle = e.target.value;
        setCont(newCont);
    };

    const handleSubtitleKeyDown = (index, e) => {
        if (e.key === "Enter" && e.altKey) {
            const newCont = [...cont];
            newCont.splice(index + 1, 0, { subtitle: "", textBody: [{ text: "", checked: false }] });
            setCont(newCont);
            e.preventDefault();
        }
    };

    const handleTextBodyChange = (index, textIndex, e) => {
        const newCont = [...cont];
        newCont[index].textBody[textIndex].text = e.target.value;
        setCont(newCont);
    };

    const handleTextBodyKeyDown = (index, textIndex, e) => {
        if (e.key === "Enter" && e.altKey) {
            const newCont = [...cont];
            newCont[index].textBody.splice(textIndex + 1, 0, { text: "", checked: false });
            setCont(newCont);
            e.preventDefault();
        }
    };

    const handleCheckChange = (index, textIndex, e) => {
        const newCont = [...cont];
        newCont[index].textBody[textIndex].checked = e.target.checked;
        setCont(newCont);
    };

    const handleShareWithChange = (index, e, field) => {
        const newShareW = [...shareW];
        newShareW[index][field] = e.target.value;
        setShareW(newShareW);
    };

    const addShareWithField = () => {
        setShareW([...shareW, { userId: '', permissions: 'read' }]);
    };

    const handleSave = async () => {
        try {
            const filteredShareW = shareW.filter(item => item.userId.trim() !== '');
            const response = await axiosPrivate.put('/notes', {
                _id: noteId,
                ownerId: note.ownerId,
                title: note.title,
                content: cont,
                sharedWith: filteredShareW.length > 0 ? filteredShareW : []
            });
            console.log('Note updated', response.data);
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };

    return (
        <div id="notes">
            <Sidebar />
            <div id="note_container">
                <div id="note_note_area">
                <div id="note_title">
                    {note.title && (
                        <input
                            type="text"
                            value={note.title}
                            onChange={handleTitleChange}
                            id="title"
                        />
                    )}
                </div>
                <div id="note_body">
                    {Array.isArray(cont) && cont.map((contentItem, i) => (
                        <div className="note_subtitle" key={i}>
                            <textarea
                                value={contentItem.subtitle}
                                onChange={(e) => handleSubtitleChange(i, e)}
                                onKeyDown={(e) => handleSubtitleKeyDown(i, e)}
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
                                            /*la idea es que tenga 2 estilos,
                                            uno para cuadno sea checekd false que se vea normal y otro que cuando se marque sea true y se opaque el texto o se le ponga un alinea en medio */
                                            onChange={(e) => handleCheckChange(i, j, e)}
                                        />
                                    </label>
                                    <textarea
                                        className="note_textarea_txt"
                                        value={textBodyItem.text}
                                        onChange={(e) => handleTextBodyChange(i, j, e)}
                                        onKeyDown={(e) => handleTextBodyKeyDown(i, j, e)}
                                        placeholder="(Alt + Enter para un nuevo texto)"
                                    />
                                    <br />
                                </div>
                            ))}
                        </div>
                    ))}
                    {shareW.map((sharedWithItem, k) => (
                        <div key={k}>
                            <input
                                type="text"
                                value={sharedWithItem.userId}
                                onChange={(e) => handleShareWithChange(k, e, 'userId')}
                            />
                            <select
                                value={sharedWithItem.permissions}
                                onChange={(e) => handleShareWithChange(k, e, 'permissions')}
                            >
                                <option value="read">Leer</option>
                                <option value="write">Editar</option>
                            </select>
                        </div>
                    ))}
                    <button onClick={addShareWithField}>Agregar colaborador</button>
                </div>
                <button onClick={handleSave}>Guardar nota</button>
                </div>
            </div>
        </div>
    );
}

export default Notes;
