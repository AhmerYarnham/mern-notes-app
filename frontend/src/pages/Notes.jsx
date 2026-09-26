import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes', {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    } catch (err) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, { title, content }, {
          headers: { Authorization: token },
        });
        setEditingId(null);
      } else {
        await api.post('/notes', { title, content }, {
          headers: { Authorization: token },
        });
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: token },
      });
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Notes</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl mb-6 space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        <div className="space-y-3">
          {notes.length === 0 && (
            <p className="text-gray-500 text-center">No notes yet.</p>
          )}
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-start"
            >
              <div>
                <h3 className="text-white font-semibold">{note.title}</h3>
                <p className="text-gray-400 text-sm">{note.content}</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;