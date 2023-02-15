import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("")
  const headers = { headers: { Authorization: "henrique-batista-conway" } };

  const getAllPlaylists = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        headers
      )
      .then((resposta) => {
        setPlaylists(resposta.data.result.list);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  useEffect(() => {
    getAllPlaylists();
  }, []);

  const searchPlaylist = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${playlistName}`,
        headers
      );
      setPlaylistName("");
      setPlaylists(response.data.result.playlist);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async () => {
    const body = {
        name: newPlaylist
    }
    try {
        await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, headers)
        alert("Playlist criada com sucesso!")
        getAllPlaylists();
        setNewPlaylist("")
    } catch (error) {
        console.log(error.message)
    }
  }


  return (
    <div>
      <input
        type="text"
        placeholder="Nome da Playlist"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={searchPlaylist}>Pesquisar</button>
      <hr />
      <input type="text" placeholder="Crie sua playlist" value={newPlaylist} onChange={(e)=> setNewPlaylist(e.target.value)} />
      <button onClick={createPlaylist}>Criar Playlist</button>
      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            setPlaylists={setPlaylists}
            getAllPlaylists={getAllPlaylists}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
