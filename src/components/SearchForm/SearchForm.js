import './SearchForm.css';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            query:"",
        }
    }

    handleFormChange(e){
        this.setState({
         query: e.target.value
        })
    }

    handleCancelSubmit(e){
        e.preventDefault()
    }

    handleFormSubmit(){        
        this.props.history.push("/search", { query: this.state.query });
        this.setState({query: ""});
    }

    render(){
        return(            
            <div>
                <form className="search_form" onSubmit={(e) => this.handleCancelSubmit(e)}>
                    <input 
                        onChange={(e) => this.handleFormChange(e)}
                        name="query"
                        type="text" 
                        placeholder="Buscar..."  
                        value= {this.state.query}
                    />
                    <button onClick={() => this.handleFormSubmit()}>Buscar</button>
                </form>
                 
            </div>
        );
    }
}

export default  withRouter(SearchForm);
