import "./Home.css"
import metaLogo from "../../assets/metaLogo.svg"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {

    const [pred1, setPred1] = useState("-")
    const [pred2, setPred2] = useState("-")
    const [pred3, setPred3] = useState("-")
    const [supplier, setSupplier] = useState("");
    const [invoiceSource, setInvoiceSource] = useState("");
    const [countryName, setCountryName] = useState("");
    const [legalEntity, setLegalEntity] = useState("");
    const [businessUnit, setBusinessUnit] = useState("");
    const [description, setDescription] = useState("");
    const [requestId, setRequestId] = useState("");

    function changePred1(par) {
        setPred1(par)
    }

    function changePred2(par) {
        setPred2(par)
    }

    function changePred3(par) {
        setPred3(par)
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Fornecedor selecionado:", supplier);
        console.log("Invoice Source selecionado:", invoiceSource);
        console.log("Country Name selecionado:", countryName);
        console.log("Legal Entity selecionado:", legalEntity);
        console.log("Business Unit selecionado:", businessUnit);
        console.log("Descrição inserida:", description);

        const dataToSend = {
            "new_description": [
                supplier,
                invoiceSource,
                countryName,
                legalEntity,
                businessUnit,
                description
            ]
        };

        axios.post('http://localhost:3030/api/sendDescription', dataToSend)
            .then(response => {
                console.log('Resposta do servidor:', response.data);

                const requestId = response.data.requestId;
                setRequestId(requestId);
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
    }

    function getClassification() {
        axios.get(`http://localhost:3030/api/getClassification/${requestId}`)
            .then(classificationResponse => {
                console.log('Resposta da classificação:', classificationResponse.data);
                const { predicted_category, predicted_category02 } = classificationResponse.data.cachedResult;
                setPred1(predicted_category);
                setPred2(predicted_category02);
            })
            .catch(classificationError => {
                console.error('Erro ao receber a classificação:', classificationError);
            });
    }


    return (
        <div className="background">
            <div className="backgroundContent">
                <div className="header">
                    <h1>Buy@</h1>
                    <img src={metaLogo} />
                </div>
                <div className="content">
                    <div className="formContent">
                        <form className="formBody" onSubmit={handleSubmit}>
                            <div className="inputGroup">
                                <label>Supplier</label>
                                <select name="supplier"
                                    className="selectInput"
                                    value={supplier}
                                    onChange={(e) =>
                                        setSupplier(e.target.value)}>

                                    <option value="">Select the Supplier</option>
                                    <option value="3D SYSTEMS INC">3D SYSTEMS INC</option>
                                    <option value="AMY'S BREAD">AMY'S BREAD</option>
                                    <option value="A2E LLC">A2E LLC</option>
                                    <option value="AAMRO FREIGHT AND SHIPPING SERVICES LLC">AAMRO FREIGHT AND SHIPPING SERVICES LLC</option>
                                    <option value="ABASIN LINGUISTIC SERVICES PRIVATE LIMITED">ABASIN LINGUISTIC SERVICES PRIVATE LIMITED</option>
                                    <option value="ABBOTT RAPID DX NORTH AMERICA LLC">ABBOTT RAPID DX NORTH AMERICA LLC</option>
                                    <option value="ABSOLUTE EQUIPMENT SUPPLY AND SERVICE INC">ABSOLUTE EQUIPMENT SUPPLY AND SERVICE INC</option>
                                    <option value="ACE NATURAL">ACE NATURAL</option>
                                    <option value="ACKTAR LTD">ACKTAR LTD</option>
                                    <option value="COMPASS GROUP USA INC">COMPASS GROUP USA INC</option>
                                </select>
                            </div>
                            <div className="inputGroup">
                                <label>Invoice Source</label>
                                <select name="Invoice Source"
                                    className="selectInput"
                                    value={invoiceSource}
                                    onChange={(e) =>
                                        setInvoiceSource(e.target.value)}>

                                    <option value="">Select the Invoice Source</option>
                                    <option value="OCR">OCR</option>
                                    <option value="SUPP_CONNECT">SUPP_CONNECT</option>
                                    <option value="LETTERBOX">LETTERBOX</option>
                                    <option value="CAFEPRO">CAFEPRO</option>
                                    <option value="SIMANUAL">SIMANUAL</option>
                                    <option value="SC_UPLOAD">SC_UPLOAD</option>
                                </select>
                            </div>
                            <div className="inputGroup">
                                <label>Country Name</label>
                                <select name="Country Name"
                                    className="selectInput"
                                    value={countryName}
                                    onChange={(e) =>
                                        setCountryName(e.target.value)}>

                                    <option value="">Select the Country Name</option>
                                    <option value="United States of America">United States of America</option>
                                    <option value="France">France</option>
                                    <option value="United Kingdom of Great Britain and Northern Ireland ">United Kingdom of Great Britain and Northern Ireland </option>
                                    <option value="Italy">Italy</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="China">China</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Honk Kong">Honk Kong</option>
                                    <option value="Canada">Canada</option>
                                </select>
                            </div>
                            <div className="inputGroup">
                                <label>Legal Entity</label>
                                <select name="Legal Entity"
                                    className="selectInput"
                                    value={legalEntity}
                                    onChange={(e) =>
                                        setLegalEntity(e.target.value)}>

                                    <option value="">Select the Legal Entity</option>
                                    <option value="Meta Platforms Technologies, LLC">Meta Platforms Technologies, LLC</option>
                                    <option value="Meta Platforms, Inc.">Meta Platforms, Inc.</option>
                                    <option value="Kashews LLC">Kashews LLC</option>
                                    <option value="Greater Kudu LLC">Greater Kudu LLC</option>
                                    <option value="Facebook Miami, Inc">Facebook Miami, Inc</option>
                                    <option value="Paile LLC">Paile LLC</option>
                                    <option value="Raven Northbrook LLC">Raven Northbrook LLC</option>
                                    <option value="Siculus, Inc.">Siculus, Inc.</option>
                                    <option value="Sidecat, LLC">Sidecat, LLC</option>
                                    <option value="Velvet Tech Services LLC">Velvet Tech Services LLC</option>
                                </select>
                            </div>
                            <div className="inputGroup">
                                <label>Business Unit</label>
                                <select name="Business Unit"
                                    className="selectInput"
                                    value={businessUnit}
                                    onChange={(e) =>
                                        setBusinessUnit(e.target.value)}>

                                    <option value="">Select the Business Entity</option>
                                    <option value="RL">RL</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Facilities">Facilities</option>
                                    <option value="G&A - M-Team">G&A - M-Team</option>
                                    <option value="IT & Corpnet">IT & Corpnet</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="s7">Infraestructure</option>
                                    <option value="Legal">Legal</option>
                                    <option value="HR Operations">HR Operations</option>
                                    <option value="Global Marketing Solutions">Global Marketing Solutions</option>

                                </select>
                            </div>
                            <div className="inputGroup">
                                <label> Description</label>
                                <div className="inputBG">
                                    <input
                                        className="textInput"
                                        type="text"
                                        placeholder="Describe what you are buying"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="buttonBackground">
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                    <div className="predictionBackground">
                        <div>
                            <button className="classificationButton" onClick={getClassification}>Classify</button>
                        </div>
                        <div className="predGroup">
                            <p>Classification Level 1</p>
                            <div className="cardBackground">
                                <p>{pred1}</p>
                            </div>
                        </div>
                        <div className="predGroup">
                            <p>Classification Level 2</p>
                            <div className="cardBackground">
                                <p>{pred2}</p>
                            </div>
                        </div>
                        <div className="predGroup">
                            <p>Classification Level 3</p>
                            <div className="cardBackground">
                                <p>{pred3}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}