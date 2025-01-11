import { create } from 'zustand'

const useMain = create((set) => ({
  state: {
    mainLinks: [
      {id: 1, name: "Menu", url: "/menus", icon: "", open: false},
      {id: 2, name: "Menu", url: "/menus", icon: "", open: false},
    ],
  },

  getMainLinks: () => {
    const footerLinks = localStorage.getItem('footer-links')

    if(footerLinks){
      set({state: {mainLinks: JSON.parse(footerLinks)}})
    } else {
      localStorage.setItem('footer-links', JSON.stringify([
        {id: 1, name: "Menu", url: "/menus", icon: "", open: false, active: false}, 
        {id: 2, name: "Menu", url: "/menus", icon: "", open: false, active: false}
      ]))
    }
  },

  setMainLinks: (main) => {
    const footerLinks = localStorage.getItem('footer-links')   

    if(footerLinks){
      const links = JSON.parse(footerLinks)

      if(!links.some(el=>el.id === main.id)){
        set({state: {footerLinks: [...links, {...main, id: links.lenght, open: true }]}})

        localStorage.setItem('footer-links', JSON.stringify([...links, {...main, open: true  }]))
      } else {
        const activeLink = links.map(el=>({...el, open: true, active: false }))
        localStorage.setItem('footer-links', JSON.stringify(activeLink))
      }      
      
    } else {
      localStorage.setItem('footer-links', JSON.stringify([{...main, open: true }]))
      set({state: {footerLinks: [{...main, open: true }]}})
    }
  }
  
}))

export default useMain    