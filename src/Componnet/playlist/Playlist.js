import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../trackList/Tracklist';
function Playlist(props){
    function handleNameChange({target}){
        props.onNameChange(target.value)
    }
    return (
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} onChange={handleNameChange}/>
            {/* <!-- Add a TrackList componet --> */}
            <Tracklist UserSearchResults={props.playlistTrack}
             onRemove={props.onRemove}
             isRemoval={false} />
            <button className={styles["Playlist-save"]} onClick={props.onSave}>
                SAVE TO SPORTIFY
            </button>
        </div>
    )
}

export default Playlist