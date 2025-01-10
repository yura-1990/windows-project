import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { VscRemoteExplorer } from "react-icons/vsc";
import useMain from "../store/main";
import { useEffect } from "react";
import useFooter from "../store/footer";

function Main() {
    const mainLinks = useMain(state=>state.state.mainLinks)
    const getMainLinks = useMain(state=>state.getMainLinks)
    const setFooterLinks = useFooter(state=>state.setFooterLinks)

    useEffect(()=>{
        getMainLinks()
    }, [])

    return (
        <div className="d-flex flex-wrap gap-4 w-100">
            {
                mainLinks.map(el=>(<div  className="d-flex desktop-button flex-column justify-content-center align-items-center rounded">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Desktop</Tooltip>}>
                        {({ ref, ...triggerHandler }) => (
                            <a onClick={()=>setFooterLinks(el)} href="#!" {...triggerHandler} >
                                <VscRemoteExplorer ref={ref} className="h2 m-0 p-0 text-theme" />
                            </a>
                        )}
                    </OverlayTrigger>
                </div>))
            }
            
        </div>
    )
}

export default Main