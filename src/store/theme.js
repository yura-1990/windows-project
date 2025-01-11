import { create } from 'zustand'

const useTheme = create((set, get) => ({
  state: {
    themeMode: false,
  },

  toggleThemeMode: () => {

    const mode = JSON.parse(localStorage.getItem('mode-dark'))

    set({state: {themeMode: !mode}})
    localStorage.setItem('mode-dark', JSON.stringify(!mode))    
    
    if(!mode){
      document.body.classList.remove('bg-dark')
    } else {
      document.body.classList.add('bg-dark')
    }
    
  },

  getThemeMode: ()=>{
    const mode = JSON.parse(localStorage.getItem('mode-dark'))

    set({state: {themeMode: mode}})

    localStorage.setItem('mode-dark', JSON.stringify(mode))
    
    if(mode){
      document.body.classList.remove('bg-dark')
    } else {
      document.body.classList.add('bg-dark')
    }
  }

}))

export default useTheme