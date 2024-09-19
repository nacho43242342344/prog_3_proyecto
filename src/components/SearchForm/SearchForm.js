import './SearchForm.css';
import { Component } from 'react';

class SearchForm extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            query:""
        }
    }

    handelFormChange(e) {
        this.setState({
         query: e.target.value
        }) 
    } 

    handleCancelSubmit(e){
        console.log(e);
        e.preventDefault()
    }

    handelFormSubmit(){
        this.props.history.push("/search", {query: this.state.query})
    }

    render(){
        return(
            <div>
                 <form className="search_form" onSubmit={(e) => this.handleCancelSubmit(e)}>
                    <input 
                        onChange={(e) => this.handelFormChange(e)}
                        name='query'
                        type="text" 
                        placeholder="Buscar..."  
                        value={this.state.query}
                    />
                    <button onClick={()=>this.handelFormSubmit()}>Buscar</button>
                </form> 
            </div>
        )
    }
}

export default SearchForm;
