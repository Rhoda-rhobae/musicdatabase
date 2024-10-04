import React from 'react';
import styles from './TrackList.module.css';
import Track from '../track/Track';
function Tracklist(props) {
    return (
        <div className={styles.Tracklist}>
        {/* <!-- you will add a map method that renders a set of Tracks componnts --> */}
        {props.UserSearchResults.map((track) => {
            return(
                <Track track={track} 
                key={track.id}
                 isRemoval={props.isRemoval}
                  onAdd={props.onAdd}
                  onRemove={props.onRemove}/>
            )
        })}
        
        </div>
    )
}


export default Tracklist;