import styles from './SearchBar.module.css'
import { useState } from 'react'
function Search(props) {
    const [term, setTerm] = useState("")

    function passTerm(){
        props.onSearch(term)
    }

    function handleTermChange({target}){
        setTerm(target.value)
    }
    return (
        <div className={styles.SearchBar}>
            <input type='text' placeholder='Enter A Songs, Album, or Artist' 
            onChange={handleTermChange}/>
            <button className={styles.SearchButton} onClick={passTerm}>SEARCH</button>
        </div>
    )
}


export default Search