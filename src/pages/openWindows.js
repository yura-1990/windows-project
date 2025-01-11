import { useEffect } from "react"
import useFooter from "../store/footer"
import Resizable from "../components/resizable"

function OpenWindows(){
    const getFooterLinks = useFooter(state=>state.getFooterLinks)
    const footerLinks = useFooter(state=>state.state.footerLinks)

    useEffect(()=>{
        getFooterLinks()
    }, [getFooterLinks])

    return (
        <div>
            {
                footerLinks.filter(el=>el.open).map(el=>(
                    <Resizable 
                        element={el} 
                        elements={footerLinks.filter(el=>el.open)}
                    >
                        <p>The cursor property in CSS controls what the mouse cursor will look like when it is located over the element in which this property is set. Obviously, it’s only relevant in browsers/operating systems in which there is a mouse and cursor. They are used essentially for UX to convey the idea of certain functionality. So try not to break that affordance.</p>
                    </Resizable>
                ))
            }
        </div>
    )
}

export default OpenWindows