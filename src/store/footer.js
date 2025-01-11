import { create } from 'zustand'

const useFooter = create((set, get) => ({
  state: {
    footerLinks: [
      {id: 1, name: 'Menu', url: '/menus', icon: '', open: false, active: false},  
    ],
  },

  getFooterLinks: () => {
    const footerLinks = localStorage.getItem('footer-links')
    
    if(footerLinks){
      set({state: {footerLinks: JSON.parse(footerLinks)}})
    } 
  },

  setFooterLinks: (footer) => {
    const footerLinks = localStorage.getItem('footer-links')   

    if(footerLinks){
      const links = JSON.parse(footerLinks)

      if(!links.some(el=>el.id === footer.id)){
        set({state: {footerLinks: [...links, {...footer, open: true }]}})

        localStorage.setItem('footer-links', JSON.stringify([...links, {...footer, open: true }]))
      } else {
        const activeLink = links.map(el=>(el.id === footer.id ? {...el, open: true }:{ ...el }))
        localStorage.setItem('footer-links', JSON.stringify(activeLink))
      }      
      
    } else {
      localStorage.setItem('footer-links', JSON.stringify([{...footer, open: true}]))
      set({state: {footerLinks: [{...footer, open: true}]}})
    }
  },

  setActive:(footer)=>{
    const footerLinks = localStorage.getItem('footer-links')

    if(footerLinks){
      const links = JSON.parse(footerLinks)
      console.log(footer);

      const activeLink = links.map(el=>({...el, active: el.id === footer.id})) 

      localStorage.setItem('footer-links', JSON.stringify(activeLink))
      set({state: {footerLinks: activeLink}})
    }
  },

  resetWindow:(footer)=>{
    const footerLinks = localStorage.getItem('footer-links') 
    
    if(footerLinks){
      const links = JSON.parse(footerLinks)

      const closeOpen = links.map(el=>(el.id === footer.id ? {...el, open: false } : {...el }))
      localStorage.setItem('footer-links', JSON.stringify(closeOpen))
      set({state: {footerLinks: closeOpen}})
    }

  },

  showWindow: (footer)=>{
    const footerLinks = localStorage.getItem('footer-links') 
    
    if(footerLinks){
      const links = JSON.parse(footerLinks)

      const closeOpen = links.map(el=>(el.id === footer.id ? {...el, open: true } : {...el }))
      localStorage.setItem('footer-links', JSON.stringify(closeOpen))
      set({state: {footerLinks: closeOpen}})
    }
  },

  removeFooterLink: (footer)=>{
    localStorage.removeItem(`open-element-position-${footer.id}`);
    localStorage.removeItem(`open-element-size-${footer.id}`);
    localStorage.removeItem(`open-element-position-${footer.id}`);
    localStorage.removeItem(`open-element-position-z-index-${footer.id}`)
    localStorage.removeItem(`element-position-${footer.id}`)
    localStorage.removeItem(`open-element-full-screen-${footer.id}`)

    const footerLinks = localStorage.getItem('footer-links')   
    if(footerLinks){
      const links = JSON.parse(footerLinks)
      const cleanLink = links.filter(el=>el.id !== footer.id)
      localStorage.setItem('footer-links', JSON.stringify(cleanLink))
      
      
      set({state: {footerLinks: cleanLink}})
    }
  }


  
}))

export default useFooter    