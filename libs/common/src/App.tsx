import NavBar from './components/Nav'

const App = () => {
  return (
    <div>
      <NavBar
        items={[]}
        logo={{
          url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
          siteName: 'Isuru Sajith',
        }}
        activeItem=""
      />
    </div>
  )
}
export default App
