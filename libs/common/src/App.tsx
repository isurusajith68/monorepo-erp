import NavBar from './components/Nav'

const App = () => {
  return (
    <div>
      <NavBar
        items={[
          { path: '/', name: 'Home' },
          { path: '/about', name: 'About' },
          { path: '/contact', name: 'Contact' },
          { path: '/isuru', name: 'Isuru' },
        ]}
        logo={{
          url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
          siteName: 'Isuru Sajith',
        }}
        activeItem=""
        // use="react"
      />
    </div>
  )
}
export default App
