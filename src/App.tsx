

function App() {

  return (
    <main className="p-12 bg-gray-100 min-h-screen text-gray-800 flex flex-col gap-8 justify-center items-center">
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Click me</button>
      <section className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold">Welcome to the app</h2>
          <p className="text-gray-600">This is a simple app to get you started</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold">Welcome to the app</h2>
          <p className="text-gray-600">This is a simple app to get you started</p>
        </div>
      </section>
    </main>
  )
}

export default App
