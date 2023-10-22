 
import { useRouter } from 'next/router';
import { useState } from 'react';


const Search = ()=> {

    const[destination, setDestination] = useState("")

    const router = useRouter()  

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch =()=> {
        router.push(`/courses?destination=${destination}`);
    }

    return(
        
        <div 
            className="headerSearch" 
        >
            <div className="headerSearchItem">
                <input 
                    type="text" 
                    placeholder="search course, university or location"
                    className="headerSearchInput"  
                    onChange={e=> setDestination(e.target.value)}
                    onKeyDown={handleKeyPress}
                /> 
                
                <button 
                    className="headerBtn"
                    onClick={handleSearch} 
                > 
                    search
                </button> 
            </div> 

            
        </div> 
    )
}  

export default Search 