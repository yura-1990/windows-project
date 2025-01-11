import { useEffect, useState } from "react";
import { Button, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap"
import useTheme from "../store/theme";
import { VscRemoteExplorer } from "react-icons/vsc";


function Header() {
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(null)
    const [date, setDate] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const themeMode = useTheme(state=>state.state.themeMode)
    const toggleThemeMode = useTheme(state=>state.toggleThemeMode)
    const getThemeMode = useTheme(state=>state.getThemeMode)

    useEffect(()=>{
        getThemeMode()
        console.log(themeMode);
        
        let interval = null
        function getTime(){
            const date = new Date()

            const hour = date.getHours()
            const minut = date.getMinutes()
            const seconds = date.getSeconds()
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()

            setTime(`${hour}:${minut}:${seconds > 9 ? seconds : '0'+ seconds}`)
            setDate(`${day}/${month}/${year}`)

            interval = setTimeout(()=>{
                getTime()
            }, 1000)
        }

        getTime()

        return ()=>clearTimeout(interval)

        
    }, [])


    return (
        <div>
            <OverlayTrigger placement="right" overlay={<Tooltip id="button-tooltip-2">{date}</Tooltip>}>
                        {({ ref, ...triggerHandler }) => (
                            <Button ref={ref} {...triggerHandler} variant="primary" className="me-2 d-flex flex-column float-start">
                                {time} 
                            </Button>
                        )}
                    </OverlayTrigger>
            
           <Button variant="primary" onClick={handleShow} className="me-2 float-end">
                Settings
            </Button>
            <Offcanvas placement={'top'} show={show} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <input type='checkbox' checked={themeMode} onChange={toggleThemeMode} />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
       
    )
}

export default Header