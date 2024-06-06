import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [videosData, setVideosData] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', views: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const getVideosData = () => {
    axios.get('http://localhost:3000/posts')
      .then(res => {
        console.log(res);
        setVideosData(res.data);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addVideo = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/posts', newVideo)
      .then(res => {
        console.log(res);
        setVideosData(prevState => [...prevState, res.data]);
        setNewVideo({ title: '', views: '' });  
      });
  };

  const deleteVideo = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        setVideosData(prevState => prevState.filter(video => video.id !== id));
      });
  };

  const startEditing = (video) => {
    setIsEditing(true);
    setCurrentVideoId(video.id);
    setNewVideo({ title: video.title, views: video.views });
  };

  const editVideo = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/posts/${currentVideoId}`, newVideo)
      .then(res => {
        setVideosData(prevState => prevState.map(video => 
          video.id === currentVideoId ? res.data : video
        ));
        setIsEditing(false);
        setCurrentVideoId(null);
        setNewVideo({ title: '', views: '' });  
      });
  };

  return (
    <>
      <button onClick={getVideosData}>Listar Videos</button>

      {videosData.length === 0 ? (
        <p>Sem videos disponiveis</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Views</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {videosData.map((videoData) => (
              <tr key={videoData.id}>
                <td>{videoData.title}</td>
                <td>{videoData.views}</td>
                <td><button onClick={() => startEditing(videoData)}>Editar</button></td>
                <td><button onClick={() => deleteVideo(videoData.id)}>Deletar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>{isEditing ? 'Editar Video' : 'Adicionar novo Video'}</h2>
      <form onSubmit={isEditing ? editVideo : addVideo}>
        <div>
          <label>
            Title:
            <input 
              type="text" 
              name="title" 
              value={newVideo.title} 
              onChange={handleInputChange} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Views:
            <input 
              type="number" 
              name="views" 
              value={newVideo.views} 
              onChange={handleInputChange} 
              required 
            />
          </label>
        </div>
        <button type="submit">{isEditing ? 'Editar Video' : 'Adicionar Video'}</button>
      </form>
    </>
  );
}

export default App;
