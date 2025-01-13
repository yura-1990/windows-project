import { useEffect } from "react"
import useFooter from "../store/footer"
import Resizable from "../components/resizable"
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

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
                        <div className="control-section spreadsheet-control">
                        </div>
                    </Resizable>
                ))
            }
        </div>
    )
}

export default OpenWindows