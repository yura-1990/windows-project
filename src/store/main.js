import { create } from 'zustand'

const useMain = create((set) => ({
  state: {
    mainLinks: [
        {id: 1, name: 'Menu', url: '/menus', icon: '', active: false},
        {id: 2, name: 'Menu', url: '/menus', icon: '', active: false},
        {id: 3, name: 'Menu', url: '/menus', icon: '', active: false},
        {id: 4, name: 'Menu', url: '/menus', icon: '', active: false},
        {id: 5, name: 'Menu', url: '/menus', icon: '', active: false},
    ],
  },

  getMainLinks: () => {
    const footerLinks = localStorage.getItem('footer-links')

    if(footerLinks){
        set({state: {mainLinks: JSON.parse(footerLinks)}})
    } else {
        localStorage.setItem('footer-links', [])
    }
  },

  setMainLinks: (main) => {
    const mainLink = localStorage.getItem('footer-links')

    if(mainLink){

        const links = JSON.parse(mainLink)
        links.push(main)

        localStorage.setItem('footer-links', JSON.stringify(links))

        set({state: {footerLinks: links}})
    } else {

        localStorage.setItem('footer-links', JSON.stringify([...main]))

        set({state: {mainLinks: [...main]}})
    }
  }
  
}))

export default useMain    