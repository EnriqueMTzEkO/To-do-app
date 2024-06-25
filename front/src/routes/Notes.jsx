import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../Components/Sidebar";
import "../style/home.css";

const Notes = () => {
    const [note, setNote] = useState({});
    const [cont, setCont] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    let { noteId } = useParams();

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await axiosPrivate.get(`/notes/${noteId}`);
                setNote(response.data);
                setCont(response.data.content);
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

    const handleTextBodyChange = (index, textIndex, e) => {
        const newCont = [...cont];
        newCont[index].textBody[textIndex].text = e.target.value;
        setCont(newCont);
    };

    const handleSave = async () => {
        try {
            const response = await axiosPrivate.put('/notes', {
                _id: noteId,
                ownerId: note.ownerId,
                title: note.title,
                content: cont,
            });
            console.log('Note updated', response.data);
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };

    return (
        <div id="notes">
            <Sidebar />
            <div>
                <div>
                    {note.title && (
                        <input
                            type="text"
                            value={note.title}
                            onChange={handleTitleChange}
                            id="title"
                        />
                    )}
                </div>
                <div id="note">
                    {Array.isArray(cont) && cont.map((contentItem, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                value={contentItem.subtitle}
                                onChange={(e) => handleSubtitleChange(i, e)}
                            />
                            {Array.isArray(contentItem.textBody) && contentItem.textBody.map((textBodyItem, j) => (
                                <div key={j}>
                                    <textarea
                                        value={textBodyItem.text}
                                        onChange={(e) => handleTextBodyChange(i, j, e)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}

export default Notes;
