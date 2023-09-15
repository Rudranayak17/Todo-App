import './style.css'

type Todo={
    title:string,
    description:string,
    isCompleted:boolean,
   readonly id:string
}

const todos:Array<Todo> =[]

const todoContainer=document.querySelector(".todo") as HTMLDivElement;
console.log(todoContainer);

const title=document.getElementById("title") as HTMLInputElement;

const description=document.getElementById("description") as HTMLInputElement;

const myForm=document.getElementById("myForm") as HTMLFormElement;


myForm.onsubmit=(e:SubmitEvent)=>{
    e.preventDefault();

    const todo:Todo={

        title:title.value,
        description:description.value,
        isCompleted:false,
        id:String(Math.random()*1000)
    }
todos.push(todo)
//----------------------------------------------------------------
title.value='';
description.value=''
renderTodo(todos)

    
}

const generateTodoItem=(title:string,description:string,isCompleted:boolean,id:string)=>{
    const todo:HTMLDivElement=document.createElement("div");
    todo.className='todoContainer';
    const label = document.createElement("label")

    const checkbox:HTMLInputElement = document.createElement("input");
    checkbox.setAttribute("type", "checkbox")
    checkbox.className="isCompleted"
    checkbox.checked=isCompleted;
    checkbox.onchange=()=>{
        todos.find(item=>{
            item.id===id?item.isCompleted=checkbox.checked:""
          })
          heading.className=checkbox.checked?"textCut":""
          content.className=checkbox.checked?"textCut":""

    }
    label.append(checkbox)
// creating Div for title and content 
const innerDiv:HTMLDivElement=document.createElement("div");
innerDiv.className="todoList"

    //title
    const heading:HTMLHeadingElement=document.createElement("h2")
    heading.innerText=title
    //description
    const content:HTMLHeadingElement=document.createElement("p")
    content.innerText=description

    heading.className=checkbox.checked?"textCut":""
    content.className=checkbox.checked?"textCut":""

    innerDiv.append(heading,content)

    //----------------------------------------------------------------

    //creating delete button

    const deleteBtn=document.createElement("button")
    deleteBtn.innerHTML=`<i class="ri-delete-bin-line"></i>`
    deleteBtn.className='deletebtn'
    deleteBtn.onclick=()=>{
        deleteTodo(id)
    }
    todo.append(checkbox,innerDiv,deleteBtn)
    todoContainer.append(todo)


}

//delete list Todo

const deleteTodo=(id:string)=>{
    const idx=todos.findIndex(item=>item.id===id);
    todos.splice(idx,1)
    renderTodo(todos)
  }


//render the Todo list


const renderTodo=(todos:Todo[])=>{
    todoContainer.innerText=""
    todos.forEach(item=>{
        generateTodoItem(item.title ,item.description,item.isCompleted,item.id);
      })
}