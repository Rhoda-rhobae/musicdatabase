import { useState } from 'react';
import React  from 'react';
import styles from './App.module.css'
import SearchBar from '../Search/SearchBar';
import SearchResults from '../SearchResult/SearchResults';
import Playlist from '../playlist/Playlist';
import { Spotify } from '../../util/Spotify';


function App () {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Man Down",
      artist: "Rihanna",
      album: "Man Down",
      id: 1,
    },
    {
      name: "Drunk inLove",
      artist: "Beyonce",
      album: "Drunk inLove",
      id: 2,
    }, 
    
    {
      name: "All of Me",
      artist: "John Legend",
      album: "All of me",
      id: 3,
    }
  ])
  
  const [playlistName, setPlaylistName] = useState(["Example Playlist Name"]);
  const [playlistTrack, setPlaylistTrack] = useState([
    {
      name: "Don't Judge Me",
      artist: "Crist Brown",
      album: "Don't Judge Me",
      id: 1,
    },

    {
      name: "Love",
      artist: "Bulton Micheal",
      album: "Love",
      id: 2,
    },

    {
      name: "If I Let You Go",
      artist: "WestLife",
      album: "If I Let You Go",
      id: 3,
    }
  ])
   
  
  function addTrack(track) {
    const existingTrack = playlistTrack.find(t => t.id === track.id);
    const newTrack = playlistTrack.concat(track);

    if(existingTrack) {
      console.log("Track already exist")
    }else {
      setPlaylistTrack(newTrack)
    }
  }

  function removeTrack(track){
    const existingTrack = playlistTrack.filter((t) => t.id !== track.id);
    setPlaylistTrack(existingTrack)
  }
  
  function updatePlaylistName(name) {
    setPlaylistName(name)
  }

  function search(term){
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term)
  }


  function savePlaylist(){
    const trackURIs = playlistTrack.map((t) => t.uri)
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist")
      setPlaylistTrack([])

    })
   
  }

  
  return(
    <div>
    <h1>Mu<span className={styles.highlight}>sic</span>site</h1>
    <div className={styles.App}>
      {/* <!-- add a SearchBar --> */}
    <SearchBar onSearch={search} />
    <div className={styles['App-playlist']}>
    {/* <!-- add a searchResults --> */}
    <SearchResults UserSearchResults={searchResults} onAdd={addTrack}/>
    <Playlist playlistName={playlistName} playlistTrack={playlistTrack} 
    onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
    </div>
    </div>
    </div>
  )
  
}

export default App;
