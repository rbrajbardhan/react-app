const root=document.getElementById('root')

const App=document.createElement('div')


const Element={
    name:"h1",
    content:"helo world!!"
}
const Element_2={
    name:"p",
    content:"I am another element,I am a <p/> in custom react."
}




const renderApp=function(){
    const el=document.createElement(Element.name)
    el.innerText=Element.content

    const el_2=document.createElement(Element_2.name)
    el_2.innerText=Element_2.content

    App.appendChild(el)
    App.appendChild(el_2)

    root.appendChild(App)
    
}

renderApp()
