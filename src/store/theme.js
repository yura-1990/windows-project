import { create } from 'zustand'

const useTheme = create((set, get) => ({
  state: {
    themeMode: false,
  },

  toggleThemeMode: () => {

    set({state: {themeMode: !get().state.themeMode}})

    if(get().state.themeMode){
        document.body.classList.add('bg-dark')
    } else {
        document.body.classList.remove('bg-dark')
    }   
    
  },

}))

export default useTheme