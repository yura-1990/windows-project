import { VscRemoteExplorer } from "react-icons/vsc";
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from 'react';
import useFooter from '../store/footer'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function DragAndDrop({ element }){
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const setFooterLink = useFooter(state=>state.setFooterLinks)

    useEffect(() => {
        const savedPosition = JSON.parse(localStorage.getItem(`element-position-${element.id}`));
        if (savedPosition) {
          setPosition(savedPosition);
        }
    }, [element.id]);

    const handleDragStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(`element-position-${element.id}`, JSON.stringify(newPosition));
    };

    return (
        <Draggable 
            key={element.id}
            axis="both"
            handle=".handle"
            position={position}
            scale={1}
            nodeRef={nodeRef}
            onStop={handleDragStop}
        >
            <div 
                onDoubleClick={()=>setFooterLink(element)}
                ref={nodeRef}
                className="d-flex z-index-1 handle desktop-button flex-column justify-content-center align-items-center rounded"
            >
                <OverlayTrigger placement="bottom" overlay={<Tooltip>{element.name}</Tooltip>}>
                    <VscRemoteExplorer  className="h2 m-0 p-0 text-theme" />
                </OverlayTrigger>
            </div>
        </Draggable>
       
    )
}

export default DragAndDrop