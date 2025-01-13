import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
import { FaExpand } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import { FaWindowMinimize } from "react-icons/fa6";
import useFooter from "../store/footer";
import { IoMdContract } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";

function Resizable({ element, elements, children }) {
  const resizeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [index, setIndex] = useState(1)
  const [place, setPlace] = useState({top: 0, left: 0})
  const [isFullScreen, setIsFullSreen] = useState({width:0, height: 0, full: false, x: 0, y: 0, top: 0, left: 0 })


  const removeFooterLink = useFooter(state=>state.removeFooterLink)
  const resetWindow = useFooter(state=>state.resetWindow)
  const setActive = useFooter(state=>state.setActive)

  useEffect(() => {
    const defaultWidth = (window.innerWidth / 100) * 80;
    const defaultHeight = (window.innerHeight / 100) * 80;

    const savedPosition = JSON.parse(localStorage.getItem(`open-element-position-${element.id}`));
    const savedSize = JSON.parse(localStorage.getItem(`open-element-size-${element.id}`));
    const indexElement = JSON.parse(localStorage.getItem(`open-element-position-z-index-${element.id}`));
    const fullScreen = JSON.parse(localStorage.getItem(`open-element-full-screen-${element.id}`));
    
    if (savedPosition) setPosition(savedPosition);
    if (savedSize){
        setSize(savedSize)
    } else {
        setSize({ width: defaultWidth, height: defaultHeight });
        localStorage.setItem(`open-element-size-${element.id}`, JSON.stringify({ width: defaultWidth, height: defaultHeight }))
    }
    if (indexElement) setIndex(indexElement)
    if (fullScreen) setIsFullSreen(fullScreen)
  }, [element.id]);

  const handleDragStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(`open-element-position-${element.id}`, JSON.stringify(newPosition));

  };

  const handleResize = (e, direction) => {
    const rect = resizeRef.current.getBoundingClientRect();
    let newWidth = rect.width;
    let newHeight = rect.height;
    let newX = position.x;
    let newY = position.y;    

    if (direction.includes("right")) {
      newWidth = e.clientX - rect.left;
    }
    if (direction.includes("left")) {
      newWidth = rect.right - e.clientX;
      newX = e.clientX;
    }

    if (direction.includes("bottom")) {
      newHeight = e.clientY - rect.top;
    }
    if (direction.includes("top")) {
      newHeight = rect.bottom - e.clientY;
      newY = e.clientY;
    }

    newWidth = Math.max(newWidth, 50); 
    newHeight = Math.max(newHeight, 50); 

    if (direction.includes("left")) {
        newX = position.x + (size.width - newWidth);
      }
      if (direction.includes("top")) {
        newY = position.y + (size.height - newHeight);
      }

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });

    localStorage.setItem(
      `open-element-size-${element.id}`,
      JSON.stringify({ width: newWidth, height: newHeight })
    );
    localStorage.setItem(
      `open-element-position-${element.id}`,
      JSON.stringify({ x: newX, y: newY })
    );
  };

  const resizeMouseDown = (e, direction) => {
    e.preventDefault();

    const onMouseMove = (event) => handleResize(event, direction);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const indexThePage = ()=>{
    let id = []

    elements.forEach(el => {
        const indexElement = localStorage.getItem(`open-element-position-z-index-${el.id}`);
        if (indexElement){
            const i = JSON.parse(indexElement)
            if(!id.includes(i)) id.push(i)
        }
    });

    
    const select = Math.max(...id)
    localStorage.setItem(`open-element-position-z-index-${element.id}`, JSON.stringify(select+1))
    setIndex(select+1)
    
  }

  function fullScreen(){
    const savedPosition = JSON.parse(localStorage.getItem(`open-element-position-${element.id}`));
    const savedSize = JSON.parse(localStorage.getItem(`open-element-size-${element.id}`));
    localStorage.setItem(`open-element-full-screen-${element.id}`, JSON.stringify({width: savedSize.width, height: savedSize.height, x: savedPosition.x, y: savedPosition.y, top: 0, left: 0, full: true}));
    
    setIsFullSreen({...isFullScreen, full: true})
    setSize({ width: window.innerWidth - 10, height: window.innerHeight - 85 })
    setPosition({ x: 0, y: 0 });
    setPlace({top: 38, left: 5})

    localStorage.setItem( `open-element-size-${element.id}`, JSON.stringify({  width: window.innerWidth - 10, height: window.innerHeight - 85 }) );
    localStorage.setItem( `open-element-position-${element.id}`,  JSON.stringify({ x: 0, y: 0 }) );
  }

  function closeFullScreen(){
    const fullScreen = JSON.parse(localStorage.getItem(`open-element-full-screen-${element.id}`));

    if(fullScreen){
        localStorage.setItem( `open-element-size-${element.id}`, JSON.stringify({ width: fullScreen.width, height: fullScreen.height }) );
        localStorage.setItem( `open-element-position-${element.id}`,  JSON.stringify({ x: fullScreen.x, y: fullScreen.y }) );
        setSize({ width: fullScreen.width, height: fullScreen.height })
        setPosition({ x: fullScreen.x, y: fullScreen.y });
        const change = {...fullScreen, full: false}
        setIsFullSreen({...change})
        localStorage.setItem(`open-element-full-screen-${element.id}`, JSON.stringify({...change}));
        console.log(fullScreen);
    }
  }

  function activate(){
    setActive(element)
    indexThePage()    
  }


  return (
    <Draggable
      key={element.id}
      axis="both"
      handle=".header"
      position={position}
      scale={1}
      nodeRef={resizeRef}
      onStop={handleDragStop}
      onStart={indexThePage}
    >
      <div
        ref={resizeRef}
        className="rounded border overflow-hidden shadow bg-mode "
        style={{
          position: "absolute",
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: index,
          top: `${place.top}px`,
          left: `${place.left}px`,
        }}
        onClick={activate}
      >
        <div className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div className="header flex-grow-1 ps-2" style={{ cursor: "move", userSelect: "none" }}>
            {element.name}
          </div>
          <div className="d-flex align-items-center">
            <div className="icon" onClick={()=>resetWindow(element)}>
              <FaWindowMinimize />
            </div>
            <div  className="icon">
                {
                    isFullScreen.full ? <IoMdContract onClick={closeFullScreen} /> : <FaExpand onClick={fullScreen} />
                }
            </div>
            <div onClick={()=>removeFooterLink(element)} className="icon">
              <RiCloseLargeFill />
            </div>
          </div>
        </div>

        <div className="overflow-auto h-100">
          {children}
        </div>

        {/* Resize Handles */}
        <div
          className="resize-handle-right"
          onMouseDown={(e) => resizeMouseDown(e, "right")}
          style={{
            width: "10px",
            height: "100%",
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "ew-resize",
          }}
        ></div>
        <div
          className="resize-handle-left"
          onMouseDown={(e) => resizeMouseDown(e, "left")}
          style={{
            width: "10px",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            cursor: "ew-resize",
          }}
        ></div>
        <div
          className="resize-handle-bottom"
          onMouseDown={(e) => resizeMouseDown(e, "bottom")}
          style={{
            width: "100%",
            height: "10px",
            position: "absolute",
            bottom: 0,
            left: 0,
            cursor: "ns-resize",
          }}
        ></div>
        <div
          className="resize-handle-top"
          onMouseDown={(e) => resizeMouseDown(e, "top")}
          style={{
            width: "100%",
            height: "10px",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "ns-resize",
          }}
        ></div>
        <div
          className="resize-handle-corner-bottom-right"
          onMouseDown={(e) => resizeMouseDown(e, "bottom-right")}
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            bottom: 0,
            right: 0,
            cursor: "nwse-resize",
          }}
        ></div>
        <div
          className="resize-handle-corner-top-right"
          onMouseDown={(e) => resizeMouseDown(e, "top-right")}
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "nesw-resize",
          }}
        ></div>
        <div
          className="resize-handle-corner-top-left"
          onMouseDown={(e) => resizeMouseDown(e, "top-left")}
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "nw-resize",
          }}
        ></div>
        <div
          className="resize-handle-corner-bottom-left"
          onMouseDown={(e) => resizeMouseDown(e, "bottom-left")}
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            bottom: 0,
            left: 0,
            cursor: "sw-resize",
          }}
        ></div>
      </div>
    </Draggable>
  );
}

export default Resizable;
