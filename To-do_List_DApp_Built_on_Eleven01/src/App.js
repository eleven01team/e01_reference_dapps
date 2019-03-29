import React, { Component } from 'react';
import logo from './logo.png';
import Web3 from 'web3'
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: {},
      account: '',
      taskCount: 0,
      tasks: [],
      task: '',
      todo: false,
      todoList: [],
      done: false,
      doneList: [],
    }
  }

  async componentWillMount() {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    // console.log(todoList)
    this.setState({todoList})
    const taskCount = await todoList.methods.taskCount().call()
    // console.log(taskCount)
    this.setState({taskCount})
    for(let i = 0; i<= taskCount; i++) {
      let task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
  }

  changeHandler = event => {
    this.setState({
      task: event.target.value
    });
  }

  createTask = async () => {
    await this.state.todoList.methods.addTask(this.state.task).send({from: this.state.account})
    const task = {
     "_id": this.state.taskCount + 1,
     "_task": this.state.task,
     "completed": false
    }
    this.setState({
      tasks: [...this.state.tasks, task]
    })
    this.setState({task: ''})
  }

  checkboxHandler = async event => {
    const i = event.target.value
    await this.state.todoList.methods.completedTask(i).send({from: this.state.account})
    const tasks = [...this.state.tasks];
    tasks[i] = { ...tasks[i], completed: !tasks[i].completed };
    this.setState({tasks})
  };

  todoTask = () => {
    let t = []
    const tasks = this.state.tasks;
    for(let i in tasks){
      if(tasks[i].completed == false) {
        t.push(tasks[i])
      }
    }
    this.setState({todoList: t})
    this.setState({todo: true})
    this.setState({done: false})
  }

  doneTask = () => {
    let t = []
    const tasks = this.state.tasks;
    for(let i in tasks){
      if(tasks[i].completed == true) {
        t.push(tasks[i])
      }
    }
    this.setState({doneList: t})
    this.setState({done: true})
    this.setState({todo: false})
  }

  render() {
    let show;
    if(!this.state.todo && !this.state.done){
      show = this.state.tasks.map((task, key) => {
        return(
          <div className="taskTemplate mt-3" key={key}>
            <label>
              <input 
                type="checkbox" 
                value={key}
                onChange={this.checkboxHandler} 
              />
              {
                task.completed 
                ? ( <span className="completedTaskList">{task._task}</span> )
                : ( <span className="content">{task._task}</span> )
              }
            </label>
          </div>
        )
      })
    }
    else if (this.state.todo) {
      show = this.state.todoList.map((task, key) => {
        return(
          <div className="taskTemplate mt-3" key={key}>
            <label>
              <input 
                type="checkbox" 
                value={key}
                onChange={this.checkboxHandler} 
              />
              {
                task.completed 
                ? ( <span className="completedTaskList">{task._task}</span> )
                : ( <span className="content">{task._task}</span> )
              }
            </label>
          </div>
        )
      })
    }
    else if (this.state.done) {
      show = this.state.doneList.map((task, key) => {
        return(
          <div className="taskTemplate mt-3" key={key}>
            <label>
              <input 
                type="checkbox" 
                value={key}
                onChange={this.checkboxHandler} 
              />
              {
                task.completed 
                ? ( <span className="completedTaskList">{task._task}</span> )
                : ( <span className="content">{task._task}</span> )
              }
            </label>
          </div>
        )
      })
    }
    return (
      <div className="form-signin">
        <img className="mb-4 logo" src={logo} alt="" align="center" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Todo List</h1>
        
        <input 
          type="text" 
          className="form-control" 
          name="task" 
          value={this.state.task}  
          onChange={this.changeHandler} 
        />
        <button className="btn btn-sm btn-primary btn-block" onClick={this.createTask} type="button">Create To Do</button>
        <button className="btn btn-sm btn-info btn-block todoStyle" onClick={this.todoTask}>To Do</button>
        <button className="btn btn-sm btn-success btn-block doneStyle" onClick={this.doneTask} type="button">Done</button>
        { 
          show
        }
      </div>
    );
  }
}

export default App;
