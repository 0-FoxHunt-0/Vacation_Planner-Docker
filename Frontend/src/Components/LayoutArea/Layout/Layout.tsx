import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            <nav>
                <Menu />
            </nav>

            <hr className="MenuHr" />

            <header>
                <Header />
            </header>

            <hr />

            <main>
                <Routing />
            </main>

        </div>
    );
}

export default Layout;
