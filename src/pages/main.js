import useMain from "../store/main";
import { useEffect } from "react";
import DragAndDrop from "../components/draggable";

function Main() {
    const mainLinks = useMain(state=>state.state.mainLinks)
    const getMainLinks = useMain(state=>state.getMainLinks)

    useEffect(()=>{
        getMainLinks()
    }, [])
    

    return (
        <div className="d-flex flex-wrap gap-4 w-100">
            {
                mainLinks.map(el=>(<DragAndDrop element={el} />))
            }
        </div>
    )
}

export default Main