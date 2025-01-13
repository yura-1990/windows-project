import Windows from "./layouts/windows"
import Main from "./pages/main"
import OpenWindows from "./pages/openWindows"
import './app.css'

function App(){ 
    return (
        <Windows>
            <Main />
            <OpenWindows />
        </Windows>
    )
}

export default App