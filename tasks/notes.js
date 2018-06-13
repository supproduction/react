let NoteSearch = React.createClass({
   render: function() {
    return (
      <input
          type="text"
          className="searchInput"
          placeholder="Search"
          onChange={this.props.onChangeInput}
          value={this.props.value}
          onFocus={this.props.onFocus}
      />
    );
   }
});
let NoteColor = React.createClass ({
   render: function() {
       let styles = {backgroundColor: this.props.color};
       return (
           <span className={`${this.props.addClass} colorPick`} style={styles} onClick={this.props.onChangeColor}></span>
       );
   }
});
let Note = React.createClass({
    render: function () {
        let style = {backgroundColor: this.props.color};
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}>x</span>
                {this.props.children}
            </div>
        );
    }
});
let NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            noteColor: "#20B2AA",
            text: ""
        };
    },
    handleTextChange: function(e) {
       this.setState({text: e.target.value})
    },
    handleNoteAdd: function() {
        let newNote = {
          text: this.state.text,
          color: this.state.noteColor,
          id: Date.now()
        };
        this.props.onNoteAdd(newNote);
        this.setState({text: ''});
    },
    handleColorChange: function(color) {
        this.setState({noteColor: color});
    },
    render: function() {
        return (
            <div className="note-editor">
                <div className="color-grid">
                    {
                        this.props.colors.map((color, index) => {
                            return <NoteColor addClass={color === this.state.noteColor ? "is-checked" : ""} key={index} color={color} onChangeColor={this.handleColorChange.bind(null, color)} />
                        })
                    }
                </div>
                <textarea  placeholder="Enter your code here..." rows={5} className="textarea" onChange={this.handleTextChange} value={this.state.text} />
                <button className="add-button" onClick={this.handleNoteAdd}>add</button>
            </div>
        );
    }
});
let NotesGrid = React.createClass({
    componentDidMount: function() {
        let elem = this.refs.grid;
        this.msnry = new Masonry( elem, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },
    render: function() {
        let onNoteDelete = this.props.onNoteDelete;
        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note){
                        return <Note key={note.id} color={note.color} onDelete={onNoteDelete.bind(null, note)}>{note.text} </Note>
                    })
                }
            </div>
        );
    }
});
let NotesApp = React.createClass({
    getInitialState: function() {
      return {
        default: [],
        searchVal: "",
        colors: ["#20B2AA", "#90EE90", "#87CEFA", "#FFB6C1", "#5FEA05", "#FFA07A", "#00FA9A", "#FFF222"],
        notes: [
            {
            id: 7,
                text: "1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse",
                color: "#20B2AA"
            }, {
                id: 6,
                    text: "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem dolorum ducimus labore minima odio quod ",
                    color: "#90EE90"
            }, {
                id: 1,
                    text: "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem dolorum ducimus labore minima odio quod ratione sit voluptas voluptate. Adipisci aspernatur deserunt eius facere laudantium magni quia recusandae",
                    color: "#87CEFA"
            }, {
                id: 2,
                    text: "33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem dolorum ducimus labore minima odio quod ratione sit voluptas voluptate. Adipisci aspernatur deserunt eius facere laudantium magni quia recusandae ut!Lorem ipsum dolo",
                    color: "#FFB6C1"
            }, {
                id: 3,
                    text: "33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem ",
                    color: "#5FEA0"
            }, {
                id: 4,
                    text: "33Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem dolorum ducimus",
                    color: "#FFA07A"
            }, {
                id: 5,
                    text: "4Lorem ipsum dolor sit amet,",
                    color: "#00FA9A"
            }, {
                id: 0,
                text: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,",
                color: "#FFF"
            }
        ]
      };
    },
    componentDidMount: function() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({notes: localNotes});
        }
    },
    componentDidUpdate: function() {
        this._updateLocalStorage();
    },
    handleNoteDelete: function(note) {
        let noteId = note.id;
        let newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({notes: newNotes});
    },
    handleNoteAdd: function(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({searchVal: ""});
        this.setState({notes: newNotes});
    },
    handlerOnFocus() {
        this.setState({default: this.state.notes});
    },
    onChangeHandler: function(e) {
        let searchQuery = e.target.value.toLowerCase();
        let notes = this.state.notes;

        this.setState({searchVal: e.target.value});

        let displayedContacts = notes.filter(function(el) {
            let searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
    },
    handleFilter(notes, value) {
        let displayedContacts = notes.filter(function(el) {
            let searchValue = el.text.toLowerCase();
            return searchValue.indexOf(value) !== -1;
        });
        return displayedContacts;
    },
    render: function() {
        return (
            <div className="notes-app">
                NotesApp
                <NoteSearch onChangeInput={this.onChangeHandler} value={this.state.searchVal} onFocus={this.handlerOnFocus} />
                <NoteEditor colors={this.state.colors} onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.handleFilter(this.state.notes, this.state.searchVal)} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});
ReactDOM.render(
    <NotesApp />,
    document.querySelector('#content')
);