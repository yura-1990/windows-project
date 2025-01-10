import { OverlayTrigger, Tooltip } from "react-bootstrap"
import useFooter from "../store/footer" 
import { useEffect } from "react"


function Footer() {
    const getFooterLinks = useFooter(state=>state.getFooterLinks)
    const footerLinks = useFooter(state=>state.state.footerLinks)

    useEffect(()=>{
        getFooterLinks()
    }, [getFooterLinks])

    return (
        <div>
            {
            footerLinks.length > 0 
                ?  <div className="d-flex footer gap-2 p-1 overflow-auto rounded shadow">
                    { footerLinks?.map(el=>(
                        <OverlayTrigger 
                            key={el.id} 
                            placement="top" 
                            overlay={
                                <Tooltip id="button-tooltip-2">{ el?.url }</Tooltip>
                            }
                        >
                            {({ ref, ...triggerHandler }) => ( <p ref={ref} className="btn m-0 border " {...triggerHandler}> {el?.name} </p> )}
                        </OverlayTrigger>
                    )) }
                </div> 
                : ''
            }
        </div>
       
    )
}

export default Footer