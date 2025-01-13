import { OverlayTrigger, Tooltip } from "react-bootstrap"
import useFooter from "../store/footer" 
import { useEffect } from "react"


function Footer() {
    const getFooterLinks = useFooter(state=>state.getFooterLinks)
    const showWindow = useFooter(state=>state.showWindow)
    const footerLinks = useFooter(state=>state.state.footerLinks)
    const setActive = useFooter(state=>state.setActive)

    useEffect(()=>{
        getFooterLinks()
    }, [])

    function handleFooter(el){
        setActive(el)
        showWindow(el)
    }

    return (
        <div>
            {
            footerLinks.length > 0 
                ?  <div className="d-flex align-items-center justify-content-center footer gap-2 p-1 overflow-auto rounded shadow">
                    { footerLinks?.map(el=>(
                        <OverlayTrigger 
                            key={el.id} 
                            placement="top" 
                            overlay={
                                <Tooltip id="button-tooltip-2">{ el?.url }</Tooltip>
                            }
                        >
                            {({ ref, ...triggerHandler }) => ( 
                                <p ref={ref} className={`btn m-0 border ${el.active ? 'bg-success text-white border-0': ''}`} onClick={()=>handleFooter(el)} {...triggerHandler}> {el?.name} </p> 
                            )}
                        </OverlayTrigger>
                    )) }
                </div> 
                : ''
            }
        </div>
       
    )
}

export default Footer