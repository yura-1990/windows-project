import Windows from "./layouts/windows"
import Main from "./pages/main"
import OpenWindows from "./pages/openWindows"

function App(){ 
    return (
        <Windows>
            <Main />
            <OpenWindows />
        </Windows>
    )
}

export default App