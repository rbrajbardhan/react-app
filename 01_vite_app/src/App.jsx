import Card from './Card';
import './App.css';
function App() {

  const innerbox={
    backgroundColor:"lightgreen", // camal case
    height:screen,
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItem:"center",
  }
  const outerbox={
    alignItem:"center",
  }

  return (
    <>
    <div style={outerbox}>
    <h1>SparkonFeet</h1>
    <div style={innerbox}>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    </div>
    </div>
    </>
  )
}

export default App
