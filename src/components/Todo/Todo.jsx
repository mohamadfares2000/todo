import {  Button, Card,  CardContent,  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  Grid, IconButton, TextField } from '@mui/material';
import { useContext , useState } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import '../Todo/Todo.css';
//icons
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Todo (todo) {
    const {todos , setTodos} = useContext(TodosContext)
    const [showDeleteModal ,setShowDeleteModal] = useState(false);
    const [showUpdateModal ,setShowUpdateModal] = useState(false);
    const [UpdatedTodo ,setUpdatedTodo] = useState({title:todo.todo.title , descripstion:todo.todo.descripstion});

    function handelChecked () {
        const updetedToDo = todos.map((t)=>{
            if(t.id === todo.todo.id){
                t.isCompleted =! t.isCompleted
            }
            return t
        });
        setTodos(updetedToDo)
        localStorage.setItem( "todos" , JSON.stringify(updetedToDo))

    }

    function handelDelteConferm () {
        const updetedToDo = todos.filter((t)=> {
            return t.id != todo.todo.id
        });
        setTodos(updetedToDo)
        localStorage.setItem( "todos" , JSON.stringify(updetedToDo))
    }

    function handelUpdateConferm () {
      const udatedTodo = todos.map((t)=>{
        if(t.id == todo.todo.id){
          return {...t , title : UpdatedTodo.title , descripstion: UpdatedTodo.descripstion  }
        }else {
          return t
        }
      })
      setTodos(udatedTodo)
      localStorage.setItem( "todos" , JSON.stringify(udatedTodo))
      handelUpdateDialogClose()
  }

    function handelDeleteClick() {
        setShowDeleteModal(true)
    }

    function handelDeleteDialogClose() {
        setShowDeleteModal(false)
    }

    function handelUpdateDialogClose() {
      setShowUpdateModal(false)
  }

  function handelUpdateClick() {
    setShowUpdateModal(true)
}
    return (
        <>
      {/* S Edit Dialog */}
        <Dialog
          onClose={handelUpdateDialogClose}
          open={showUpdateModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{direction:'rtl'}}
        >
          <DialogTitle id="alert-dialog-title">
            {"هل انت متاكد برغبتك بتعديل مهمة ؟"}
          </DialogTitle>
        <div style={{padding:'20px'}}>
          <TextField
              autoFocus
              margin="dense"
              type='email'
              id="name"
              fullWidth
              label="عنوان المهمة"            
              variant="standard"
              value={UpdatedTodo.title}
              onChange={(e)=>{
                setUpdatedTodo({...UpdatedTodo , title :e.target.value})
              }}
            />

              <TextField
              autoFocus
              margin="none"
              type='email'
              id="name"
              fullWidth
              label=" التفاصيل "            
              variant="standard"
              value={UpdatedTodo.descripstion}
              onChange={(e)=>{
                setUpdatedTodo({...UpdatedTodo , descripstion :e.target.value})
              }}
            />

        </div>
        
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handelUpdateDialogClose}>اغلاق</Button>
            <Button  autoFocus onClick={handelUpdateConferm}>
              تأكيد
            </Button>
          </DialogActions>
        </Dialog>
      {/* E  Edit dialgo */}

      {/* S Delete Dialog */}
        <Dialog
        onClose={handelDeleteDialogClose}
        open={showDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:'rtl'}}
        >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد برغبتك لحذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع بعد الاتمام
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeleteDialogClose}>اغلاق</Button>
          <Button  autoFocus onClick={handelDelteConferm}>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
        </Dialog>
      {/* E  Delete dialgo */}

            <Card sx={{minWidth : 275 , background : '#283594' , color :'white' , marginTop : 5}} className='todoCard'>
                <CardContent >
                    <Grid   container spacing={2} style={{display : 'flex' , justifyContent: 'center', margin: '0px auto' , minHeight : '90px'}}>
                        <Grid xs={8}  style={{textAlign:'right'}}>
                            <h3 style={{textDecoration: todo.todo.isCompleted ?'line-through':'none'}}>{todo.todo.title}</h3>
                            <h4>{todo.todo.descripstion}</h4>
                        </Grid>
                        <Grid className='icons' xs={4} style={{display:'flex' , alignItems:'center' , justifyContent : 'space-around'}}>
                            <IconButton className='icon' aria-label="Check" onClick={handelChecked} style={{color : todo.todo.isCompleted ? 'white':'#8bc34a',  background : todo.todo.isCompleted ?"#8bc34a" : 'white', border : 'solid 3px #1769aa' }}>
                                <CheckCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton className='icon' aria-label="edit" onClick={handelUpdateClick} style={{color : '#8bc34a', background : "white" , border : 'solid 3px #8bc34a' }}>
                                <ModeEditOutlinedIcon />
                            </IconButton>
                            <IconButton className='icon' aria-label="delete" onClick={handelDeleteClick} style={{color : '#b23c17', background : "white" , border : 'solid 3px #b23c17' }}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

