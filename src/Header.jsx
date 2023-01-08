import logo from "../src/components/assets/BOOK.png"
import "../src/App.css"

function Header() {
    return (
        <header class="header-content header">
            <div class="logo-content">
                <img src={logo} alt="logo" />
                <div><span class=" book-text">BOOK</span>
                    <span class="book-text add-book">STORE</span>
                </div>
            </div>
            <div>
            </div>
        </header>
    )
}

export default Header;