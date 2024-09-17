import './SearchForm.css';

const SearchForm = () => {

    return (
        <form className="search_form">
            <input 
                type="text" 
                placeholder="Buscar..."  
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchForm;
