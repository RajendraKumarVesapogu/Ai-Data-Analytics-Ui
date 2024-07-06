import { useEffect, useState } from "react";
import "./home.css";
import constants from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [fileLink, setFileLink] = useState(null);
    useEffect(() => {
        console.log(localStorage.getItem("token"));
    });

    const handleLinkSubmission = async(event) => {
        event.preventDefault();
        await axios.post(
            constants.backend_url + constants.csv_upload_path,
            {
                url: fileLink,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          ).then((response) => {
            if (response.data && response.data) {
                localStorage.setItem("columns", JSON.stringify(response.data.columns));
                setData(response.data.data);
                navigate("/query");
            }
        });
        
        
    };

    const renderTable = () => {
        var rows = data.map(function (item, i) {
            var entry = item.map(function (element, j) {
                if (i == 0) {
                    return <th key={j}> {element} </th>;
                }
                return <td key={j}> {element} </td>;
            });
            return <tr key={i}> {entry} </tr>;
        });
        return (
            <table className="data-table">
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div className="home-root">
            <form>
                <label htmlFor="filelink" className="text-field-label">
                    Enter Your File Link:
                    <input
                        className="text-field"
                        type="text"
                        name="filelink"
                        id="filellink"
                        onChange={(e) => setFileLink(e.target.value)}
                    />
                </label>

                <div className="submit-btn">
                    <button onClick={handleLinkSubmission}>Submit link</button>
                </div>
            </form>
            {fileLink}
            <div className="table-container">{data && renderTable(data)}</div>
        </div>
    );
};

export default Home;
