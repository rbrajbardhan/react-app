import Card from "./Card"
function App() {

  return (
    <>
    <div className="bg-gray-900 h-screen w-full p-20">
      <h1 className="text-amber-50 text-3xl-end">Employss in Codez</h1>
      <Card img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_WWS9qIG7ewcmlbMpxnnFyMSv6dHqpVU9lQ&s' name='Avir' decription='SD3 and Tecnical Trainer'/>
      <Card img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmPuDRk-foHpYeZ2MOBxC8AGj9DQwkARDNg&s' name='Ashutosh' decription='Backend Enginner and IT Instructor'/>
      <Card img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmPuDRk-foHpYeZ2MOBxC8AGj9DQwkARDNg&s' name='Ashutosh' decription='Backend Enginner and IT Instructor'/>
    </div>
    </>
  )
}

export default App
