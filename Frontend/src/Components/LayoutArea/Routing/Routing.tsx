import { Route, Routes } from "react-router-dom";
import DataList from "../../DataArea/DataList/DataList";
import Insert from "../../DataArea/Insert/Insert";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			
            <Routes>
                
                <Route index element={<Home />} />
                <Route path="/list" element={<DataList />} />
                <Route path="/add" element={<Insert />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
