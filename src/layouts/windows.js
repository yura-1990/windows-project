import Footer from '../components/footer';
import Header from '../components/header';

function Windows({children}) { 


    return (
        <div className='vh-100 d-flex flex-column p-1 justify-content-between'>  
            <Header />

            <div className='my-2 p-2 rounded flex-grow-1 main-content'>
                {children}
            </div>

            <Footer />
        </div>
    )
}

export default Windows
