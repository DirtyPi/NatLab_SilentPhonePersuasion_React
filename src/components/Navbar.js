import { Link } from "react-router-dom";
import image from '../Images/images.navbar/2222.png'
const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'>
                    
                    <img src={image} width="80" height="80"/> 
                </Link>
            </div>
        </header>
    )
}

export default Navbar