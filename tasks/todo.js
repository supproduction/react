const ToDoField = React.createClass({
    handleAddTask(e) {
        if(e.key === 'Enter') {
            let newTask = {
                id : Date.now(),
                text : e.target.value,
                complete : false
            };
            this.props.onToDoAdd(newTask);
            e.target.value = '';
        }
    },
    render() {
        return (
            <input
                type="text"
                placeholder="New Task"
                className='new-todo'
                onKeyPress={this.handleAddTask}
            />
        );
    }
});

const FilterToDo = React.createClass({
    handleClick(e) {
        this.props.onClick();
        e.preventDefault();
    },
    render() {
        let activeFilter = this.props.filter;
        let btnStatus = this.props.status;

        return (
            <li>
                <a
                    href="#"
                    className={activeFilter === btnStatus ? 'active' : ''}
                    onClick={this.handleClick}
                >
                    {this.props.text}
                </a>
            </li>
        );
    }
});

const FilterGrid = React.createClass({
    render() {
        const FILTER_BUTTONS = [
            {
                status : 'all',
                text : 'All'
            },
            {
                status : 'active',
                text : 'Active'
            },
            {
                status : 'completed',
                text : 'Completed'
            }
        ];
        return (
            <ul className='filters-todo'>
                {
                    FILTER_BUTTONS.map((item, index) => {
                        return <FilterToDo
                                    key={index}
                                    text={item.text}
                                    status={item.status}
                                    filter={this.props.filter}
                                    onClick={this.props.handleFilterChange.bind(null, item)}
                                />
                    })
                }
            </ul>
        );
    }
});

const TodoItem = React.createClass({
    render() {
        return (
            <li>
                <input
                    type="checkbox"
                    className="checkbox"
                    id={this.props.id}
                    checked={!!this.props.complete}
                    onChange={this.props.onChange}
                />
                <label
                    htmlFor={this.props.id}
                    className={this.props.complete ? 'success' : ''}
                >
                    {this.props.children}
                </label>
                <button
                    className='destroy'
                    onClick={this.props.handleRemoveTask}
                >
                    ✕
                </button>
            </li>
        );
    }
});

const TodoGrid = React.createClass({
    render() {
        return (
            <ul className='list-todo'>
                {
                    this.props.tasks.map(item => {
                        return <TodoItem
                            key={item.id}
                            id={item.id}
                            complete={item.complete}
                            onChange={this.props.onChange.bind(null, item)}
                            handleRemoveTask={this.props.handleRemoveTask.bind(null, item)}
                        >
                            {item.text}
                        </TodoItem>
                    })
                }
            </ul>
        )
    }
});

const TodoApp = React.createClass({
    getInitialState() {
        return {
            list: [
                {
                    id: "1",
                    text: "1234",
                    complete: false
                },
                {
                    id: "2",
                    text: "143234",
                    complete: false
                },
                {
                    id: "3",
                    text: "8851234",
                    complete: false
                }
            ],
            filter: "all"
        }
    },
    componentDidUpdate() {
        this._updateLocalStorage();
    },
    componentWillMount() {
        const tasks = localStorage.getItem('tasks');

        if(tasks) {
            this.setState({
                list : JSON.parse(tasks)
            });
        }
    },
    handleFilterChange(item) {
        this.setState({filter: item.status});
    },
    handlerOnChange(item) {
        let newList = this.state.list.slice();
        let idItem = item.id;

        newList.map(item => {
            if (item.id === idItem) {
                item.complete = !item.complete;
            }
            return item;
        });
        this.setState({list: newList});
    },
    handleAddTask(task) {
        let newList = this.state.list.slice();
        if (task.text)
            newList.unshift(task);
        this.setState({list: newList});
    },
    handleRemoveTask(task) {
        let taskId = task.id;
        let newTasks = this.state.list.filter(function(taskItem) {
            return taskItem.id !== taskId;
        });
        this.setState({list: newTasks});
    },
    render() {
        return (
            <div id="todo-app">
                <ToDoField onToDoAdd={this.handleAddTask} />
                <FilterGrid
                    filter={this.state.filter}
                    handleFilterChange={this.handleFilterChange}
                />
                <TodoGrid
                    onChange={this.handlerOnChange}
                    tasks={this._getVisibleTasks(this.state.list, this.state.filter)}
                    handleRemoveTask={this.handleRemoveTask}
                />
            </div>
        )
    },
    _getVisibleTasks(tasks, filter) {
        if (filter === 'active')
            return tasks.filter( task => task.complete === false );

        if (filter === 'completed')
            return tasks.filter( task => task.complete === true );

        return tasks;
    },
    _updateLocalStorage() {
        let tasks = JSON.stringify(this.state.list);
        localStorage.setItem('tasks', tasks);
    }
});

ReactDOM.render(
    <TodoApp/>,
    document.querySelector('#todo-list')
);