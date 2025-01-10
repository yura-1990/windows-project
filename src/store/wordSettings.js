import { create } from 'zustand'

const useWord = create((set, get) => ({
  state: {
    word: false,
  },

  insertBreaks: (str, n = 20) => {

    let result = '';
    for (let i = 0; i < str.length; i += n) {
        result += str.slice(i, i + n) + '<br />';
    }

    return result;
  },

}))

export default useWord