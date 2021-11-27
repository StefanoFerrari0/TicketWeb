export default function NotFound() {
    return (
      <>
        <main
          className="min-h-full bg-cover bg-top sm:bg-top"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1555086156-e6c7353d283f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">Error 404</p>
            <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Oh! Creo que te perdiste...
            </h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              Al parecer la página a la cual intentaste acceder no existe.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }