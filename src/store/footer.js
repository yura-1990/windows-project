import { create } from 'zustand'

const useFooter = create((set, get) => ({
  state: {
    footerLinks: [
      {id: 1, name: 'Menu', url: '/menus', icon: '', active: false},  
    ],
  },

  getFooterLinks: () => {
    const footerLinks = localStorage.getItem('footer-links')
    
    if(footerLinks){
        set({state: {footerLinks: JSON.parse(footerLinks)}})
    } else {
        localStorage.setItem('footer-links', [])
    }
  },

  setFooterLinks: (footer) => {
    const footerLinks = localStorage.getItem('footer-links')   

    if(footerLinks){
        const links = JSON.parse(footerLinks)
        set({state: {footerLinks: [...links, footer]}})
        localStorage.setItem('footer-links', JSON.stringify([...links, footer]))

    } else {

        localStorage.setItem('footer-links', JSON.stringify([footer]))

        set({state: {footerLinks: [footer]}})
    }
  }
  
}))

export default useFooter    