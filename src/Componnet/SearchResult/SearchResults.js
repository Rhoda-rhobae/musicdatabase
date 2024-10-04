import React from 'react';
import styles from './SearchResult.module.css'
import Tracklist from '../trackList/Tracklist'

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
        {/* <!-- add a trackList componnet --> */}
        <Tracklist UserSearchResults={props.UserSearchResults} isRemoval={true} onAdd={props.onAdd}/>
        </div>
    )
}

export default SearchResults

