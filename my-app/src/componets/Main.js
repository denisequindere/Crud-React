import React, { Component } from 'react';
import './Main.css'
//icones do form
import { FaPlus } from 'react-icons/fa'

import { FaWindowClose } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
export default class Main extends Component{

    state = {
        novaTarefa: '',
        tarefas:[],
        index: -1,
    };
    componentDidMount(){
        let tarefas = JSON.parse(localStorage.getItem('tarefas'));
        if(!tarefas) return;
        this.setState({tarefas});
    }
    componentDidUpdate(prevProps,prevState){
        let {tarefas} = this.state;
        if (tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas',JSON.stringify(tarefas))
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const {tarefas, index} = this.state; 
        let {novaTarefa} = this.state; 
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return; //verifica se a tarefa já existe
   

        const novasTarefas = [...tarefas] 
        

        if(index === -1){ //CRIAR uma nova tarefa 
            this.setState({
                tarefas: [...novasTarefas,novaTarefa], 
                novaTarefa: '', //limpar o input
            })
        }else{//EDITAR uma tarefa já existente 
            novasTarefas[index] = novaTarefa 

            this.setState({
                tarefas: [...novasTarefas], 
                index: -1,
            })

        }
        
    }

    handleChange = (e) =>{
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleEdit = (e, index) =>{
        //console.log('Edit', index)
        const {tarefas} = this.state;
        this.setState({
            index, 
            novaTarefa: tarefas[index], 
            
        });
    }

    handleDelete = (e, index) =>{
        //console.log('Delete', index)
        const {tarefas} = this.state; 
        const novasTarefas = [...tarefas]; 
        novasTarefas.splice(index, 1); 

        this.setState({
            tarefas: [...novasTarefas] 
        });
    }
    render(){
        const {novaTarefa, tarefas} = this.state;
        return (
            <div className="main">
                <h1>CRUD - Lista de tarefas com React </h1>
                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <input 
                    onChange={this.handleChange} 
                    type="text"
                    value={novaTarefa}>                      
                    </input>
                    <button type="submit"><FaPlus/></button>
                </form>
                <ul className="listaTarefas">
                    {tarefas.map((tarefa,index)=>{
                         return <li key={tarefa}>
                            {tarefa}
                            <div>
                                <FaEdit 
                                onClick={(e) => this.handleEdit(e,index)} 
                                className="edit" /> 
                                <FaWindowClose 
                                onClick={(e) => this.handleDelete(e,index)}  
                                className="close" />
                            </div> 
                         </li>                   
                    })}  
                                     
                </ul>
            </div>
        )                     
    }
}