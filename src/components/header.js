import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap"
import useTheme from "../store/theme";


function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const themeMode = useTheme(state=>state.state.themeMode)
    const toggleThemeMode = useTheme(state=>state.toggleThemeMode)

    return (
        <div>
           <Button variant="primary" onClick={handleShow} className="me-2 float-end">
                Settings
            </Button>
            <Offcanvas placement={'top'} show={show} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><input type='checkbox' checked={themeMode} onChange={toggleThemeMode} /></Offcanvas.Title>
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