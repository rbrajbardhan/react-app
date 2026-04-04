import Card from "./Card";

function App() {
  const outerbox={
    backgroundColor:"blue",// camal case
    height:screen,
    width:"100%",
    display:flex,
    justifyContent:center,
    alignItem:center
  }
  return (
    <>
    <div style={outerbox} >

   
      <h1>SparkonFeet</h1>
      <div style={innerBox}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      </div>
    </>
  );
}

export default App;
